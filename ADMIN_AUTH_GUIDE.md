# Admin Authentication System - Complete Guide

## Overview
Comprehensive admin authentication system with role-based access control for **super_admin** and **admin** roles.

---

## API Routes

### 1. Register Admin - `POST /api/admin/register`

**Description:** Register a new admin user. First admin automatically becomes `super_admin`. Only `super_admin` can create subsequent admins.

**Authentication:** 
- ✅ No authentication required for first admin
- ✅ Requires `super_admin` role for subsequent registrations

**Request Body:**
```json
{
  "username": "admin",
  "password": "secure_password",
  "email": "admin@example.com",
  "role": "admin"  // Optional: defaults to "admin"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Admin registered successfully as admin",
  "user": {
    "id": "admin_id",
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin",
    "isActive": true
  }
}
```

**Error Responses:**
- `400` - Missing fields, invalid email, weak password, duplicate username/email
- `401` - Not authenticated (when creating subsequent admins)
- `403` - Not authorized (not super_admin) or trying to create super_admin

**Example - Create First Admin (becomes super_admin):**
```bash
curl -X POST http://localhost:3000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "superadmin",
    "password": "secure123",
    "email": "superadmin@example.com"
  }'
```

**Example - Create Admin (as super_admin):**
```bash
curl -X POST http://localhost:3000/api/admin/register \
  -H "Content-Type: application/json" \
  -H "Cookie: admin-token=your_token_here" \
  -d '{
    "username": "admin",
    "password": "secure123",
    "email": "admin@example.com",
    "role": "admin"
  }'
```

**GET /api/admin/register** - List all admins (super_admin only)
```bash
curl -X GET http://localhost:3000/api/admin/register \
  -H "Cookie: admin-token=your_token_here"
```

---

### 2. Login - `POST /api/admin/login`

**Description:** Authenticate admin user and receive a session token.

**Authentication:** Not required

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful. Welcome, Admin!",
  "user": {
    "id": "admin_id",
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin",
    "isActive": true
  }
}
```

**Error Responses:**
- `400` - Missing username or password
- `401` - Invalid credentials

**Example:**
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'
```

**GET /api/admin/login** - Check authentication status
```bash
curl -X GET http://localhost:3000/api/admin/login \
  -H "Cookie: admin-token=your_token_here"
```

**Response:**
```json
{
  "success": true,
  "authenticated": true,
  "user": {
    "id": "admin_id",
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

### 3. Logout - `POST /api/admin/logout`

**Description:** Logout current admin user and clear session token.

**Authentication:** Required (any admin role)

**Request Body:** None

**Success Response (200):**
```json
{
  "success": true,
  "message": "admin logged out successfully"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/admin/logout \
  -H "Cookie: admin-token=your_token_here"
```

---

## Role-Based Access Control

### Super Admin (`super_admin`)
- ✅ Can create new admin users
- ✅ Can view all admin users
- ✅ Full access to all admin features
- ✅ Only one super_admin allowed (first admin becomes super_admin)

### Admin (`admin`)
- ✅ Can login and access admin panel
- ❌ Cannot create other admins
- ❌ Cannot view admin list
- ✅ Full access to content management (properties, lands, etc.)

---

## Security Features

1. **Password Hashing:** bcrypt with 10 salt rounds
2. **Token-Based Authentication:** HTTP-only cookies
3. **Token Expiry:** 24 hours
4. **Case-Insensitive Username:** Login is case-insensitive
5. **Input Validation:** All inputs validated and sanitized
6. **Role-Based Middleware:** Routes protected by roles
7. **Active Status Check:** Only active admins can login

---

## Middleware Protection

The middleware protects:
- `/admin/*` routes (except `/admin/login`)
- `/api/admin/*` routes (except login, logout, register)
- Data management API routes (POST, PUT, DELETE, PATCH)

**Protected Routes Require:**
- Valid admin token in cookies
- Non-expired token
- Active admin account

**Super Admin Only Routes:**
- `GET /api/admin/register` - View all admins
- `POST /api/admin/register` - Create new admin (after first admin)

---

## Complete Usage Flow

### Step 1: Create First Admin (Super Admin)
```bash
POST /api/admin/register
{
  "username": "superadmin",
  "password": "secure123",
  "email": "super@example.com"
}
# Automatically becomes super_admin
```

### Step 2: Login as Super Admin
```bash
POST /api/admin/login
{
  "username": "superadmin",
  "password": "secure123"
}
# Returns: Cookie with admin-token
```

### Step 3: Create Regular Admin (as Super Admin)
```bash
POST /api/admin/register
Cookie: admin-token=...
{
  "username": "admin",
  "password": "secure123",
  "email": "admin@example.com",
  "role": "admin"
}
```

### Step 4: View All Admins (Super Admin Only)
```bash
GET /api/admin/register
Cookie: admin-token=...
```

### Step 5: Logout
```bash
POST /api/admin/logout
Cookie: admin-token=...
```

---

## Frontend Integration Examples

### Login (React/Next.js)
```javascript
const login = async (username, password) => {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Important for cookies
    body: JSON.stringify({ username, password })
  });
  return await response.json();
};
```

### Register Admin (as Super Admin)
```javascript
const registerAdmin = async (username, password, email, role = 'admin') => {
  const response = await fetch('/api/admin/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password, email, role })
  });
  return await response.json();
};
```

### Check Auth Status
```javascript
const checkAuth = async () => {
  const response = await fetch('/api/admin/login', {
    credentials: 'include'
  });
  return await response.json();
};
```

### Logout
```javascript
const logout = async () => {
  const response = await fetch('/api/admin/logout', {
    method: 'POST',
    credentials: 'include'
  });
  return await response.json();
};
```

---

## Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "message": "Error description"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (not authorized for this action)
- `500` - Internal Server Error

---

## Important Notes

1. **First Admin:** Automatically becomes `super_admin`
2. **Only One Super Admin:** Cannot create additional `super_admin` users
3. **Case-Insensitive:** Usernames are case-insensitive for login
4. **Email Normalization:** Emails automatically converted to lowercase
5. **Password Requirements:** Minimum 6 characters
6. **Token Storage:** HTTP-only cookies for security
7. **Token Expiry:** 24 hours
8. **Active Status:** Only active admins can login

---

## Routes Summary

| Route | Method | Auth Required | Role Required | Description |
|-------|--------|---------------|---------------|-------------|
| `/api/admin/register` | POST | First: No<br>After: Yes | First: None<br>After: super_admin | Register new admin |
| `/api/admin/register` | GET | Yes | super_admin | List all admins |
| `/api/admin/login` | POST | No | None | Login admin |
| `/api/admin/login` | GET | No | None | Check auth status |
| `/api/admin/logout` | POST | Yes | Any admin | Logout admin |

---

## Testing

### Test Registration (First Admin)
```bash
curl -X POST http://localhost:3000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123","email":"test@test.com"}'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}' \
  -c cookies.txt
```

### Test Logout
```bash
curl -X POST http://localhost:3000/api/admin/logout \
  -b cookies.txt
```

---

## Troubleshooting

**Issue: "Authentication required"**
- Make sure you're logged in (have a valid admin-token cookie)
- Check if token has expired (24 hours)

**Issue: "Only super_admin can create new admins"**
- You need to be logged in as super_admin
- First admin is automatically super_admin

**Issue: "Invalid username or password"**
- Check username spelling (case-insensitive)
- Verify password is correct
- Ensure admin account is active (`isActive: true`)

**Issue: "Username or email already exists"**
- Username and email must be unique
- Check if admin already exists in database
