# Proxo Coris - Backend

Flask REST API backend with JWT authentication, PostgreSQL database, and user management.

## Tech Stack

- **Flask** - Web framework
- **PostgreSQL** - Database
- **SQLAlchemy** - ORM
- **Flask-JWT-Extended** - JWT authentication
- **Flask-Migrate** - Database migrations
- **Flask-Limiter** - Rate limiting
- **Flask-Mail** - Email service
- **Cloudinary** - Image uploads
- **Marshmallow** - Schema validation

## Project Structure

```
be/
├── app/
│   ├── __init__.py          # Application factory
│   ├── api/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # Blueprint routes
│   │   └── services/        # Business logic
│   ├── config/
│   │   ├── environment.py   # Config classes
│   │   └── extensions.py    # Flask extensions
│   ├── database/
│   │   └── models/          # SQLAlchemy models
│   ├── lib/
│   │   ├── mailer.py        # Email service
│   │   └── cloudinary.py    # Image uploads
│   ├── middlewares/
│   │   └── auth_middleware.py
│   ├── schemas/             # Marshmallow schemas
│   └── utils/
│       ├── exceptions.py
│       ├── response.py
│       ├── password.py
│       └── logger.py
├── docs/
│   └── API.md               # API documentation
├── scripts/
│   └── db/
│       ├── seed.py          # Database seeding
│       └── create_admin.py  # Create admin user
├── tests/
│   ├── conftest.py
│   ├── auth/
│   └── user/
├── server.py                # Entry point
├── requirements.txt
├── .env.example
└── README.md
```

## Setup

### 1. Create Virtual Environment

```bash
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
# or
.venv\Scripts\activate     # Windows
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` dengan konfigurasi yang sesuai:

```env
FLASK_ENV=development
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://postgres:password@localhost:5432/proxo_coris
JWT_SECRET_KEY=your-jwt-secret
```

### 4. Setup Database

```bash
# Initialize migrations (first time only)
flask db init

# Create migration
flask db migrate -m "Initial migration"

# Apply migration
flask db upgrade
```

### 5. Run Server

```bash
python server.py
```

Server akan berjalan di `http://localhost:5000`

## Environment Variables

| Variable                | Description                       | Default                 |
| ----------------------- | --------------------------------- | ----------------------- |
| `FLASK_ENV`             | Environment mode                  | `development`           |
| `SECRET_KEY`            | Flask secret key                  | -                       |
| `DATABASE_URL`          | PostgreSQL connection URL         | -                       |
| `JWT_SECRET_KEY`        | JWT signing key                   | -                       |
| `CORS_ORIGINS`          | Allowed origins (comma separated) | `http://localhost:5173` |
| `MAIL_SERVER`           | SMTP server                       | `smtp.gmail.com`        |
| `MAIL_PORT`             | SMTP port                         | `587`                   |
| `MAIL_USERNAME`         | SMTP username                     | -                       |
| `MAIL_PASSWORD`         | SMTP password                     | -                       |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name             | -                       |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                | -                       |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret             | -                       |

## API Documentation

Lihat dokumentasi lengkap di [docs/API.md](docs/API.md)

### Quick Reference

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/api/auth/register` | Register user      |
| POST   | `/api/auth/login`    | Login              |
| POST   | `/api/auth/refresh`  | Refresh token      |
| POST   | `/api/auth/logout`   | Logout             |
| GET    | `/api/users/me`      | Get profile        |
| PUT    | `/api/users/me`      | Update profile     |
| GET    | `/api/users`         | List users (admin) |

## Scripts

### Seed Database

```bash
python -m scripts.db.seed
```

Membuat sample users:

- admin@example.com (Admin)
- user@example.com (User)
- unverified@example.com (Unverified User)

Password: lihat di `scripts/db/seed.py`

### Create Admin

```bash
python -m scripts.db.create_admin
```

Interactive script untuk membuat admin user baru.

## Testing

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/auth/test_auth.py -v
```
