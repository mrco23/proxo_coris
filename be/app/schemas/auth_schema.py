"""Auth validation schemas"""
from marshmallow import Schema, fields, validate, validates, ValidationError
import re


class RegisterSchema(Schema):
    email = fields.Email(required=True)
    username = fields.String(required=True, validate=[
        validate.Length(min=3, max=50),
        validate.Regexp(r'^[a-zA-Z0-9_]+$')
    ])
    password = fields.String(required=True, validate=validate.Length(min=8), load_only=True)
    full_name = fields.String(required=True, validate=validate.Length(max=100))
    



class LoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.String(required=True, load_only=True)


class RefreshTokenSchema(Schema):
    refresh_token = fields.String(required=True)


class ForgotPasswordSchema(Schema):
    email = fields.Email(required=True)


class ResetPasswordSchema(Schema):
    token = fields.String(required=True)
    password = fields.String(required=True, validate=validate.Length(min=8), load_only=True)
    



class ChangePasswordSchema(Schema):
    current_password = fields.String(required=True, load_only=True)
    new_password = fields.String(required=True, validate=validate.Length(min=8), load_only=True)
    

