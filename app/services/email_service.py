import smtplib
import traceback
from email.message import EmailMessage

from app.config import get_settings


async def send_email(subject: str, recipients: list[str], body: str) -> bool:
    settings = get_settings()
    if not settings.smtp_user or not settings.smtp_password or not recipients:
        return False

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = settings.smtp_from_email or settings.smtp_user
    message["To"] = ", ".join(recipients)
    message.set_content(body)

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=30) as server:
            if settings.smtp_use_tls:
                server.starttls()
            server.login(settings.smtp_user, settings.smtp_password)
            server.send_message(message)
        return True
    except Exception:
        traceback.print_exc()
        return False
