"""Auth routes - Authentication endpoints"""
from flask import Blueprint
from app.api.controllers import auth_controller
from app.config.extensions import limiter

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# Rate limit untuk auth endpoints
auth_limit = limiter.limit("10/minute;100/hour")


@auth_bp.route('/register', methods=['POST'])
@auth_limit
def register():
    return auth_controller.register()


@auth_bp.route('/login', methods=['POST'])
@auth_limit
def login():
    return auth_controller.login()


@auth_bp.route('/refresh', methods=['POST'])
def refresh():
    return auth_controller.refresh()


@auth_bp.route('/logout', methods=['POST'])
def logout():
    return auth_controller.logout()


@auth_bp.route('/verify/<token>', methods=['GET'])
def verify_email(token):
    return auth_controller.verify_email(token)


@auth_bp.route('/resend-verification', methods=['POST'])
@auth_limit
def resend_verification():
    return auth_controller.resend_verification()


@auth_bp.route('/forgot-password', methods=['POST'])
@auth_limit
def forgot_password():
    return auth_controller.forgot_password()


@auth_bp.route('/reset-password', methods=['POST'])
@auth_limit
def reset_password():
    return auth_controller.reset_password()


@auth_bp.route('/change-password', methods=['POST'])
def change_password():
    return auth_controller.change_password()
