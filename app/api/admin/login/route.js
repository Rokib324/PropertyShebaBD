import connectDB from "@/lib/config/db"
import AdminModel from "@/lib/models/AdminModel"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'

// POST - Admin login
async function POST(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { success: false, message: "Username and password are required" },
                { status: 400 }
            );
        }

        // Find admin by username
        const admin = await AdminModel.findOne({ username, isActive: true });

        if (!admin) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Compare the provided password with the stored bcrypt hash
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        
        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Create token with expiry (24 hours)
        const tokenData = {
            username: admin.username,
            email: admin.email,
            role: admin.role,
            expiry: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        };

        const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');

        // Create response with token in cookie
        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            user: {
                username: admin.username,
                email: admin.email,
                role: admin.role
            }
        });

        // Set cookie with token
        response.cookies.set('admin-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}

// GET - Check if user is logged in
async function GET(request) {
    try {
        const token = request.cookies.get('admin-token')?.value;

        if (!token) {
            return NextResponse.json({ success: false, authenticated: false });
        }

        try {
            const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
            
            if (Date.now() > decoded.expiry) {
                return NextResponse.json({ success: false, authenticated: false });
            }

            return NextResponse.json({
                success: true,
                authenticated: true,
                user: {
                    username: decoded.username,
                    email: decoded.email,
                    role: decoded.role
                }
            });
        } catch {
            return NextResponse.json({ success: false, authenticated: false });
        }

    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json({ success: false, authenticated: false });
    }
}

export { POST, GET };

