"""
Routes package.
Registers all API blueprints with the Flask app.
"""
from flask import Flask

from app.api.routes.auth_route import auth_bp
from app.api.routes.user_route import user_bp


def register_routes(app: Flask) -> None:
    """
    Register all API blueprints with the Flask application.
    
    Args:
        app: Flask application instance
    """
    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
