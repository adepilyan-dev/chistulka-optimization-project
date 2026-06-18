import json
import urllib.request
import urllib.error

INDEXNOW_KEY = "3903e80660fd4dc98248e0978a7cc029"
HOST = "arenda-chistoty.ru"
KEY_LOCATION = f"https://{HOST}/{INDEXNOW_KEY}.txt"

ENDPOINTS = [
    "https://yandex.com/indexnow",
    "https://api.bing.com/indexnow",
    "https://www.bing.com/indexnow",
]

def handler(event: dict, context) -> dict:
    """Отправляет все URL сайта в поисковики через IndexNow (Яндекс + Bing)"""
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

    body = json.loads(event.get("body") or "{}")
    urls = body.get("urls")

    if not urls:
        urls = get_all_urls()

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
    return [
        f"https://{HOST}/",
        f"https://{HOST}/nashi-raboty",
        f"https://{HOST}/uslugi/himchistka-divanov",
        f"https://{HOST}/uslugi/himchistka-kresel",
        f"https://{HOST}/uslugi/himchistka-matrasov",
        f"https://{HOST}/uslugi/himchistka-kovrov",
        f"https://{HOST}/uslugi/himchistka-stulev",
        f"https://{HOST}/uslugi/himchistka-avtosalona",
        f"https://{HOST}/himchistka-tsentralnyy-okrug",
        f"https://{HOST}/himchistka-prikubanskiy-okrug",
        f"https://{HOST}/himchistka-karasunsky-okrug",
        f"https://{HOST}/himchistka-zapadnyy-okrug",
        f"https://{HOST}/himchistka-yubileynyy",
        f"https://{HOST}/himchistka-gidrostroiteley",
        f"https://{HOST}/himchistka-cheremushki",
        f"https://{HOST}/himchistka-festivalnyy",
        f"https://{HOST}/himchistka-pashkovskiy",
        f"https://{HOST}/himchistka-komsomolskiy",
        f"https://{HOST}/himchistka-rossiyskiy",
        f"https://{HOST}/himchistka-enka",
        f"https://{HOST}/himchistka-9y-kilometr",
        f"https://{HOST}/himchistka-hbk",
        f"https://{HOST}/himchistka-vitaminkombnat",
        f"https://{HOST}/himchistka-molodezhnyy",
        f"https://{HOST}/himchistka-slavyanskiy",
        f"https://{HOST}/himchistka-dubinka",
        f"https://{HOST}/himchistka-40-let-pobedy",
        f"https://{HOST}/himchistka-aviagorodok",
        f"https://{HOST}/himchistka-krasnaya-ploshchad",
        f"https://{HOST}/himchistka-geroev",
        f"https://{HOST}/himchistka-solnechnyy",
        f"https://{HOST}/himchistka-kolosistyy",
        f"https://{HOST}/himchistka-kalinino",
        f"https://{HOST}/himchistka-starokorsunska",
        f"https://{HOST}/himchistka-lenina-poselok",
        f"https://{HOST}/blog/kak-prodlit-zhizn-divanu",
        f"https://{HOST}/blog/chto-delat-prolili-na-divan",
        f"https://{HOST}/blog/velur-kozha-ili-tkan",
        f"https://{HOST}/blog/kak-ubrat-pyatno-krasnogo-vina-s-divana",
        f"https://{HOST}/blog/divan-pahnet-mochoy-kota",
        f"https://{HOST}/blog/5-priznakov-divan-pora-chistit",
        f"https://{HOST}/blog/himchistka-matrasa-doma",
    ]
