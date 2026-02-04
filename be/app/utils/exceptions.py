"""Custom HTTP exceptions"""


class HTTPException(Exception):
    status_code = 500
    message = "Internal Server Error"
    
    def __init__(self, message=None, errors=None, payload=None):
        super().__init__()
        self.message = message or self.message
        self.errors = errors or []
        self.payload = payload
    
    def to_dict(self):
        rv = {
            'success': False,
            'message': self.message,
            'errors': self.errors
        }
        if self.payload:
            rv['data'] = self.payload
        return rv


class BadRequestError(HTTPException):
    status_code = 400
    message = "Bad Request"


class UnauthorizedError(HTTPException):
    status_code = 401
    message = "Unauthorized"


class ForbiddenError(HTTPException):
    status_code = 403
    message = "Forbidden"


class NotFoundError(HTTPException):
    status_code = 404
    message = "Not Found"


class ConflictError(HTTPException):
    status_code = 409
    message = "Conflict"


class ValidationError(HTTPException):
    status_code = 422
    message = "Validation Error"
    
    def __init__(self, errors, message="Validation failed"):
        super().__init__(message=message, errors=errors)


class TooManyRequestsError(HTTPException):
    status_code = 429
    message = "Too Many Requests"


class InternalServerError(HTTPException):
    status_code = 500
    message = "Internal Server Error"
