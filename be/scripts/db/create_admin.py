"""
Admin user creation script.
Run with: python -m scripts.db.create_admin
"""
import sys
import os
import getpass

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app import create_app
from app.config.extensions import db
from app.database.models import User, UserRole
from app.utils.password import hash_password


def create_admin():
    print("=" * 40)
    print("Admin User Creation")
    print("=" * 40)

    email = input("Email: ").strip()
    username = input("Username: ").strip()
    full_name = input("Full Name: ").strip()
    password = getpass.getpass("Password: ")
    confirm_password = getpass.getpass("Confirm Password: ")

    if not email or not username or not full_name:
        print("Error: Email, username, dan full name wajib diisi")
        return False

    if len(password) < 8:
        print("Error: Password minimal 8 karakter")
        return False

    if password != confirm_password:
        print("Error: Password tidak cocok")
        return False

    app = create_app()

    with app.app_context():
        db.create_all()

        existing = db.session.query(User).filter(
            (User.email == email.lower()) | (User.username == username.lower())
        ).first()

        if existing:
            print("Error: Email atau username sudah digunakan")
            return False

        admin = User(
            email=email.lower(),
            username=username.lower(),
            password_hash=hash_password(password),
            full_name=full_name,
            role=UserRole.ADMIN,
            is_verified=True,
            is_active=True,
            auth_provider='local',   # ← tambahan
        )

        db.session.add(admin)
        db.session.commit()

        print("-" * 40)
        print("Admin berhasil dibuat!")
        print(f"Email    : {admin.email}")
        print(f"Username : {admin.username}")
        print(f"ID       : {admin.id}")
        print("-" * 40)
        return True


if __name__ == "__main__":
    success = create_admin()
    sys.exit(0 if success else 1)