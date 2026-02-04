"""
Pytest fixtures and configuration.
"""
import pytest
import sys
import os

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app
from app.config.environment import TestingConfig
from app.config.extensions import db
from app.database.models import User, UserRole
from app.utils.password import hash_password


@pytest.fixture(scope='session')
def app():
    """Create application for testing."""
    app = create_app(TestingConfig)
    
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()


@pytest.fixture(scope='function')
def client(app):
    """Create test client."""
    return app.test_client()


@pytest.fixture(scope='function')
def db_session(app):
    """Create database session for testing."""
    with app.app_context():
        connection = db.engine.connect()
        transaction = connection.begin()
        
        # Start a savepoint
        nested = connection.begin_nested()
        
        yield db.session
        
        # Rollback transaction
        if nested.is_active:
            nested.rollback()
        transaction.rollback()
        connection.close()


@pytest.fixture
def test_user(app):
    """Create a test user."""
    with app.app_context():
        user = User(
            email="test@example.com",
            username="testuser",
            password_hash=hash_password("Test123!"),
            full_name="Test User",
            role=UserRole.USER,
            is_verified=True,
            is_active=True
        )
        db.session.add(user)
        db.session.commit()
        
        user_id = user.id
        
        yield user
        
        # Cleanup
        db.session.query(User).filter_by(id=user_id).delete()
        db.session.commit()


@pytest.fixture
def test_admin(app):
    """Create a test admin user."""
    with app.app_context():
        admin = User(
            email="admin@example.com",
            username="testadmin",
            password_hash=hash_password("Admin123!"),
            full_name="Test Admin",
            role=UserRole.ADMIN,
            is_verified=True,
            is_active=True
        )
        db.session.add(admin)
        db.session.commit()
        
        admin_id = admin.id
        
        yield admin
        
        # Cleanup
        db.session.query(User).filter_by(id=admin_id).delete()
        db.session.commit()


@pytest.fixture
def auth_headers(client, test_user):
    """Get authentication headers for test user."""
    with client.application.app_context():
        response = client.post('/api/auth/login', json={
            'email': 'test@example.com',
            'password': 'Test123!'
        })
        
        data = response.get_json()
        token = data['data']['access_token']
        
        return {'Authorization': f'Bearer {token}'}


@pytest.fixture
def admin_headers(client, test_admin):
    """Get authentication headers for admin user."""
    with client.application.app_context():
        response = client.post('/api/auth/login', json={
            'email': 'admin@example.com',
            'password': 'Admin123!'
        })
        
        data = response.get_json()
        token = data['data']['access_token']
        
        return {'Authorization': f'Bearer {token}'}
