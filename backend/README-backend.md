# Backend (Node.js + MySQL)

This folder contains a minimal Node.js + Express backend providing:

- User authentication (signup/login) using bcrypt + JWT
- CRUD endpoints for `users` and `orders` (orders are tied to users)
- MySQL integration via `mysql2` with a connection pool

Prerequisites
- Node.js 16+ and npm
- MySQL server (local or hosted like Railway)

Quick start (local)

1. Copy `.env.example` to `.env` and set values:

```
PORT=4000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=changeme
DB_NAME=spoiler_free_sanctuary
JWT_SECRET=replace_with_secure_secret
```

2. Install dependencies and create schema:

```bash
cd backend
npm install
# run the SQL in backend/migrations/schema.sql using your MySQL client
# for example: mysql -u root -p < backend/migrations/schema.sql
```

3. Start server

```bash
npm run dev
# or
npm start
```

API endpoints (examples)

- POST `/api/auth/signup` { name?, email, password }
- POST `/api/auth/login` { email, password }
- GET `/api/users` (requires Authorization: Bearer <token>)
- GET `/api/users/:id` (requires token)
- POST `/api/orders` { title, details } (requires token)

Deployment

- Railway: create a new project, connect a MySQL plugin (or external MySQL), add environment variables, deploy from this repository's `backend/` folder.
- Set the `PORT`, `DB_*` and `JWT_SECRET` environment variables in Railway.

Security & Notes

- This is a minimal educational backend. For production, add rate limiting, CSRF protection (if needed), email verification, password reset flows, stronger secret management, and proper role-based access control.
