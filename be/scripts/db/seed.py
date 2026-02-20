"""
Database seeding script.
Run with: python -m scripts.db.seed
"""
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app import create_app
from app.config.extensions import db
from app.database.models import User, UserRole
from app.utils.password import hash_password


SEED_USERS = [
    {
        "email": "admin@example.com",
        "username": "admin",
        "password": "Admin123!",
        "full_name": "Administrator",
        "role": UserRole.ADMIN,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user@example.com",
        "username": "testuser",
        "password": "User123!",
        "full_name": "Test User",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
]


def seed_users():
    created = 0

    for data in SEED_USERS:
        existing = db.session.query(User).filter_by(email=data["email"]).first()
        if existing:
            print(f"Skip: {data['email']} sudah ada")
            continue

        user = User(
            email=data["email"],
            username=data["username"],
            password_hash=hash_password(data["password"]),
            full_name=data["full_name"],
            role=data["role"],
            is_verified=data["is_verified"],
            is_active=True,
            auth_provider=data["auth_provider"],
        )

        db.session.add(user)
        created += 1
        print(f"Created : {data['email']} ({data['role'].value})")

    db.session.commit()
    print(f"\nSeeding selesai! {created} user dibuat.")


def run_seed():
    app = create_app()
    with app.app_context():
        print("=" * 40)
        print("Database Seeding")
        print("=" * 40)
        db.create_all()
        seed_users()
        print("=" * 40)


if __name__ == "__main__":
    run_seed()