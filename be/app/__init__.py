"""Flask application factory"""
from flask import Flask, jsonify

from app.config.environment import get_config
from app.config.extensions import db, migrate, jwt, mail, cors, limiter
from app.config.utilities_setup import register_error_handlers, register_jwt_callbacks, register_request_logger


def create_app(config_class=None):
    app = Flask(__name__)
    
    if config_class is None:
        config_class = get_config()
    app.config.from_object(config_class)
    
    _init_extensions(app)
    _register_blueprints(app)
    
    register_error_handlers(app)
    register_jwt_callbacks(app, jwt)
    register_request_logger(app)
    
    @app.route('/health')
    def health():
        return jsonify({'success': True, 'message': 'OK'}), 200
    
    # Startup log
    cors_origins = app.config.get('CORS_ORIGINS', ['*'])
    if isinstance(cors_origins, list):
        cors_str = ', '.join(cors_origins)
    else:
        cors_str = str(cors_origins)
        
    port = app.config.get('PORT', 5000)
    host = app.config.get('HOST', '127.0.0.1')
    server_url = f"http://{host}:{port}"
        
    print(
        f"\n{'='*55}\n\n"
        f"🚀 Server API Started Successfully\n\n"
        f"{'-'*55}\n\n"
        f"⚙️  Environment  : {config_class.__name__}\n"
        f"🔗 Server URL   : {server_url}\n"
        f"🔌 CORS Origins : {cors_str}\n\n"
        f"{'='*55}\n"
    )
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

