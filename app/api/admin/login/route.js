import connectDB from "@/lib/config/db";
import AdminModel from "@/lib/models/AdminModel";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

/**
 * POST /api/admin/login
 * Authenticate admin user and create session
 */
async function POST(request) {
    try {
        await connectDB();
        
        const { username, password } = await request.json();

        // Validate required fields
        if (!username || !password) {
            return NextResponse.json(
                { success: false, message: "Username and password are required" },
                { status: 400 }
            );
        }

        // Trim whitespace
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUsername || !trimmedPassword) {
            return NextResponse.json(
                { success: false, message: "Username and password cannot be empty" },
                { status: 400 }
            );
        }

        // Find admin by username (case-insensitive) and must be active
        const admin = await AdminModel.findOne({ 
            username: { $regex: new RegExp(`^${trimmedUsername}$`, 'i') },
            isActive: true 
        });

        if (!admin) {
            console.log(`❌ Login failed: Admin not found - "${trimmedUsername}"`);
            return NextResponse.json(
                { success: false, message: "Invalid username or password" },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(trimmedPassword, admin.password);
        
        if (!isPasswordValid) {
            console.log(`❌ Login failed: Invalid password for "${admin.username}"`);
            return NextResponse.json(
                { success: false, message: "Invalid username or password" },
                { status: 401 }
            );
        }

        console.log(`✅ Login successful: ${admin.username} (${admin.role})`);

        // Create token with expiry (24 hours)
        const tokenData = {
            id: admin._id.toString(),
            username: admin.username,
            email: admin.email,
            role: admin.role,
            expiry: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        };

        const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');

        // Create response
        const response = NextResponse.json({
            success: true,
            message: `Login successful. Welcome, ${admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}!`,
            user: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role,
                isActive: admin.isActive
            }
        });

        // Set HTTP-only cookie with token
        response.cookies.set('admin-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            path: '/'
        });

        return response;

    } catch (error) {
        console.error('❌ Login error:', error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * GET /api/admin/login
 * Check authentication status
 */
async function GET(request) {
    try {
        const token = request.cookies.get('admin-token')?.value;

        if (!token) {
            return NextResponse.json({ 
                success: false, 
                authenticated: false,
                message: "Not authenticated"
            });
        }

        try {
            const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
            
            if (Date.now() > decoded.expiry) {
                return NextResponse.json({ 
                    success: false, 
                    authenticated: false,
                    message: "Token expired"
                });
            }

            return NextResponse.json({
                success: true,
                authenticated: true,
                user: {
                    id: decoded.id,
                    username: decoded.username,
                    email: decoded.email,
                    role: decoded.role
                }
            });
        } catch {
            return NextResponse.json({ 
                success: false, 
                authenticated: false,
                message: "Invalid token"
            });
        }

    } catch (error) {
        console.error('❌ Auth check error:', error);
        return NextResponse.json({ 
            success: false, 
            authenticated: false,
            message: "Error checking authentication"
        });
    }
}

export { POST, GET };

