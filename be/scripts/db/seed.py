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
        "email": "user1@example.com",
        "username": "testuser1",
        "password": "User123!",
        "full_name": "Test User 1",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user2@example.com",
        "username": "testuser2",
        "password": "User123!",
        "full_name": "Test User 2",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user3@example.com",
        "username": "testuser3",
        "password": "User123!",
        "full_name": "Test User 3",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user4@example.com",
        "username": "testuser4",
        "password": "User123!",
        "full_name": "Test User 4",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user5@example.com",
        "username": "testuser5",
        "password": "User123!",
        "full_name": "Test User 5",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user6@example.com",
        "username": "testuser6",
        "password": "User123!",
        "full_name": "Test User 6",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user7@example.com",
        "username": "testuser7",
        "password": "User123!",
        "full_name": "Test User 7",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user8@example.com",
        "username": "testuser8",
        "password": "User123!",
        "full_name": "Test User 8",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user9@example.com",
        "username": "testuser9",
        "password": "User123!",
        "full_name": "Test User 9",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user10@example.com",
        "username": "testuser10",
        "password": "User123!",
        "full_name": "Test User 10",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user11@example.com",
        "username": "testuser11",
        "password": "User123!",
        "full_name": "Test User 11",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user12@example.com",
        "username": "testuser12",
        "password": "User123!",
        "full_name": "Test User 12",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user13@example.com",
        "username": "testuser13",
        "password": "User123!",
        "full_name": "Test User 13",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user14@example.com",
        "username": "testuser14",
        "password": "User123!",
        "full_name": "Test User 14",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user15@example.com",
        "username": "testuser15",
        "password": "User123!",
        "full_name": "Test User 15",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user16@example.com",
        "username": "testuser16",
        "password": "User123!",
        "full_name": "Test User 16",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user17@example.com",
        "username": "testuser17",
        "password": "User123!",
        "full_name": "Test User 17",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user18@example.com",
        "username": "testuser18",
        "password": "User123!",
        "full_name": "Test User 18",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user19@example.com",
        "username": "testuser19",
        "password": "User123!",
        "full_name": "Test User 19",
        "role": UserRole.USER,
        "is_verified": True,
        "auth_provider": "local",
    },
    {
        "email": "user20@example.com",
        "username": "testuser20",
        "password": "User123!",
        "full_name": "Test User 20",
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