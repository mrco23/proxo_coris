"""Authentication middleware and decorators"""
from functools import wraps
from flask import request
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity

from app.config.extensions import db
from app.database.models import User, UserRole
from app.utils.exceptions import UnauthorizedError, ForbiddenError


def get_current_user():
    try:
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        return db.session.get(User, user_id)
    except Exception:
        return None


def jwt_required_custom(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        
        user = db.session.get(User, user_id)
        if not user:
            raise UnauthorizedError("User not found")
        
        if not user.is_active:
            raise ForbiddenError("Account is deactivated")
        
        request.current_user = user
        return fn(*args, **kwargs)
    return wrapper


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        
        user = db.session.get(User, user_id)
        if not user:
            raise UnauthorizedError("User not found")
        
        if not user.is_active:
            raise ForbiddenError("Account is deactivated")
        
        if user.role != UserRole.ADMIN:
            raise ForbiddenError("Admin access required")
        
        request.current_user = user
        return fn(*args, **kwargs)
    return wrapper


def verified_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        
        user = db.session.get(User, user_id)
        if not user:
            raise UnauthorizedError("User not found")
        
        if not user.is_active:
            raise ForbiddenError("Account is deactivated")
        
        if not user.is_verified:
            raise ForbiddenError("Email verification required")
        
        request.current_user = user
        return fn(*args, **kwargs)
    return wrapper


def optional_jwt(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request(optional=True)
            user_id = get_jwt_identity()
            
            if user_id:
                user = db.session.get(User, user_id)
                request.current_user = user if user and user.is_active else None
            else:
                request.current_user = None
        except Exception:
            request.current_user = None
        
        return fn(*args, **kwargs)
    return wrapper
