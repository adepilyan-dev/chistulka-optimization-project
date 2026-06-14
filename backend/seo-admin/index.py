import json
import os
import psycopg2
from psycopg2 import sql

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "public")


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def cors_headers():
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Authorization",
    }


def check_auth(event):
    token = event.get("headers", {}).get("X-Authorization", "")
    password = os.environ.get("SEO_ADMIN_PASSWORD", "")
    return token == f"Bearer {password}"


def validate_schema_json(value):
    """Проверяет, что schema_json - валидный JSON"""
    if value:
        try:
            json.loads(value)
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON in schema_json: {str(e)}")
    return value


def validate_page_key(page_key):
    """Проверяет page_key на допустимые символы"""
    if not page_key or not page_key.strip():
        raise ValueError("page_key is required")
    
    # Разрешаем только буквы, цифры, дефис и подчеркивание
    import re
    if not re.match(r'^[a-zA-Z0-9_-]+$', page_key):
        raise ValueError("page_key must contain only letters, numbers, hyphens, and underscores")
    
    return page_key.strip()


def handler(event: dict, context) -> dict:
    """SEO Admin API — чтение и сохранение SEO-настроек, robots.txt"""

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers(), "body": ""}

    if not check_auth(event):
        return {
            "statusCode": 401,
            "headers": {**cors_headers(), "Content-Type": "application/json"},
            "body": json.dumps({"error": "Unauthorized"}),
        }

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")

    conn = get_conn()
    cur = conn.cursor()

    try:
        # GET /seo-admin — получить все SEO-настройки и robots
        if method == "GET":
            # Безопасное выполнение с экранированием схемы
            query = sql.SQL(
                "SELECT page_key, page_label, title, description, keywords, schema_json, updated_at FROM {}.seo_settings ORDER BY id"
            ).format(sql.Identifier(SCHEMA))
            cur.execute(query)
            rows = cur.fetchall()
            pages = [
                {
                    "page_key": r[0],
                    "page_label": r[1],
                    "title": r[2] or "",
                    "description": r[3] or "",
                    "keywords": r[4] or "",
                    "schema_json": r[5] or "",
                    "updated_at": r[6].isoformat() if r[6] else None,
                }
                for r in rows
            ]

            query = sql.SQL("SELECT content FROM {}.seo_robots ORDER BY id DESC LIMIT 1").format(
                sql.Identifier(SCHEMA)
            )
            cur.execute(query)
            robots_row = cur.fetchone()
            robots = robots_row[0] if robots_row else ""

            return {
                "statusCode": 200,
                "headers": {**cors_headers(), "Content-Type": "application/json"},
                "body": json.dumps({"pages": pages, "robots": robots}),
            }

        # POST /seo-admin/page — сохранить настройки одной страницы
        if method == "POST" and path.endswith("/page"):
            try:
                body = json.loads(event.get("body") or "{}")
                
                # Валидация входных данных
                page_key = validate_page_key(body.get("page_key", ""))
                title = body.get("title", "")[:255]  # Ограничение длины
                description = body.get("description", "")[:500]
                keywords = body.get("keywords", "")[:500]
                schema_json = validate_schema_json(body.get("schema_json", ""))
                
            except (json.JSONDecodeError, ValueError) as e:
                return {
                    "statusCode": 400,
                    "headers": {**cors_headers(), "Content-Type": "application/json"},
                    "body": json.dumps({"error": str(e)}),
                }
            
            # Используем параметризованный запрос
            query = sql.SQL("""
                INSERT INTO {}.seo_settings (page_key, page_label, title, description, keywords, schema_json, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, NOW())
                ON CONFLICT (page_key) DO UPDATE
                SET title=%s, description=%s, keywords=%s, schema_json=%s, updated_at=NOW()
            """).format(sql.Identifier(SCHEMA))
            
            cur.execute(
                query,
                (page_key, page_key, title, description, keywords, schema_json,
                 title, description, keywords, schema_json),
            )
            conn.commit()
            return {
                "statusCode": 200,
                "headers": {**cors_headers(), "Content-Type": "application/json"},
                "body": json.dumps({"ok": True, "message": f"Page '{page_key}' updated successfully"}),
            }

        # POST /seo-admin/robots — сохранить robots.txt
        if method == "POST" and path.endswith("/robots"):
            try:
                body = json.loads(event.get("body") or "{}")
                content = body.get("content", "")
                
                # Базовая валидация robots.txt (опционально)
                if len(content) > 100000:  # Лимит 100KB
                    raise ValueError("Robots.txt content exceeds maximum size of 100KB")
                    
            except (json.JSONDecodeError, ValueError) as e:
                return {
                    "statusCode": 400,
                    "headers": {**cors_headers(), "Content-Type": "application/json"},
                    "body": json.dumps({"error": str(e)}),
                }
            
            query_delete = sql.SQL("DELETE FROM {}").format(sql.Identifier(f"{SCHEMA}.seo_robots"))
            query_insert = sql.SQL("INSERT INTO {}.seo_robots (content) VALUES (%s)").format(
                sql.Identifier(SCHEMA)
            )
            
            cur.execute(query_delete)
            cur.execute(query_insert, (content,))
            conn.commit()
            return {
                "statusCode": 200,
                "headers": {**cors_headers(), "Content-Type": "application/json"},
                "body": json.dumps({"ok": True, "message": "Robots.txt updated successfully"}),
            }

        return {
            "statusCode": 404,
            "headers": {**cors_headers(), "Content-Type": "application/json"},
            "body": json.dumps({"error": "Not found"}),
        }

    except psycopg2.Error as e:
        conn.rollback()
        return {
            "statusCode": 500,
            "headers": {**cors_headers(), "Content-Type": "application/json"},
            "body": json.dumps({"error": f"Database error: {str(e)}"}),
        }
    finally:
        cur.close()
        conn.close()