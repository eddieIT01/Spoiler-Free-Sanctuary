# Spoiler-Free Sanctuary Backend API

A robust Node.js Express backend providing authentication, CRUD operations, and admin panel functionality for managing game guides and user data.

## Features

✅ **User Authentication**
- Signup and login with bcrypt password hashing
- JWT token-based authentication
- Secure password validation

✅ **CRUD Operations**
- Complete REST API for Users, Orders, and Answers
- Input validation and error handling
- Cascading deletes for data integrity

✅ **Database**
- MySQL with connection pooling
- Proper foreign key relationships
- Migration scripts included

✅ **Admin Panel**
- Dashboard with statistics
- User management and monitoring
- Order and answer management
- Admin-only endpoints with authorization

✅ **Error Handling**
- Comprehensive validation using express-validator
- Consistent error response format
- Detailed error logging

## Prerequisites

- **Node.js** 16+ and npm
- **MySQL** 5.7+ (local or hosted)
- Basic understanding of REST APIs

## Installation & Setup

### 1. Clone or Extract Project
```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

**Example `.env` file:**
```
PORT=4000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=spoiler_free_sanctuary
JWT_SECRET=your_super_secret_key_change_in_production
ADMIN_USER_ID=1
CORS_ORIGIN=http://localhost:5173
```

### 3. Create Database & Tables

Run the migration script to set up the database schema:

```bash
# Using MySQL client
mysql -u root -p < migrations/schema.sql

# Or copy-paste the contents of migrations/schema.sql in your MySQL GUI
```

This creates:
- `spoiler_free_sanctuary` database
- `users` table
- `orders` table (related to users)
- `answers` table (related to users)

### 4. Start the Server

**Development mode (with hot reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server runs on `http://localhost:4000` (or your configured PORT)

## API Documentation

### Base URL
```
http://localhost:4000/api
```

### Authentication Endpoints

#### POST `/auth/signup`
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST `/auth/login`
Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### User Endpoints

All user endpoints require authentication via `Authorization: Bearer <token>` header.

#### GET `/users/profile`
Get current user's profile.

**Response (200):**
```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "created_at": "2024-01-04T10:30:00Z"
  }
}
```

#### GET `/users/:id`
Get user profile by ID (must be own ID).

#### PUT `/users/:id`
Update user profile (name).

**Request:**
```json
{
  "name": "Jane Doe"
}
```

#### DELETE `/users/:id`
Delete user account (requires own ID).

### Orders Endpoints

All order endpoints require authentication.

#### POST `/orders`
Create a new order.

**Request:**
```json
{
  "title": "Game Guide Request",
  "details": "Need help with chapter 3"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": 5,
    "user_id": 1,
    "title": "Game Guide Request",
    "details": "Need help with chapter 3",
    "created_at": "2024-01-04T10:35:00Z"
  }
}
```

#### GET `/orders`
Get all orders for current user.

#### GET `/orders/:id`
Get specific order by ID.

#### PUT `/orders/:id`
Update order (title and/or details).

#### DELETE `/orders/:id`
Delete order.

### Answers Endpoints

All answer endpoints require authentication.

#### POST `/answers`
Create a new answer/response.

**Request:**
```json
{
  "question": "How to beat boss?",
  "answer": "Use the shield when..."
}
```

#### GET `/answers`
Get all answers for current user.

#### GET `/answers/:id`
Get specific answer by ID.

#### PUT `/answers/:id`
Update answer.

#### DELETE `/answers/:id`
Delete answer.

### Admin Endpoints

Admin-only endpoints. Set `ADMIN_USER_ID` in `.env` (default: 1).

All require `Authorization: Bearer <admin_token>` header.

#### GET `/admin/dashboard`
Get dashboard statistics.

**Response:**
```json
{
  "success": true,
  "message": "Dashboard data retrieved successfully",
  "data": {
    "stats": {
      "total_users": 15,
      "total_orders": 42,
      "total_answers": 28
    },
    "recent_users": [...],
    "recent_orders": [...]
  }
}
```

#### GET `/admin/users`
List all users.

#### GET `/admin/users/:id`
Get user details with all their orders and answers.

#### DELETE `/admin/users/:id`
Delete user and related data.

#### GET `/admin/orders`
List all orders.

#### DELETE `/admin/orders/:id`
Delete order.

#### GET `/admin/answers`
List all answers.

#### DELETE `/admin/answers/:id`
Delete answer.

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Answers Table
```sql
CREATE TABLE answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  question VARCHAR(255),
  answer TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "param": "email",
      "msg": "Invalid email address",
      "value": "invalid-email"
    }
  ]
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (no admin access)
- `404` - Not Found
- `409` - Conflict (email already exists)
- `500` - Server Error

## Development

### Running Tests
```bash
node scripts/test_api.js
```

### Project Structure
```
backend/
├── src/
│   ├── index.js                 # Main app entry
│   ├── db.js                    # Database pool
│   ├── middleware/
│   │   └── auth.js              # JWT auth middleware
│   └── routes/
│       ├── auth.js              # Auth endpoints
│       ├── users.js             # User CRUD
│       ├── orders.js            # Orders CRUD
│       ├── answers.js           # Answers CRUD
│       └── admin.js             # Admin panel
├── migrations/
│   └── schema.sql               # Database schema
├── scripts/
│   ├── run_migrations.js        # Migration runner
│   └── test_api.js              # API testing
├── .env.example                 # Environment template
├── package.json
└── README-backend.md
```

## Deployment

### Railway
1. Push code to GitHub
2. Connect GitHub repo to Railway
3. Add environment variables in Railway dashboard
4. Deploy automatically on push

### Render
1. Create new PostgreSQL database
2. Connect GitHub repo
3. Set environment variables
4. Deploy

### Local VPS (Ubuntu)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL
sudo apt-get install -y mysql-server

# Clone and setup
git clone <your-repo>
cd backend
npm install
cp .env.example .env
# Edit .env with production values
npm start
```

## Security Considerations

⚠️ **Before Production Deployment:**

1. **Change JWT_SECRET** - Use a strong, random secret
2. **Use HTTPS** - Enable SSL/TLS
3. **Database** - Use strong passwords, restrict access
4. **CORS** - Configure CORS_ORIGIN properly
5. **Rate Limiting** - Add rate limiting middleware
6. **Environment** - Set `NODE_ENV=production`
7. **Passwords** - Ensure bcrypt salt rounds (default: 10)

## Troubleshooting

**Can't connect to database:**
- Check MySQL is running
- Verify DB_HOST, DB_PORT, DB_USER, DB_PASSWORD in .env
- Ensure database exists

**Authentication errors:**
- Verify JWT_SECRET is set and consistent
- Check token format: `Authorization: Bearer <token>`
- Ensure token hasn't expired (7 days)

**CORS errors:**
- Update CORS_ORIGIN in .env to match frontend URL
- Check frontend is using correct API_BASE_URL

## Dependencies

- **express** - Web framework
- **mysql2** - MySQL client with promises
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT auth tokens
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

## License

MIT

## Support

For issues and questions, open a GitHub issue or contact the development team.


Deployment

- Railway: create a new project, connect a MySQL plugin (or external MySQL), add environment variables, deploy from this repository's `backend/` folder.
- Set the `PORT`, `DB_*` and `JWT_SECRET` environment variables in Railway.

Security & Notes

- This is a minimal educational backend. For production, add rate limiting, CSRF protection (if needed), email verification, password reset flows, stronger secret management, and proper role-based access control.
