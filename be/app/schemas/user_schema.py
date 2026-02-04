"""User validation schemas"""
from marshmallow import Schema, fields, validate


class UserSchema(Schema):
    id = fields.String(dump_only=True)
    email = fields.Email(dump_only=True)
    username = fields.String(dump_only=True)
    full_name = fields.String(dump_only=True)
    avatar_url = fields.String(dump_only=True)
    role = fields.String(dump_only=True)
    is_verified = fields.Boolean(dump_only=True)
    is_active = fields.Boolean(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    last_login_at = fields.DateTime(dump_only=True)


class UpdateUserSchema(Schema):
    username = fields.String(validate=[
        validate.Length(min=3, max=50),
        validate.Regexp(r'^[a-zA-Z0-9_]+$')
    ])
    full_name = fields.String(validate=validate.Length(max=100))
    avatar_url = fields.URL()


class UpdateUserAdminSchema(Schema):
    username = fields.String(validate=[
        validate.Length(min=3, max=50),
        validate.Regexp(r'^[a-zA-Z0-9_]+$')
    ])
    email = fields.Email()
    full_name = fields.String(validate=validate.Length(max=100))
    role = fields.String(validate=validate.OneOf(['user', 'admin']))
    is_verified = fields.Boolean()
    is_active = fields.Boolean()


class UserListQuerySchema(Schema):
    page = fields.Integer(load_default=1, validate=validate.Range(min=1))
    per_page = fields.Integer(load_default=20, validate=validate.Range(min=1, max=100))
    search = fields.String(validate=validate.Length(max=100))
    role = fields.String(validate=validate.OneOf(['user', 'admin']))
    is_verified = fields.Boolean()
    is_active = fields.Boolean()
    sort_by = fields.String(load_default='created_at', validate=validate.OneOf(['created_at', 'username', 'email']))
    sort_order = fields.String(load_default='desc', validate=validate.OneOf(['asc', 'desc']))
