import json
import urllib.request

URL_TO_CHECK = "https://arenda-chistoty.ru"

def handler(event: dict, context) -> dict:
    """Запускает PageSpeed Insights для сайта и возвращает ключевые метрики и ошибки"""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type"}, "body": ""}

    strategy = (event.get("queryStringParameters") or {}).get("strategy", "mobile")
    api_url = f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={URL_TO_CHECK}&strategy={strategy}"

    req = urllib.request.Request(api_url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = json.loads(resp.read())

    cats = data.get("categories", {})
    audits = data.get("audits", {})

    scores = {
        "performance": round((cats.get("performance", {}).get("score") or 0) * 100),
        "seo": round((cats.get("seo", {}).get("score") or 0) * 100),
        "accessibility": round((cats.get("accessibility", {}).get("score") or 0) * 100),
        "best_practices": round((cats.get("best-practices", {}).get("score") or 0) * 100),
    }

    metrics = {
        "lcp": audits.get("largest-contentful-paint", {}).get("displayValue", "—"),
        "fcp": audits.get("first-contentful-paint", {}).get("displayValue", "—"),
        "tbt": audits.get("total-blocking-time", {}).get("displayValue", "—"),
        "cls": audits.get("cumulative-layout-shift", {}).get("displayValue", "—"),
        "si": audits.get("speed-index", {}).get("displayValue", "—"),
        "tti": audits.get("interactive", {}).get("displayValue", "—"),
    }

    failed = []
    for audit_id, audit in audits.items():
        score = audit.get("score")
        if score is not None and score < 1 and audit.get("scoreDisplayMode") not in ("informative", "notApplicable", "manual"):
            failed.append({
                "id": audit_id,
                "title": audit.get("title", ""),
                "description": audit.get("description", "")[:200],
                "displayValue": audit.get("displayValue", ""),
                "score": score,
                "savings_ms": audit.get("details", {}).get("overallSavingsMs") if audit.get("details") else None,
            })

    failed.sort(key=lambda x: x["score"])

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"scores": scores, "metrics": metrics, "failed_audits": failed, "strategy": strategy}),
    }
