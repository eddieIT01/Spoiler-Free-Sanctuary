# API Testing Examples

Use these curl commands to test the backend API. Make sure backend is running on port 4000.

## 1. Authentication

### Signup
```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
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

### Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

## 2. Users

### Get Current User Profile
```bash
curl -X GET http://localhost:4000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update User Profile
```bash
curl -X PUT http://localhost:4000/api/users/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Jane Doe"
  }'
```

### Delete User Account
```bash
curl -X DELETE http://localhost:4000/api/users/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 3. Orders

### Create Order
```bash
curl -X POST http://localhost:4000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Need help with Chapter 5",
    "details": "Stuck on the boss fight, any tips?"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": 5,
    "user_id": 1,
    "title": "Need help with Chapter 5",
    "details": "Stuck on the boss fight, any tips?",
    "created_at": "2024-01-04T10:35:00Z"
  }
}
```

### Get All Orders
```bash
curl -X GET http://localhost:4000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Specific Order
```bash
curl -X GET http://localhost:4000/api/orders/5 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Order
```bash
curl -X PUT http://localhost:4000/api/orders/5 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Updated title",
    "details": "Updated details"
  }'
```

### Delete Order
```bash
curl -X DELETE http://localhost:4000/api/orders/5 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 4. Answers

### Create Answer
```bash
curl -X POST http://localhost:4000/api/answers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "question": "How to beat the boss?",
    "answer": "Use the shield when the boss charges. Then dodge left and attack."
  }'
```

### Get All Answers
```bash
curl -X GET http://localhost:4000/api/answers \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Specific Answer
```bash
curl -X GET http://localhost:4000/api/answers/3 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Answer
```bash
curl -X PUT http://localhost:4000/api/answers/3 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "answer": "Updated answer text"
  }'
```

### Delete Answer
```bash
curl -X DELETE http://localhost:4000/api/answers/3 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 5. Admin Endpoints

Note: Must set header with admin user's token (default: user ID 1)

### Get Dashboard
```bash
curl -X GET http://localhost:4000/api/admin/dashboard \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

**Response:**
```json
{
  "success": true,
  "message": "Dashboard data retrieved successfully",
  "data": {
    "stats": {
      "total_users": 5,
      "total_orders": 12,
      "total_answers": 8
    },
    "recent_users": [...],
    "recent_orders": [...]
  }
}
```

### List All Users
```bash
curl -X GET http://localhost:4000/api/admin/users \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### Get User Details
```bash
curl -X GET http://localhost:4000/api/admin/users/2 \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### Delete User (Admin)
```bash
curl -X DELETE http://localhost:4000/api/admin/users/2 \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### List All Orders
```bash
curl -X GET http://localhost:4000/api/admin/orders \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### Delete Order (Admin)
```bash
curl -X DELETE http://localhost:4000/api/admin/orders/3 \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### List All Answers
```bash
curl -X GET http://localhost:4000/api/admin/answers \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### Delete Answer (Admin)
```bash
curl -X DELETE http://localhost:4000/api/admin/answers/2 \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

## Error Examples

### Validation Error (400)
```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "password": "short"
  }'
```

**Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "param": "email",
      "msg": "Invalid email address",
      "value": "invalid-email"
    },
    {
      "param": "password",
      "msg": "Password must be at least 6 characters",
      "value": "short"
    }
  ]
}
```

### Unauthorized (401)
```bash
curl -X GET http://localhost:4000/api/orders \
  -H "Authorization: Bearer invalid_token"
```

**Response (401):**
```json
{
  "success": false,
  "message": "Invalid token"
}
```

### Not Found (404)
```bash
curl -X GET http://localhost:4000/api/orders/999 \
  -H "Authorization: Bearer VALID_TOKEN"
```

**Response (404):**
```json
{
  "success": false,
  "message": "Order not found"
}
```

### Conflict (409)
```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "existing@example.com",
    "password": "password123"
  }'
```

**Response (409):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

## Using Postman

1. Import collection from examples below or create manually
2. Set base URL: `http://localhost:4000`
3. Create environment variable for `token`:
   - After signup/login, copy the token
   - Create variable: `token = <your_token>`
4. Use `{{token}}` in Authorization header

## JavaScript Fetch Examples

### Signup
```javascript
const response = await fetch('http://localhost:4000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe'
  })
});

const data = await response.json();
const token = data.token;
```

### Create Order
```javascript
const response = await fetch('http://localhost:4000/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My Order',
    details: 'Order details'
  })
});

const data = await response.json();
console.log(data);
```

### Get Orders
```javascript
const response = await fetch('http://localhost:4000/api/orders', {
  headers: { 'Authorization': `Bearer ${token}` }
});

const orders = await response.json();
console.log(orders.data);
```

## Tips

1. **Save your token** after signup/login
2. **Include Authorization header** for protected endpoints
3. **Check response status** (200, 201, 400, 401, 404, etc.)
4. **Use Postman** for complex testing
5. **Check backend logs** for detailed error messages
6. **Run `npm test`** for comprehensive automated testing

## Quick Test Workflow

1. **Signup:**
   ```bash
   curl -X POST http://localhost:4000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"test123","name":"Test"}'
   ```
   Copy the token from response

2. **Create Order:**
   Replace `TOKEN` with the token from step 1
   ```bash
   curl -X POST http://localhost:4000/api/orders \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer TOKEN" \
     -d '{"title":"Test Order","details":"Test details"}'
   ```

3. **View Orders:**
   ```bash
   curl http://localhost:4000/api/orders \
     -H "Authorization: Bearer TOKEN"
   ```

Done! 🎉
