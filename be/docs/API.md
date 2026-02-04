# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Response Format

```json
{
  "success": true,
  "message": "Success message",
  "data": { ... },
  "meta": { ... }
}
```

---

## Authentication

### Register

```
POST /auth/register
```

**Body:**

```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "Password123!",
  "full_name": "Full Name"
}
```

**Response:** `201 Created` - User object

---

### Login

```
POST /auth/login
```

**Body:**

```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Response:**

```json
{
  "user": { ... },
  "access_token": "eyJhbG...",
  "refresh_token": "eyJhbG...",
  "token_type": "Bearer"
}
```

---

### Refresh Token

```
POST /auth/refresh
```

**Headers:** `Authorization: Bearer <refresh_token>`

**Response:**

```json
{
  "access_token": "eyJhbG...",
  "token_type": "Bearer"
}
```

---

### Logout

```
POST /auth/logout
```

**Headers:** `Authorization: Bearer <access_token>`

---

### Verify Email

```
GET /auth/verify/<token>
```

---

### Resend Verification

```
POST /auth/resend-verification
```

**Body:**

```json
{
  "email": "user@example.com"
}
```

---

### Forgot Password

```
POST /auth/forgot-password
```

**Body:**

```json
{
  "email": "user@example.com"
}
```

---

### Reset Password

```
POST /auth/reset-password
```

**Body:**

```json
{
  "token": "reset_token",
  "password": "NewPassword123!"
}
```

---

### Change Password

```
POST /auth/change-password
```

**Headers:** `Authorization: Bearer <access_token>`

**Body:**

```json
{
  "current_password": "OldPassword123!",
  "new_password": "NewPassword123!"
}
```

---

## Users

### Get Current User

```
GET /users/me
```

**Headers:** `Authorization: Bearer <access_token>`

---

### Update Current User

```
PUT /users/me
```

**Headers:** `Authorization: Bearer <access_token>`

**Body:**

```json
{
  "username": "new_username",
  "full_name": "New Name",
  "avatar_url": "https://..."
}
```

---

### List Users (Admin)

```
GET /users?page=1&per_page=20&search=&role=&sort_by=created_at&sort_order=desc
```

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | int | 1 | Page number |
| per_page | int | 20 | Items per page (max 100) |
| search | string | - | Search email/username |
| role | string | - | Filter: `user` / `admin` |
| is_verified | bool | - | Filter verified status |
| is_active | bool | - | Filter active status |
| sort_by | string | created_at | Sort field |
| sort_order | string | desc | `asc` / `desc` |

---

### Get User by ID (Admin)

```
GET /users/<user_id>
```

**Headers:** `Authorization: Bearer <admin_token>`

---

### Update User (Admin)

```
PUT /users/<user_id>
```

**Headers:** `Authorization: Bearer <admin_token>`

**Body:**

```json
{
  "username": "new_username",
  "email": "new@email.com",
  "role": "admin",
  "is_verified": true,
  "is_active": true
}
```

---

### Delete User (Admin)

```
DELETE /users/<user_id>
```

**Headers:** `Authorization: Bearer <admin_token>`

---

### Deactivate User (Admin)

```
POST /users/<user_id>/deactivate
```

**Headers:** `Authorization: Bearer <admin_token>`

---

## Error Responses

| Status | Description           |
| ------ | --------------------- |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Not Found             |
| 409    | Conflict              |
| 422    | Validation Error      |
| 429    | Too Many Requests     |
| 500    | Internal Server Error |

**Error Format:**

```json
{
  "success": false,
  "message": "Error message",
  "errors": [{ "field": "email", "message": "Invalid email format" }]
}
```
