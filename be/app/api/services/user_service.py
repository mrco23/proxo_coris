"""User service - Business logic for user operations"""
from sqlalchemy import or_, asc, desc

from app.config.extensions import db
from app.database.models import User, UserRole
from app.utils.exceptions import NotFoundError, ConflictError


class UserService:
    
    @staticmethod
    def get_by_id(user_id):
        user = db.session.get(User, user_id)
        if not user:
            raise NotFoundError("User not found")
        return user
    
    @staticmethod
    def get_all(page=1, per_page=20, search=None, role=None, 
                is_verified=None, is_active=None, sort_by='created_at', sort_order='desc'):
        query = db.session.query(User)
        
        # Apply filters
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    User.email.ilike(search_term),
                    User.username.ilike(search_term),
                    User.full_name.ilike(search_term)
                )
            )
        
        if role:
            query = query.filter(User.role == UserRole(role))
        
        if is_verified is not None:
            query = query.filter(User.is_verified == is_verified)
        
        if is_active is not None:
            query = query.filter(User.is_active == is_active)
        
        # Get total count
        total = query.count()
        
        # Apply sorting
        sort_column = getattr(User, sort_by, User.created_at)
        sort_func = desc if sort_order == 'desc' else asc
        query = query.order_by(sort_func(sort_column))
        
        # Apply pagination
        offset = (page - 1) * per_page
        users = query.offset(offset).limit(per_page).all()
        
        return users, total
    
    @staticmethod
    def update(user, **kwargs):
        # Check for unique constraints
        if 'username' in kwargs and kwargs['username']:
            existing = db.session.query(User).filter(
                User.username == kwargs['username'].lower(),
                User.id != user.id
            ).first()
            if existing:
                raise ConflictError("Username already taken")
            kwargs['username'] = kwargs['username'].lower()
        
        if 'email' in kwargs and kwargs['email']:
            existing = db.session.query(User).filter(
                User.email == kwargs['email'].lower(),
                User.id != user.id
            ).first()
            if existing:
                raise ConflictError("Email already registered")
            kwargs['email'] = kwargs['email'].lower()
        
        # Handle role conversion
        if 'role' in kwargs and kwargs['role']:
            kwargs['role'] = UserRole(kwargs['role'])
        
        # Update fields
        for key, value in kwargs.items():
            if value is not None and hasattr(user, key):
                setattr(user, key, value)
        
        db.session.commit()
        return user
    
    @staticmethod
    def delete(user_id):
        user = db.session.get(User, user_id)
        if not user:
            raise NotFoundError("User not found")
        
        db.session.delete(user)
        db.session.commit()
    
    @staticmethod
    def deactivate(user_id):
        user = db.session.get(User, user_id)
        if not user:
            raise NotFoundError("User not found")
        
        user.is_active = False
        db.session.commit()
        
        return user
