"""Standardized JSON response utilities"""
from flask import jsonify


def success_response(data=None, message="Success", status_code=200, meta=None):
    response = {
        'success': True,
        'message': message,
        'data': data
    }
    
    if meta:
        response['meta'] = meta
    
    return jsonify(response), status_code


def error_response(message="Error", errors=None, status_code=400, data=None):
    response = {
        'success': False,
        'message': message,
        'errors': errors or []
    }
    
    if data is not None:
        response['data'] = data
    
    return jsonify(response), status_code


def paginated_response(data, total, page, per_page, message="Success"):
    total_pages = (total + per_page - 1) // per_page if per_page > 0 else 0
    
    meta = {
        'pagination': {
            'total': total,
            'page': page,
            'per_page': per_page,
            'total_pages': total_pages,
            'has_next': page < total_pages,
            'has_prev': page > 1
        }
    }
    
    return success_response(data=data, message=message, meta=meta)
