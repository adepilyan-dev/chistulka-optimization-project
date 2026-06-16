import json
import os
import logging
import time
from functools import lru_cache
from typing import Dict, List, Optional, Tuple, Any
import psycopg2
from psycopg2 import pool
from psycopg2.extras import RealDictCursor

# ======================== КОНФИГУРАЦИЯ ========================
SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "public")
ALLOWED_SCHEMAS = ['public', 'seo', 'admin', 'app']
ALLOWED_PAGE_KEYS = ['home', 'about', 'catalog', 'product', 'blog', 'contacts']  # Белый список ключей

# Настройка логирования
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Rate limiting (простая реализация)
RATE_LIMIT_CACHE = {}
RATE_LIMIT_WINDOW = 60  # секунд
RATE_LIMIT_MAX_REQUESTS = 100

# Пул соединений с БД
try:
    connection_pool = pool.SimpleConnectionPool(
        1, 20, os.environ["DATABASE_URL"],
        connect_timeout=5,
        keepalives=1,
        keepalives_idle=5,
        keepalives_interval=2,
        keepalives_count=2
    )
except Exception as e:
    logger.error(f"Failed to create connection pool: {e}")
    connection_pool = None

# ======================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ========================

def get_conn():
    """Получение соединения из пула"""
    if connection_pool:
        try:
            return connection_pool.getconn()
        except Exception as e:
            logger.error(f"Failed to get connection from pool: {e}")
            return psycopg2.connect(os.environ["DATABASE_URL"])
    return psycopg2.connect(os.environ["DATABASE_URL"])

def return_conn(conn):
    """Возврат соединения в пул"""
    if connection_pool and conn:
        try:
            connection_pool.putconn(conn)
        except Exception as e:
            logger.error(f"Failed to return connection to pool: {e}")
            conn.close()

def cors_headers() -> Dict:
    """Заголовки CORS"""
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
        "Access-Control-Allow-Headers": "Content-Type, X-Authorization, X-Request-ID",
        "Access-Control-Max-Age": "86400",
    }

def check_auth(event: Dict) -> bool:
    """Проверка авторизации"""
    token = event.get("headers", {}).get("X-Authorization", "")
    password = os.environ.get("SEO_ADMIN_PASSWORD", "")
    if not password:
        logger.warning("SEO_ADMIN_PASSWORD not set")
        return False
    return token == f"Bearer {password}"

def check_rate_limit(client_id: str) -> Tuple[bool, Optional[int]]:
    """Проверка rate limiting"""
    if not client_id:
        client_id = "unknown"
    
    current_time = time.time()
    window_start = current_time - RATE_LIMIT_WINDOW
    
    if client_id not in RATE_LIMIT_CACHE:
        RATE_LIMIT_CACHE[client_id] = []
    
    # Очистка старых записей
    RATE_LIMIT_CACHE[client_id] = [
        t for t in RATE_LIMIT_CACHE[client_id] if t > window_start
    ]
    
    if len(RATE_LIMIT_CACHE[client_id]) >= RATE_LIMIT_MAX_REQUESTS:
        oldest = min(RATE_LIMIT_CACHE[client_id])
        wait_time = int(oldest + RATE_LIMIT_WINDOW - current_time)
        return False, wait_time
    
    RATE_LIMIT_CACHE[client_id].append(current_time)
    return True, None

def safe_json_loads(data: Optional[str], default: Optional[Dict] = None) -> Dict:
    """Безопасная загрузка JSON"""
    if not data:
        return default or {}
    try:
        return json.loads(data)
    except json.JSONDecodeError as e:
        logger.warning(f"Invalid JSON: {e}")
        return {"_error": "Invalid JSON format"}

def validate_schema(schema: str) -> bool:
    """Валидация имени схемы"""
    return schema in ALLOWED_SCHEMAS

def validate_page_key(page_key: str) -> bool:
    """Валидация ключа страницы"""
    if not page_key:
        return False
    # Проверка на специальные символы
    import re
    if not re.match(r'^[a-z0-9\-_]+$', page_key):
        return False
    # Если есть белый список - проверяем
    if ALLOWED_PAGE_KEYS and page_key not in ALLOWED_PAGE_KEYS:
        logger.warning(f"Page key '{page_key}' not in allowed list")
        # Можно разрешить все или только из списка
        # return False  # Раскомментировать для строгой проверки
    return True

def validate_page_data(data: Dict) -> List[str]:
    """Валидация данных страницы"""
    errors = []
    
    # Проверка page_key
    page_key = data.get('page_key')
    if not page_key:
        errors.append("page_key is required")
    elif not validate_page_key(page_key):
        errors.append("page_key contains invalid characters")
    
    # Проверка длины полей
    if data.get('title') and len(data['title']) > 255:
        errors.append("Title max length is 255 characters")
    
    if data.get('description') and len(data['description']) > 500:
        errors.append("Description max length is 500 characters")
    
    if data.get('keywords') and len(data['keywords']) > 255:
        errors.append("Keywords max length is 255 characters")
    
    # Валидация schema_json
    if data.get('schema_json'):
        try:
            schema = json.loads(data['schema_json'])
            # Проверка основных полей JSON-LD
            if not isinstance(schema, dict):
                errors.append("schema_json must be a JSON object")
            elif '@context' not in schema:
                errors.append("schema_json must contain '@context' field")
        except json.JSONDecodeError:
            errors.append("schema_json must be valid JSON")
    
    # Санитайзинг (удаление потенциально опасных символов)
    if data.get('title'):
        # Удаляем HTML теги
        import re
        cleaned = re.sub(r'<[^>]+>', '', data['title'])
        if cleaned != data['title']:
            errors.append("Title contains HTML tags (not allowed)")
    
    return errors

def validate_robots_content(content: str) -> Tuple[bool, Optional[str]]:
    """Валидация robots.txt"""
    if not content:
        return True, None
    
    allowed_directives = ['User-agent', 'Disallow', 'Allow', 'Sitemap', 'Crawl-delay', 'Host']
    lines = content.split('\n')
    
    for i, line in enumerate(lines):
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        
        # Проверка формата: directive: value
        if ':' not in line:
            return False, f"Line {i+1}: Missing colon separator"
        
        directive = line.split(':', 1)[0].strip()
        if directive not in allowed_directives:
            return False, f"Line {i+1}: Unknown directive '{directive}'"
        
        # Проверка User-agent
        if directive == 'User-agent':
            agent = line.split(':', 1)[1].strip()
            if not agent or '*' not in agent and not agent.isalnum():
                return False, f"Line {i+1}: Invalid User-agent format"
    
    return True, None

def format_page_row(row: tuple) -> Dict:
    """Форматирование строки страницы для ответа"""
    return {
        "page_key": row[0],
        "page_label": row[1] or row[0],
        "title": row[2] or "",
        "description": row[3] or "",
        "keywords": row[4] or "",
        "schema_json": row[5] or "",
        "updated_at": row[6].isoformat() if row[6] else None,
    }

def format_success_response(data: Any = None, status: int = 200, message: str = "Success") -> Dict:
    """Форматирование успешного ответа"""
    response = {
        "success": True,
        "message": message,
        "timestamp": time.time()
    }
    if data is not None:
        response["data"] = data
    return {
        "statusCode": status,
        "headers": {**cors_headers(), "Content-Type": "application/json"},
        "body": json.dumps(response, ensure_ascii=False)
    }

def format_error_response(
    message: str, 
    status: int = 400, 
    details: Optional[Any] = None,
    error_code: Optional[str] = None
) -> Dict:
    """Форматирование ответа с ошибкой"""
    response = {
        "success": False,
        "error": message,
        "timestamp": time.time()
    }
    if details:
        response["details"] = details
    if error_code:
        response["error_code"] = error_code
    
    return {
        "statusCode": status,
        "headers": {**cors_headers(), "Content-Type": "application/json"},
        "body": json.dumps(response, ensure_ascii=False)
    }

# ======================== ФУНКЦИИ ДЛЯ РАБОТЫ С БД ========================

def execute_query(query: str, params: Optional[tuple] = None, fetch: bool = False, fetch_one: bool = False):
    """Выполнение запроса с автоматическим управлением соединением"""
    conn = None
    cur = None
    try:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(query, params or ())
        
        if fetch:
            return cur.fetchall()
        if fetch_one:
            return cur.fetchone()
        
        conn.commit()
        return cur.rowcount
    except Exception as e:
        if conn:
            conn.rollback()
        logger.error(f"Database error in execute_query: {e}", exc_info=True)
        raise
    finally:
        if cur:
            cur.close()
        if conn:
            return_conn(conn)

def get_seo_settings(cur) -> List[tuple]:
    """Получение всех SEO настроек"""
    if not validate_schema(SCHEMA):
        raise ValueError(f"Invalid schema: {SCHEMA}")
    
    cur.execute(f"""
        SELECT page_key, page_label, title, description, keywords, schema_json, updated_at 
        FROM {SCHEMA}.seo_settings 
        ORDER BY id
    """)
    return cur.fetchall()

def get_seo_settings_by_key(cur, page_key: str) -> Optional[tuple]:
    """Получение настроек конкретной страницы"""
    if not validate_schema(SCHEMA):
        raise ValueError(f"Invalid schema: {SCHEMA}")
    
    cur.execute(f"""
        SELECT page_key, page_label, title, description, keywords, schema_json, updated_at 
        FROM {SCHEMA}.seo_settings 
        WHERE page_key = %s
    """, (page_key,))
    return cur.fetchone()

def get_robots(cur) -> str:
    """Получение robots.txt"""
    if not validate_schema(SCHEMA):
        raise ValueError(f"Invalid schema: {SCHEMA}")
    
    cur.execute(f"SELECT content FROM {SCHEMA}.seo_robots ORDER BY id DESC LIMIT 1")
    row = cur.fetchone()
    return row[0] if row else ""

def update_page_settings(cur, data: Dict) -> None:
    """Обновление настроек страницы (upsert)"""
    if not validate_schema(SCHEMA):
        raise ValueError(f"Invalid schema: {SCHEMA}")
    
    page_key = data['page_key']
    page_label = data.get('page_label', page_key)
    title = data.get('title', '')
    description = data.get('description', '')
    keywords = data.get('keywords', '')
    schema_json = data.get('schema_json', '')
    
    cur.execute(f"""
        INSERT INTO {SCHEMA}.seo_settings 
            (page_key, page_label, title, description, keywords, schema_json, updated_at)
        VALUES (%s, %s, %s, %s, %s, %s, NOW())
        ON CONFLICT (page_key) DO UPDATE 
        SET 
            page_label = EXCLUDED.page_label,
            title = EXCLUDED.title,
            description = EXCLUDED.description,
            keywords = EXCLUDED.keywords,
            schema_json = EXCLUDED.schema_json,
            updated_at = NOW()
    """, (page_key, page_label, title, description, keywords, schema_json))
    
    logger.info(f"Updated SEO settings for page: {page_key}")

def update_robots(cur, content: str) -> None:
    """Обновление robots.txt"""
    if not validate_schema(SCHEMA):
        raise ValueError(f"Invalid schema: {SCHEMA}")
    
    cur.execute(f"DELETE FROM {SCHEMA}.seo_robots")
    cur.execute(f"INSERT INTO {SCHEMA}.seo_robots (content) VALUES (%s)", (content,))
    logger.info("Updated robots.txt")

def delete_page_settings(cur, page_key: str) -> bool:
    """Удаление настроек страницы"""
    if not validate_schema(SCHEMA):
        raise ValueError(f"Invalid schema: {SCHEMA}")
    
    cur.execute(f"DELETE FROM {SCHEMA}.seo_settings WHERE page_key = %s", (page_key,))
    deleted = cur.rowcount > 0
    if deleted:
        logger.info(f"Deleted SEO settings for page: {page_key}")
    return deleted

def get_statistics(cur) -> Dict:
    """Получение статистики"""
    if not validate_schema(SCHEMA):
        raise ValueError(f"Invalid schema: {SCHEMA}")
    
    cur.execute(f"SELECT COUNT(*) FROM {SCHEMA}.seo_settings")
    total_pages = cur.fetchone()[0]
    
    cur.execute(f"""
        SELECT COUNT(*) FROM {SCHEMA}.seo_settings 
        WHERE updated_at > NOW() - INTERVAL '24 hours'
    """)
    updated_today = cur.fetchone()[0]
    
    return {
        "total_pages": total_pages,
        "updated_today": updated_today,
        "has_robots": bool(get_robots(cur))
    }

# ======================== КЭШИРОВАНИЕ ========================

@lru_cache(maxsize=10)
def get_cached_seo_settings(ttl: int = 300):
    """Получение закэшированных настроек (кэш на 5 минут)"""
    conn = None
    cur = None
    try:
        conn = get_conn()
        cur = conn.cursor()
        rows = get_seo_settings(cur)
        return [format_page_row(r) for r in rows]
    finally:
        if cur:
            cur.close()
        if conn:
            return_conn(conn)

def clear_cache():
    """Очистка кэша"""
    get_cached_seo_settings.cache_clear()
    logger.info("Cache cleared")

# ======================== ОСНОВНОЙ ОБРАБОТЧИК ========================

def handler(event: dict, context) -> dict:
    """Основной обработчик API Gateway"""
    request_id = event.get('requestContext', {}).get('requestId', 'unknown')
    client_ip = event.get('headers', {}).get('X-Forwarded-For', 'unknown')
    
    logger.info(f"Request {request_id} from {client_ip}: {event.get('httpMethod')} {event.get('path')}")
    
    # ===== 1. CORS Preflight =====
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": cors_headers(),
            "body": ""
        }
    
    # ===== 2. Rate Limiting =====
    allowed, wait_time = check_rate_limit(client_ip)
    if not allowed:
        logger.warning(f"Rate limit exceeded for {client_ip}")
        return format_error_response(
            "Too many requests",
            429,
            f"Please wait {wait_time} seconds",
            "RATE_LIMIT_EXCEEDED"
        )
    
    # ===== 3. Authentication =====
    if not check_auth(event):
        logger.warning(f"Unauthorized request from {client_ip}")
        return format_error_response("Unauthorized", 401, error_code="UNAUTHORIZED")
    
    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")
    body = safe_json_loads(event.get("body"))
    
    # Проверка ошибки JSON
    if "_error" in body:
        return format_error_response(body["_error"], 400, error_code="INVALID_JSON")
    
    # ===== 4. Обработка маршрутов =====
    try:
        with get_conn() as conn:
            with conn.cursor() as cur:
                
                # --- GET /seo-admin ---
                if method == "GET" and path == "/seo-admin":
                    use_cache = event.get('queryStringParameters', {}).get('cache', 'true') != 'false'
                    
                    if use_cache:
                        pages = get_cached_seo_settings()
                    else:
                        rows = get_seo_settings(cur)
                        pages = [format_page_row(r) for r in rows]
                    
                    robots = get_robots(cur)
                    
                    return format_success_response({
                        "pages": pages,
                        "robots": robots,
                        "total": len(pages),
                        "cached": use_cache
                    })
                
                # --- GET /seo-admin/page/{page_key} ---
                if method == "GET" and path.startswith("/seo-admin/page/"):
                    page_key = path.split("/")[-1]
                    if not validate_page_key(page_key):
                        return format_error_response("Invalid page key", 400, error_code="INVALID_PAGE_KEY")
                    
                    row = get_seo_settings_by_key(cur, page_key)
                    if not row:
                        return format_error_response("Page not found", 404, error_code="PAGE_NOT_FOUND")
                    
                    return format_success_response(format_page_row(row))
                
                # --- POST /seo-admin/page ---
                if method == "POST" and path == "/seo-admin/page":
                    # Валидация
                    errors = validate_page_data(body)
                    if errors:
                        return format_error_response("Validation failed", 400, errors, "VALIDATION_ERROR")
                    
                    # Обновление
                    update_page_settings(cur, body)
                    conn.commit()
                    clear_cache()
                    
                    return format_success_response({
                        "page_key": body['page_key'],
                        "updated": True
                    }, message="Page settings updated successfully")
                
                # --- PUT /seo-admin/page --- (для обратной совместимости)
                if method == "PUT" and path == "/seo-admin/page":
                    errors = validate_page_data(body)
                    if errors:
                        return format_error_response("Validation failed", 400, errors, "VALIDATION_ERROR")
                    
                    update_page_settings(cur, body)
                    conn.commit()
                    clear_cache()
                    
                    return format_success_response({
                        "page_key": body['page_key'],
                        "updated": True
                    }, message="Page settings updated successfully")
                
                # --- DELETE /seo-admin/page/{page_key} ---
                if method == "DELETE" and path.startswith("/seo-admin/page/"):
                    page_key = path.split("/")[-1]
                    if not validate_page_key(page_key):
                        return format_error_response("Invalid page key", 400, error_code="INVALID_PAGE_KEY")
                    
                    deleted = delete_page_settings(cur, page_key)
                    conn.commit()
                    clear_cache()
                    
                    if not deleted:
                        return format_error_response("Page not found", 404, error_code="PAGE_NOT_FOUND")
                    
                    return format_success_response({
                        "page_key": page_key,
                        "deleted": True
                    }, message="Page settings deleted successfully")
                
                # --- POST /seo-admin/robots ---
                if method == "POST" and path == "/seo-admin/robots":
                    content = body.get("content", "")
                    
                    # Валидация robots.txt
                    is_valid, error_msg = validate_robots_content(content)
                    if not is_valid:
                        return format_error_response(
                            "Invalid robots.txt format",
                            400,
                            error_msg,
                            "INVALID_ROBOTS"
                        )
                    
                    update_robots(cur, content)
                    conn.commit()
                    
                    return format_success_response({
                        "updated": True,
                        "length": len(content)
                    }, message="robots.txt updated successfully")
                
                # --- GET /seo-admin/robots --- (получение robots.txt отдельно)
                if method == "GET" and path == "/seo-admin/robots":
                    robots = get_robots(cur)
                    return format_success_response({
                        "robots": robots,
                        "length": len(robots)
                    })
                
                # --- GET /seo-admin/stats --- (статистика)
                if method == "GET" and path == "/seo-admin/stats":
                    stats = get_statistics(cur)
                    return format_success_response(stats)
                
                # --- POST /seo-admin/clear-cache --- (очистка кэша)
                if method == "POST" and path == "/seo-admin/clear-cache":
                    clear_cache()
                    return format_success_response({
                        "cache_cleared": True
                    }, message="Cache cleared successfully")
                
                # --- POST /seo-admin/bulk --- (массовое обновление)
                if method == "POST" and path == "/seo-admin/bulk":
                    pages = body.get("pages", [])
                    if not isinstance(pages, list):
                        return format_error_response("Invalid data format", 400, "pages must be an array", "INVALID_FORMAT")
                    
                    if len(pages) > 100:
                        return format_error_response("Too many pages", 400, "Max 100 pages per request", "TOO_MANY")
                    
                    results = []
                    errors = []
                    
                    for idx, page_data in enumerate(pages):
                        try:
                            # Валидация
                            page_errors = validate_page_data(page_data)
                            if page_errors:
                                errors.append({
                                    "index": idx,
                                    "page_key": page_data.get("page_key", "unknown"),
                                    "errors": page_errors
                                })
                                continue
                            
                            update_page_settings(cur, page_data)
                            results.append(page_data.get("page_key"))
                        except Exception as e:
                            logger.error(f"Bulk update error at index {idx}: {e}")
                            errors.append({
                                "index": idx,
                                "page_key": page_data.get("page_key", "unknown"),
                                "error": str(e)
                            })
                    
                    conn.commit()
                    clear_cache()
                    
                    return format_success_response({
                        "updated": results,
                        "total": len(results),
                        "errors": errors if errors else None
                    }, message=f"Updated {len(results)} pages" + (f" with {len(errors)} errors" if errors else ""))
                
                # --- 404 ---
                return format_error_response("Not found", 404, error_code="NOT_FOUND")
                
    except ValueError as e:
        logger.error(f"Value error: {e}")
        return format_error_response(str(e), 400, error_code="VALIDATION_ERROR")
    
    except psycopg2.IntegrityError as e:
        logger.error(f"Integrity error: {e}")
        return format_error_response("Database integrity error", 409, str(e), "DB_INTEGRITY_ERROR")
    
    except psycopg2.OperationalError as e:
        logger.error(f"Operational error: {e}")
        return format_error_response("Database connection error", 503, str(e), "DB_CONNECTION_ERROR")
    
    except json.JSONDecodeError as e:
        return format_error_response("Invalid JSON in request", 400, str(e), "INVALID_JSON")
    
    except Exception as e:
        logger.error(f"Unexpected error: {e}", exc_info=True)
        return format_error_response("Internal server error", 500, error_code="INTERNAL_ERROR")

# ======================== ТЕСТОВАЯ ФУНКЦИЯ ========================

def test_handler():
    """Тестовый вызов функции"""
    test_event = {
        "httpMethod": "GET",
        "path": "/seo-admin",
        "headers": {
            "X-Authorization": f"Bearer {os.environ.get('SEO_ADMIN_PASSWORD', 'test')}",
            "X-Forwarded-For": "127.0.0.1"
        }
    }
    result = handler(test_event, None)
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return result

if __name__ == "__main__":
    test_handler()