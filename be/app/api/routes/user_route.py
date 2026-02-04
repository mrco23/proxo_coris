"""User routes - User management endpoints"""
from flask import Blueprint
from app.api.controllers import user_controller

user_bp = Blueprint('users', __name__, url_prefix='/api/users')


@user_bp.route('/me', methods=['GET'])
def get_me():
    return user_controller.get_me()


@user_bp.route('/me', methods=['PUT', 'PATCH'])
def update_me():
    return user_controller.update_me()


@user_bp.route('', methods=['GET'])
def get_users():
    return user_controller.get_users()


@user_bp.route('/<user_id>', methods=['GET'])
def get_user(user_id):
    return user_controller.get_user(user_id)


@user_bp.route('/<user_id>', methods=['PUT', 'PATCH'])
def update_user(user_id):
    return user_controller.update_user(user_id)


@user_bp.route('/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    return user_controller.delete_user(user_id)


@user_bp.route('/<user_id>/deactivate', methods=['POST'])
def deactivate_user(user_id):
    return user_controller.deactivate_user(user_id)
