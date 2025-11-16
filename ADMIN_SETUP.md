# Admin Panel Setup Guide

## Overview
The admin panel is now secured with authentication. All admin routes and data management API routes are protected.

## First Time Setup

### Creating the First Admin User

You need to create the first admin user before you can log in. Use one of the following methods:

#### Method 1: Using API Endpoint (Recommended)

Make a POST request to `/api/admin/create-admin` with the following payload:

```json
{
  "username": "admin",
  "password": "your_secure_password",
  "email": "admin@propertysheba.com"
}
```

**Example using curl:**
```bash
curl -X POST http://localhost:3000/api/admin/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "securePassword123",
    "email": "admin@propertysheba.com"
  }'
```

**Note:** This endpoint can only be used once - when no admin users exist in the database.

#### Method 2: Using MongoDB Compass or MongoDB Shell

1. Connect to your MongoDB database
2. Insert a document into the `admins` collection:

```javascript
// Password hash for "admin123" (you should use a different password)
// Use this tool to hash your password: https://www.sha256online.com/
db.admins.insertOne({
  username: "admin",
  password: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", // SHA256 hash of your password
  email: "admin@propertysheba.com",
  role: "super_admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## Security Features

### Protected Routes

1. **Admin Pages** (`/admin/*`):
   - All admin pages except `/admin/login` require authentication
   - Unauthenticated users are redirected to login page

2. **API Routes**:
   - All POST, PUT, DELETE, PATCH operations on data management APIs require authentication
   - GET requests are still public (for displaying data on frontend)

### Authentication Flow

1. User logs in at `/admin/login`
2. On successful login, a secure cookie (`admin-token`) is set
3. Token contains username, email, role, and expiry (24 hours)
4. Token is validated on every protected route access
5. Token expiry is checked - expired tokens redirect to login

### Logout

- Click the "Logout" button in the sidebar
- Cookie is cleared and user is redirected to login page

## Password Security

- Passwords are hashed using SHA-256 before storage
- Never store plain text passwords
- Minimum password length: 6 characters
- Use strong, unique passwords for production

## Token Details

- **Type:** Base64-encoded JSON
- **Expiry:** 24 hours
- **Cookie Settings:**
  - `httpOnly: true` (prevents JavaScript access)
  - `secure: true` (HTTPS only in production)
  - `sameSite: 'lax'` (CSRF protection)

## Troubleshooting

### Can't log in?

1. Verify the admin user exists in the database
2. Check that the password hash matches
3. Ensure the user's `isActive` field is `true`
4. Check browser console for errors

### Getting "Unauthorized" errors?

1. Clear your browser cookies
2. Try logging in again
3. Check if token has expired (24-hour limit)

### Need to reset admin access?

1. Manually update the admin user in MongoDB
2. Set `isActive: true`
3. Update password hash if needed

## Production Recommendations

1. **Change default credentials** immediately after setup
2. **Use strong passwords** (minimum 12 characters, mix of letters, numbers, symbols)
3. **Enable HTTPS** for secure cookie transmission
4. **Monitor failed login attempts** (consider adding rate limiting)
5. **Regular security audits** of admin accounts
6. **Backup admin credentials** securely

## API Endpoints

- `POST /api/admin/login` - Login and get token
- `GET /api/admin/login` - Check authentication status
- `POST /api/admin/logout` - Logout and clear token
- `POST /api/admin/create-admin` - Create first admin (one-time use)

