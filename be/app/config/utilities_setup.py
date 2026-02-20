"""Flask App Configuration and Setup Utilities"""
import time
from flask import jsonify, request
from werkzeug.exceptions import HTTPException as WerkzeugHTTPException

from app.utils.exceptions import HTTPException
from app.utils.response import error_response
from app.utils.logger import logger


def register_error_handlers(app):
    
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


def register_jwt_callbacks(app, jwt):
    
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


def register_request_logger(app):
    @app.before_request
    def start_timer():
        request._start_time = time.time()
        
    @app.after_request
    def log_request(response):
        # Abaikan request OPTIONS agar log lebih bersih
        if request.method == 'OPTIONS':
            return response
            
        # Hitung durasi proses
        duration = 0
        if hasattr(request, '_start_time'):
            duration = round((time.time() - request._start_time) * 1000)
            
        # Dapatkan IP asli (mendukung reverse proxy)
        ip = request.headers.get('X-Forwarded-For', request.remote_addr)
        if ip and ',' in ip:
            ip = ip.split(',')[0].strip()
            
        # Format log yang rapi
        log_message = f"{ip} | {request.method} {request.path} | {response.status_code} | {duration}ms"
        
        if response.status_code >= 400:
            logger.error(log_message)
        else:
            logger.info(log_message)
            
        return response
