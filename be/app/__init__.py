"""Flask application factory"""
from flask import Flask, jsonify
from werkzeug.exceptions import HTTPException as WerkzeugHTTPException

from app.config.environment import get_config
from app.config.extensions import db, migrate, jwt, mail, cors, limiter
from app.utils.exceptions import HTTPException
from app.utils.response import error_response
from app.utils.logger import logger


def create_app(config_class=None):
    app = Flask(__name__)
    
    if config_class is None:
        config_class = get_config()
    app.config.from_object(config_class)
    
    _init_extensions(app)
    _register_blueprints(app)
    _register_error_handlers(app)
    _register_jwt_callbacks(app)
    
    @app.route('/health')
    def health():
        return jsonify({'success': True, 'message': 'OK'}), 200
    
    logger.info(f"Application created with config: {config_class.__name__}")
    
    return app


def _init_extensions(app):
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    mail.init_app(app)
    limiter.init_app(app)
    
    cors.init_app(app, resources={
        r"/api/*": {
            "origins": app.config.get('CORS_ORIGINS', ['*']),
            "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })


def _register_blueprints(app):
    from app.api.routes import register_routes
    register_routes(app)


def _register_error_handlers(app):
    
    @app.errorhandler(HTTPException)
    def handle_http_exception(error):
        return jsonify(error.to_dict()), error.status_code
    
    @app.errorhandler(WerkzeugHTTPException)
    def handle_werkzeug_exception(error):
        return error_response(message=error.description, status_code=error.code)
    
    @app.errorhandler(Exception)
    def handle_generic_exception(error):
        logger.exception(f"Unhandled exception: {error}")
        return error_response(message="Internal Server Error", status_code=500)
    
    @app.errorhandler(429)
    def handle_rate_limit_error(error):
        return error_response(message="Rate limit exceeded. Please try again later.", status_code=429)


def _register_jwt_callbacks(app):
    
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return error_response(message="Token has expired", status_code=401)
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return error_response(message="Invalid token", status_code=401)
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return error_response(message="Authorization token is required", status_code=401)
    
    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        return error_response(message="Token has been revoked", status_code=401)
