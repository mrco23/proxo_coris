"""Social Auth service"""
import re
from datetime import datetime, timezone

from flask_jwt_extended import create_access_token, create_refresh_token
import requests as http_requests

from app.config.extensions import db
from app.database.models import User
from app.utils.exceptions import UnauthorizedError, BadRequestError, NotFoundError, ConflictError
from app.utils.logger import logger


class SocialAuthService:

    @staticmethod
    def _generate_unique_username(base_name: str) -> str:
        base = re.sub(r'[^a-zA-Z0-9_]', '', base_name.lower().replace(' ', '_'))
        base = base[:40] or 'user'
        username = base
        counter = 1
        while db.session.query(User).filter_by(username=username).first():
            username = f"{base}{counter}"
            counter += 1
        return username

    @staticmethod
    def verify_google_token(access_token: str) -> dict:
        try:
            response = http_requests.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                headers={'Authorization': f'Bearer {access_token}'},
                timeout=10
            )
        except Exception:
            raise BadRequestError("Gagal terhubung ke server Google")

        if response.status_code != 200:
            raise UnauthorizedError("Token Google tidak valid")

        data = response.json()

        if not data.get('email'):
            raise BadRequestError("Email tidak tersedia dari Google")

        return {
            'email': data.get('email'),
            'full_name': data.get('name'),
            'avatar_url': data.get('picture'),
            'provider_id': data.get('sub'),
        }

    @staticmethod
    def google_auth(access_token: str, intent: str = 'login'):
        """
        intent='login'    → hanya user terdaftar yang bisa masuk
        intent='register' → buat akun baru, tolak jika sudah ada
        """
        user_info = SocialAuthService.verify_google_token(access_token)

        email = user_info['email'].lower()
        provider_id = user_info['provider_id']

        # Cari user yang sudah ada
        existing = (
            db.session.query(User).filter_by(auth_provider='google', provider_id=provider_id).first()
            or db.session.query(User).filter_by(email=email).first()
        )

        # ── LOGIN ──
        if intent == 'login':
            if not existing:
                raise NotFoundError("Akun tidak ditemukan. Silakan daftar terlebih dahulu.")
            if not existing.is_active:
                raise UnauthorizedError("Akun telah dinonaktifkan.")

            # Link provider jika belum
            if not existing.provider_id:
                existing.provider_id = provider_id
                existing.auth_provider = 'google'

            existing.last_login_at = datetime.now(timezone.utc)
            if user_info['avatar_url'] and not existing.avatar_url:
                existing.avatar_url = user_info['avatar_url']
            db.session.commit()

            return existing, create_access_token(identity=existing.id), create_refresh_token(identity=existing.id), False

        # ── REGISTER ──
        if intent == 'register':
            if existing:
                raise ConflictError("Email ini sudah terdaftar. Silakan login.")

            username = SocialAuthService._generate_unique_username(
                user_info['full_name'] or email.split('@')[0]
            )

            new_user = User(
                email=email,
                username=username,
                password_hash=None,
                full_name=user_info['full_name'],
                avatar_url=user_info['avatar_url'],
                auth_provider='google',
                provider_id=provider_id,
                is_verified=True,
                last_login_at=datetime.now(timezone.utc)
            )

            db.session.add(new_user)
            db.session.commit()
            logger.info(f"New user registered via Google: {email}")

            return new_user, create_access_token(identity=new_user.id), create_refresh_token(identity=new_user.id), True

        raise BadRequestError("Intent tidak valid.")