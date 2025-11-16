import connectDB from "@/lib/config/db"
import AdminModel from "@/lib/models/AdminModel"
import { NextResponse } from "next/server"
import crypto from "crypto"

// Connect to the database
const LoadDB = async () => {
    try {
        await connectDB();
    } catch (error) {
        console.error('Database connection error:', error);
    }
}
LoadDB();

// Helper function to hash password
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// GET - Show a form to create admin user
async function GET(request) {
    try {
        // Check if any admin exists
        const existingAdmin = await AdminModel.findOne();
        
        if (existingAdmin) {
            return new NextResponse(
                `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Admin - Already Exists</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            text-align: center;
        }
        h1 { color: #333; margin-bottom: 20px; font-size: 28px; }
        p { color: #666; margin-bottom: 30px; line-height: 1.6; }
        .btn {
            background: #667eea;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: background 0.3s;
        }
        .btn:hover { background: #5568d3; }
        .icon { font-size: 64px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">✅</div>
        <h1>Admin Already Exists</h1>
        <p>An admin user already exists in the system. Please use the login page to access the admin panel.</p>
        <a href="/admin/login" class="btn">Go to Login Page</a>
    </div>
</body>
</html>`,
                { headers: { 'Content-Type': 'text/html' } }
            );
        }

        return new NextResponse(
            `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Admin User</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 28px;
            text-align: center;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            text-align: center;
            font-size: 14px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            color: #333;
            margin-bottom: 8px;
            font-weight: 600;
            font-size: 14px;
        }
        input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        input:focus {
            outline: none;
            border-color: #667eea;
        }
        .btn {
            width: 100%;
            background: #667eea;
            color: white;
            padding: 14px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
            margin-top: 10px;
        }
        .btn:hover {
            background: #5568d3;
        }
        .btn:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        .message {
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: none;
        }
        .message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            display: block;
        }
        .message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            display: block;
        }
        .warning {
            background: #fff3cd;
            color: #856404;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            border: 1px solid #ffeaa7;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔐 Create Admin User</h1>
        <p class="subtitle">Create the first admin account for your Property Sheba BD admin panel</p>
        
        <div class="warning">
            ⚠️ <strong>Note:</strong> This form can only be used once when no admin exists. After creating the first admin, use the login page.
        </div>
        
        <div id="message" class="message"></div>
        
        <form id="adminForm">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required placeholder="Enter username">
            </div>
            
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="admin@propertysheba.com">
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required placeholder="Minimum 6 characters">
            </div>
            
            <button type="submit" class="btn" id="submitBtn">Create Admin</button>
        </form>
    </div>
    
    <script>
        document.getElementById('adminForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const messageDiv = document.getElementById('message');
            const formData = {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Creating...';
            messageDiv.className = 'message';
            messageDiv.style.display = 'none';
            
            try {
                const response = await fetch('/api/admin/create-admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (data.success) {
                    messageDiv.className = 'message success';
                    messageDiv.innerHTML = '✅ ' + data.message + '<br><small>Redirecting to login page in 3 seconds...</small>';
                    messageDiv.style.display = 'block';
                    
                    setTimeout(() => {
                        window.location.href = '/admin/login';
                    }, 3000);
                } else {
                    messageDiv.className = 'message error';
                    messageDiv.textContent = '❌ ' + data.message;
                    messageDiv.style.display = 'block';
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Create Admin';
                }
            } catch (error) {
                messageDiv.className = 'message error';
                messageDiv.textContent = '❌ Error: ' + error.message;
                messageDiv.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Create Admin';
            }
        });
    </script>
</body>
</html>`,
                { headers: { 'Content-Type': 'text/html' } }
            );
    } catch (error) {
        console.error('GET create-admin error:', error);
        return new NextResponse(
            `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Error</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: #f5f5f5;
            padding: 20px;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        h1 { color: #e74c3c; margin-bottom: 10px; }
        p { color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Error</h1>
        <p>Failed to load page. Please try again.</p>
    </div>
</body>
</html>`,
            { headers: { 'Content-Type': 'text/html' }, status: 500 }
        );
    }
}

// POST - Create initial admin user (only if no admin exists)
async function POST(request) {
    try {
        // Check if any admin exists
        const existingAdmin = await AdminModel.findOne();
        
        if (existingAdmin) {
            return NextResponse.json(
                { success: false, message: "Admin user already exists. Use the login page instead." },
                { status: 400 }
            );
        }

        const { username, password, email } = await request.json();

        if (!username || !password || !email) {
            return NextResponse.json(
                { success: false, message: "Username, password, and email are required" },
                { status: 400 }
            );
        }

        // Validate password strength
        if (password.length < 6) {
            return NextResponse.json(
                { success: false, message: "Password must be at least 6 characters long" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = hashPassword(password);

        // Create admin user
        const admin = await AdminModel.create({
            username,
            password: hashedPassword,
            email,
            role: "super_admin",
            isActive: true
        });

        return NextResponse.json({
            success: true,
            message: "Admin user created successfully. You can now login.",
            user: {
                username: admin.username,
                email: admin.email,
                role: admin.role
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Create admin error:', error);
        
        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, message: "Username or email already exists" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Failed to create admin user" },
            { status: 500 }
        );
    }
}

export { GET, POST };

