"""Social Auth routes"""
from flask import Blueprint
from app.api.controllers import social_auth_controller
from app.config.extensions import limiter

social_auth_bp = Blueprint('social_auth', __name__, url_prefix='/api/auth')

auth_limit = limiter.limit("10/minute;100/hour")


@social_auth_bp.route('/google', methods=['POST'])
@auth_limit
def google_auth():
    return social_auth_controller.google_auth()