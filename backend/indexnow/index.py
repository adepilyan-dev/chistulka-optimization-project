import json
import urllib.request
import urllib.error

INDEXNOW_KEY = "3903e80660fd4dc98248e0978a7cc029"
HOST = "arenda-chistoty.ru"
KEY_LOCATION = f"https://{HOST}/{INDEXNOW_KEY}.txt"

# Эндпоинт Яндекса для отправки нескольких URL
ENDPOINTS = [
    "https://yandex.com/indexnow",
]

def handler(event: dict, context) -> dict:
    """Отправляет все URL сайта в поисковики через IndexNow (Яндекс)"""
    # Обработка CORS-запроса (OPTIONS)
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    # Получаем список URL из тела запроса или используем все URL сайта
    body = json.loads(event.get("body") or "{}")
    urls = body.get("urls")

    if not urls:
        urls = get_all_urls()

    # Формируем payload для IndexNow
    payload = json.dumps({
        "host": HOST,
        "key": INDEXNOW_KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }).encode("utf-8")

    results = []
    for endpoint in ENDPOINTS:
        try:
            req = urllib.request.Request(
                endpoint,
                data=payload,
                headers={"Content-Type": "application/json; charset=utf-8"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                results.append({"endpoint": endpoint, "status": resp.status})
        except urllib.error.HTTPError as e:
            results.append({"endpoint": endpoint, "status": e.code, "error": e.reason})
        except Exception as e:
            results.append({"endpoint": endpoint, "status": 0, "error": str(e)})

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            "success": True,
            "urls_sent": len(urls),
            "results": results,
        }),
    }


def get_all_urls() -> list:
    """
    Возвращает список реально существующих страниц сайта.
    ВАЖНО: добавляйте только те URL, которые открываются и возвращают код 200.
    """
    return [
        f"https://{HOST}/",          # Главная страница
        # Добавляйте сюда другие реальные страницы, если они есть.
        # Например:
        # f"https://{HOST}/uslugi",
        # f"https://{HOST}/kontakty",
    ]