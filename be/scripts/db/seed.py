"""
Database seeding script.
Run with: python -m scripts.db.seed
"""
import sys
import os

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app import create_app
from app.config.extensions import db
from app.database.models import User, UserRole
from app.utils.password import hash_password


def seed_users():
    """Create sample users."""
    users = [
        {
            "email": "admin@example.com",
            "username": "admin",
            "password": "Admin123!",
            "full_name": "Administrator",
            "role": UserRole.ADMIN,
            "is_verified": True
        },
        {
            "email": "user@example.com",
            "username": "testuser",
            "password": "User123!",
            "full_name": "Test User",
            "role": UserRole.USER,
            "is_verified": True
        },
        {
            "email": "unverified@example.com",
            "username": "unverified",
            "password": "User123!",
            "full_name": "Unverified User",
            "role": UserRole.USER,
            "is_verified": False
        }
    ]
    
    created = 0
    
    for user_data in users:
        # Check if user exists
        existing = db.session.query(User).filter_by(email=user_data["email"]).first()
        if existing:
            print(f"User {user_data['email']} already exists, skipping...")
            continue
        
        user = User(
            email=user_data["email"],
            username=user_data["username"],
            password_hash=hash_password(user_data["password"]),
            full_name=user_data["full_name"],
            role=user_data["role"],
            is_verified=user_data["is_verified"]
        )
        
        db.session.add(user)
        created += 1
        print(f"Created user: {user_data['email']}")
    
    db.session.commit()
    print(f"\nSeeding complete! Created {created} users.")


def run_seed():
    """Run database seeding."""
    app = create_app()
    
    with app.app_context():
        print("Starting database seeding...")
        print("-" * 40)
        
        # Create tables if they don't exist
        db.create_all()
        
        # Seed data
        seed_users()
        
        print("-" * 40)
        print("Done!")


if __name__ == "__main__":
    run_seed()
