"""Email service using Flask-Mail"""
from flask import current_app, render_template_string
from flask_mail import Message

from app.config.extensions import mail
from app.utils.logger import logger

VERIFICATION_EMAIL_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button { display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white !important; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { margin-top: 30px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Verify Your Email</h1>
        <p>Thank you for registering. Please click the button below to verify your email address:</p>
        <a href="{{ verification_url }}" class="button">Verify Email</a>
        <p>Or copy this link: {{ verification_url }}</p>
        <p>This link will expire in 24 hours.</p>
    </div>
</body>
</html>
"""

PASSWORD_RESET_EMAIL_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button { display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white !important; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { margin-top: 30px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Reset Your Password</h1>
        <p>Click the button below to create a new password:</p>
        <a href="{{ reset_url }}" class="button">Reset Password</a>
        <p>Or copy this link: {{ reset_url }}</p>
        <p>This link will expire in 1 hour.</p>
    </div>
</body>
</html>
"""


def send_email(to, subject, html_body, text_body=None):
    try:
        msg = Message(
            subject=subject,
            recipients=[to],
            html=html_body,
            body=text_body or "Please view this email in an HTML-capable client."
        )
        mail.send(msg)
        logger.info(f"Email sent to {to}: {subject}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email to {to}: {e}")
        return False


def send_verification_email(to, token):
    base_url = current_app.config.get('FRONTEND_URL', 'http://localhost:5173')
    verification_url = f"{base_url}/verify-email?token={token}"
    
    html_body = render_template_string(VERIFICATION_EMAIL_TEMPLATE, verification_url=verification_url)
    return send_email(to=to, subject="Verify Your Email Address", html_body=html_body)


def send_password_reset_email(to, token):
    base_url = current_app.config.get('FRONTEND_URL', 'http://localhost:5173')
    reset_url = f"{base_url}/reset-password?token={token}"
    
    html_body = render_template_string(PASSWORD_RESET_EMAIL_TEMPLATE, reset_url=reset_url)
    return send_email(to=to, subject="Reset Your Password", html_body=html_body)
