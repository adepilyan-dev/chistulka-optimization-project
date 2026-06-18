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
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    }

def check_auth(event):
    # Используем стандартный заголовок Authorization
    auth_header = event.get("headers", {}).get("Authorization", "")
    password = os.environ.get("SEO_ADMIN_PASSWORD", "")
    return auth_header == f"Bearer {password}"

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
            cur.execute(
                sql.SQL(
                    "SELECT page_key, page_label, title, description, keywords, schema_json, updated_at FROM {}.seo_settings ORDER BY id"
                ).format(sql.Identifier(SCHEMA))
            )
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

            cur.execute(
                sql.SQL("SELECT content FROM {}.seo_robots ORDER BY id DESC LIMIT 1").format(sql.Identifier(SCHEMA))
            )
            robots_row = cur.fetchone()
            robots = robots_row[0] if robots_row else ""

            return {
                "statusCode": 200,
                "headers": {**cors_headers(), "Content-Type": "application/json"},
                "body": json.dumps({"pages": pages, "robots": robots}),
            }

        # POST /seo-admin/page — сохранить настройки одной страницы
        if method == "POST" and "page" in path:
            body = json.loads(event.get("body") or "{}")
            page_key = body.get("page_key", "").strip()
            
            if not page_key:
                return {
                    "statusCode": 400,
                    "headers": {**cors_headers(), "Content-Type": "application/json"},
                    "body": json.dumps({"error": "page_key обязателен"}),
                }

            title = body.get("title", "")[:255]  # ограничение длины
            description = body.get("description", "")[:500]
            keywords = body.get("keywords", "")[:255]
            schema_json = body.get("schema_json", "")

            # Проверка валидности JSON (если передан)
            if schema_json:
                try:
                    json.loads(schema_json)
                except json.JSONDecodeError:
                    return {
                        "statusCode": 400,
                        "headers": {**cors_headers(), "Content-Type": "application/json"},
                        "body": json.dumps({"error": "schema_json должен быть валидным JSON"}),
                    }

            cur.execute(
                sql.SQL("""
                    INSERT INTO {}.seo_settings (page_key, page_label, title, description, keywords, schema_json, updated_at)
                    VALUES (%s, %s, %s, %s, %s, %s, NOW())
                    ON CONFLICT (page_key) DO UPDATE
                    SET title=%s, description=%s, keywords=%s, schema_json=%s, updated_at=NOW()
                """).format(sql.Identifier(SCHEMA)),
                (page_key, page_key, title, description, keywords, schema_json,
                 title, description, keywords, schema_json),
            )
            conn.commit()
            return {
                "statusCode": 200,
                "headers": {**cors_headers(), "Content-Type": "application/json"},
                "body": json.dumps({"ok": True}),
            }

        # POST /seo-admin/robots — сохранить robots.txt
        if method == "POST" and "robots" in path:
            body = json.loads(event.get("body") or "{}")
            content = body.get("content", "")
            
            cur.execute(sql.SQL("DELETE FROM {}.seo_robots").format(sql.Identifier(SCHEMA)))
            cur.execute(
                sql.SQL("INSERT INTO {}.seo_robots (content) VALUES (%s)").format(sql.Identifier(SCHEMA)),
                (content,)
            )
            conn.commit()
            return {
                "statusCode": 200,
                "headers": {**cors_headers(), "Content-Type": "application/json"},
                "body": json.dumps({"ok": True}),
            }

        return {
            "statusCode": 404,
            "headers": {**cors_headers(), "Content-Type": "application/json"},
            "body": json.dumps({"error": "Not found"}),
        }

    except Exception as e:
        conn.rollback()
        return {
            "statusCode": 500,
            "headers": {**cors_headers(), "Content-Type": "application/json"},
            "body": json.dumps({"error": f"Database error: {str(e)}"}),
        }
    finally:
        cur.close()
        conn.close()