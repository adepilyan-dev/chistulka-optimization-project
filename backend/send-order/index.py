import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту arenda-chistoty.ru@yandex.ru"""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    furniture = body.get("furniture", [])
    time_call = body.get("time", "").strip()
    comment = body.get("comment", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}),
        }

    furniture_str = ", ".join(furniture) if furniture else "Не указано"
    time_str = time_call if time_call else "Не указано"
    comment_str = comment if comment else "—"

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 520px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 12px;">
      <h2 style="color: #0cb8a0; margin-top: 0;">Новая заявка на химчистку</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #888; width: 40%;">Имя</td><td style="padding: 8px 0; font-weight: bold;">{name}</td></tr>
        <tr><td style="padding: 8px 0; color: #888;">Телефон</td><td style="padding: 8px 0; font-weight: bold;"><a href="tel:{phone}" style="color: #0cb8a0;">{phone}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #888;">Мебель</td><td style="padding: 8px 0;">{furniture_str}</td></tr>
        <tr><td style="padding: 8px 0; color: #888;">Время звонка</td><td style="padding: 8px 0;">{time_str}</td></tr>
        <tr><td style="padding: 8px 0; color: #888;">Комментарий</td><td style="padding: 8px 0;">{comment_str}</td></tr>
      </table>
    </div>
    """

    email_from = "arenda-chistoty.ru@yandex.ru"  # noqa
    email_to = "arenda-chistoty.ru@yandex.ru"
    password = os.environ["SMTP_PASSWORD"]

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Заявка с сайта: {name} — {furniture_str}"
    msg["From"] = email_from
    msg["To"] = email_to
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
        server.login(email_from, password)
        server.sendmail(email_from, email_to, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }