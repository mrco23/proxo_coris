"""
User tests.
"""
import pytest


class TestGetMe:
    """Tests for getting current user profile."""
    
    def test_get_me_success(self, client, auth_headers):
        """Test getting current user profile."""
        response = client.get('/api/users/me', headers=auth_headers)
        
        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True
        assert data['data']['email'] == 'test@example.com'
    
    def test_get_me_no_auth(self, client):
        """Test getting profile without authentication."""
        response = client.get('/api/users/me')
        
        assert response.status_code == 401


class TestUpdateMe:
    """Tests for updating current user profile."""
    
    def test_update_me_success(self, client, auth_headers):
        """Test updating current user profile."""
        response = client.put('/api/users/me', headers=auth_headers, json={
            'full_name': 'Updated Name'
        })
        
        assert response.status_code == 200
        data = response.get_json()
        assert data['data']['full_name'] == 'Updated Name'


class TestAdminUserManagement:
    """Tests for admin user management."""
    
    def test_get_users_as_admin(self, client, admin_headers):
        """Test getting user list as admin."""
        response = client.get('/api/users', headers=admin_headers)
        
        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True
        assert 'data' in data
    
    def test_get_users_as_regular_user(self, client, auth_headers):
        """Test getting user list as regular user (should fail)."""
        response = client.get('/api/users', headers=auth_headers)
        
        assert response.status_code == 403
