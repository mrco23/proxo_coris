"""Auth controller - Request handlers for auth endpoints"""
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError

from app.api.services.auth_service import AuthService
from app.schemas.auth_schema import (
    RegisterSchema, LoginSchema, ForgotPasswordSchema,
    ResetPasswordSchema, ChangePasswordSchema
)
from app.middlewares.auth_middleware import jwt_required_custom
from app.utils.response import success_response, error_response
from app.lib.mailer import send_verification_email, send_password_reset_email


def register():
    try:
        data = RegisterSchema().load(request.get_json() or {})
    except ValidationError as err:
        return error_response(
            message="Validation failed",
            errors=[{"field": k, "message": v[0]} for k, v in err.messages.items()],
            status_code=422
        )
    
    user = AuthService.register(
        email=data['email'],
        username=data['username'],
        password=data['password'],
        full_name=data.get('full_name')
    )
    
    try:
        send_verification_email(user.email, user.verification_token)
    except Exception:
        pass
    
    return success_response(
        data=user.to_dict(),
        message="Registration successful. Please check your email to verify your account.",
        status_code=201
    )


def login():
    try:
        data = LoginSchema().load(request.get_json() or {})
    except ValidationError as err:
        return error_response(
            message="Validation failed",
            errors=[{"field": k, "message": v[0]} for k, v in err.messages.items()],
            status_code=422
        )
    
    user, access_token, refresh_token = AuthService.login(
        email=data['email'],
        password=data['password']
    )
    
    return success_response(
        data={
            'user': user.to_dict(),
            'access_token': access_token,
            'refresh_token': refresh_token,
            'token_type': 'Bearer'
        },
        message="Login successful"
    )


@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    access_token = AuthService.refresh_token(user_id)
    
    return success_response(
        data={'access_token': access_token, 'token_type': 'Bearer'},
        message="Token refreshed successfully"
    )


@jwt_required_custom
def logout():
    return success_response(message="Logout successful")


def verify_email(token):
    user = AuthService.verify_email(token)
    return success_response(data=user.to_dict(), message="Email verified successfully")


def resend_verification():
    try:
        data = ForgotPasswordSchema().load(request.get_json() or {})
    except ValidationError as err:
        return error_response(
            message="Validation failed",
            errors=[{"field": k, "message": v[0]} for k, v in err.messages.items()],
            status_code=422
        )
    
    user = AuthService.resend_verification(data['email'])
    
    try:
        send_verification_email(user.email, user.verification_token)
    except Exception:
        pass
    
    return success_response(message="Verification email sent")


def forgot_password():
    try:
        data = ForgotPasswordSchema().load(request.get_json() or {})
    except ValidationError as err:
        return error_response(
            message="Validation failed",
            errors=[{"field": k, "message": v[0]} for k, v in err.messages.items()],
            status_code=422
        )
    
    user = AuthService.forgot_password(data['email'])
    
    if user:
        try:
            send_password_reset_email(user.email, user.reset_token)
        except Exception:
            pass
    
    return success_response(
        message="If an account exists with that email, a password reset link has been sent"
    )


def reset_password():
    try:
        data = ResetPasswordSchema().load(request.get_json() or {})
    except ValidationError as err:
        return error_response(
            message="Validation failed",
            errors=[{"field": k, "message": v[0]} for k, v in err.messages.items()],
            status_code=422
        )
    
    AuthService.reset_password(token=data['token'], new_password=data['password'])
    return success_response(message="Password reset successful")


@jwt_required_custom
def change_password():
    try:
        data = ChangePasswordSchema().load(request.get_json() or {})
    except ValidationError as err:
        return error_response(
            message="Validation failed",
            errors=[{"field": k, "message": v[0]} for k, v in err.messages.items()],
            status_code=422
        )
    
    AuthService.change_password(
        user=request.current_user,
        current_password=data['current_password'],
        new_password=data['new_password']
    )
    
    return success_response(message="Password changed successfully")
