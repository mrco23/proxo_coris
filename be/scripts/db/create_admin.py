"""
Admin user creation script.
Run with: python -m scripts.db.create_admin
"""
import sys
import os
import getpass

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app import create_app
from app.config.extensions import db
from app.database.models import User, UserRole
from app.utils.password import hash_password


def create_admin():
    """Interactive admin user creation."""
    print("=" * 40)
    print("Admin User Creation")
    print("=" * 40)
    
    # Get user input
    email = input("Email: ").strip()
    username = input("Username: ").strip()
    full_name = input("Full Name (optional): ").strip() or None
    password = getpass.getpass("Password: ")
    confirm_password = getpass.getpass("Confirm Password: ")
    
    # Validate
    if not email or not username:
        print("Error: Email and username are required")
        return False
    
    if len(password) < 8:
        print("Error: Password must be at least 8 characters")
        return False
    
    if password != confirm_password:
        print("Error: Passwords do not match")
        return False
    
    app = create_app()
    
    with app.app_context():
        # Create tables
        db.create_all()
        
        # Check if user exists
        existing = db.session.query(User).filter(
            (User.email == email.lower()) | (User.username == username.lower())
        ).first()
        
        if existing:
            print(f"Error: User with email or username already exists")
            return False
        
        # Create admin user
        admin = User(
            email=email.lower(),
            username=username.lower(),
            password_hash=hash_password(password),
            full_name=full_name,
            role=UserRole.ADMIN,
            is_verified=True,
            is_active=True
        )
        
        db.session.add(admin)
        db.session.commit()
        
        print("-" * 40)
        print(f"Admin user created successfully!")
        print(f"Email: {admin.email}")
        print(f"Username: {admin.username}")
        print(f"ID: {admin.id}")
        print("-" * 40)
        
        return True


if __name__ == "__main__":
    success = create_admin()
    sys.exit(0 if success else 1)
