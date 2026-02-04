"""
Authentication tests.
"""
import pytest


class TestRegister:
    """Tests for user registration."""
    
    def test_register_success(self, client):
        """Test successful registration."""
        response = client.post('/api/auth/register', json={
            'email': 'newuser@example.com',
            'username': 'newuser',
            'password': 'NewUser123!',
            'full_name': 'New User'
        })
        
        assert response.status_code == 201
        data = response.get_json()
        assert data['success'] is True
        assert data['data']['email'] == 'newuser@example.com'
        assert data['data']['username'] == 'newuser'
    
    def test_register_duplicate_email(self, client, test_user):
        """Test registration with duplicate email."""
        response = client.post('/api/auth/register', json={
            'email': 'test@example.com',  # Already exists
            'username': 'anotheruser',
            'password': 'Test123!'
        })
        
        assert response.status_code == 409
    
    def test_register_invalid_email(self, client):
        """Test registration with invalid email format."""
        response = client.post('/api/auth/register', json={
            'email': 'invalid-email',
            'username': 'testuser',
            'password': 'Test123!'
        })
        
        assert response.status_code == 422


class TestLogin:
    """Tests for user login."""
    
    def test_login_success(self, client, test_user):
        """Test successful login."""
        response = client.post('/api/auth/login', json={
            'email': 'test@example.com',
            'password': 'Test123!'
        })
        
        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True
        assert 'access_token' in data['data']
        assert 'refresh_token' in data['data']
    
    def test_login_invalid_password(self, client, test_user):
        """Test login with wrong password."""
        response = client.post('/api/auth/login', json={
            'email': 'test@example.com',
            'password': 'WrongPassword!'
        })
        
        assert response.status_code == 401
    
    def test_login_nonexistent_user(self, client):
        """Test login with non-existent email."""
        response = client.post('/api/auth/login', json={
            'email': 'nonexistent@example.com',
            'password': 'Test123!'
        })
        
        assert response.status_code == 401
