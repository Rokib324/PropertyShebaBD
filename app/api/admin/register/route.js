import connectDB from "@/lib/config/db";
import AdminModel from "@/lib/models/AdminModel";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Helper function to get admin from token
const getAdminFromToken = (request) => {
    try {
        const token = request.cookies.get('admin-token')?.value;
        if (!token) return null;
        
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
        if (Date.now() > decoded.expiry) return null;
        
        return decoded;
    } catch {
        return null;
    }
};

/**
 * POST /api/admin/register
 * Register a new admin user
 * - First admin automatically becomes super_admin
 * - Subsequent admins can only be created by super_admin
 */
async function POST(request) {
    try {
        await connectDB();

        const { username, password, email, role } = await request.json();

        // Validate required fields
        if (!username || !password || !email) {
            return NextResponse.json(
                { success: false, message: "Username, password, and email are required" },
                { status: 400 }
            );
        }

        // Trim and normalize inputs
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPassword = password.trim();
        const requestedRole = role?.trim().toLowerCase() || 'admin';

        // Validate empty fields
        if (!trimmedUsername || !trimmedPassword || !trimmedEmail) {
            return NextResponse.json(
                { success: false, message: "Username, password, and email cannot be empty" },
                { status: 400 }
            );
        }

        // Validate email format
        const isValidEmail = /\S+@\S+\.\S+/.test(trimmedEmail);
        if (!isValidEmail) {
            return NextResponse.json(
                { success: false, message: "Invalid email format" },
                { status: 400 }
            );
        }

        // Validate password strength
        if (trimmedPassword.length < 6) {
            return NextResponse.json(
                { success: false, message: "Password must be at least 6 characters long" },
                { status: 400 }
            );
        }

        // Validate role
        if (!['admin', 'super_admin'].includes(requestedRole)) {
            return NextResponse.json(
                { success: false, message: "Invalid role. Must be 'admin' or 'super_admin'" },
                { status: 400 }
            );
        }

        // Check if this is the first admin
        const adminCount = await AdminModel.countDocuments();
        const isFirstAdmin = adminCount === 0;

        // Authorization check
        if (!isFirstAdmin) {
            const currentAdmin = getAdminFromToken(request);
            
            if (!currentAdmin) {
                return NextResponse.json(
                    { success: false, message: "Authentication required. Only super_admin can create new admins." },
                    { status: 401 }
                );
            }

            if (currentAdmin.role !== 'super_admin') {
                return NextResponse.json(
                    { success: false, message: "Unauthorized. Only super_admin can create new admins." },
                    { status: 403 }
                );
            }

            // Prevent creating another super_admin
            if (requestedRole === 'super_admin') {
                return NextResponse.json(
                    { success: false, message: "Cannot create another super_admin. Only one super_admin allowed." },
                    { status: 403 }
                );
            }
        }

        // Check for duplicate username or email
        const existingUser = await AdminModel.findOne({
            $or: [
                { username: { $regex: new RegExp(`^${trimmedUsername}$`, 'i') } },
                { email: trimmedEmail }
            ]
        });

        if (existingUser) {
            return NextResponse.json(
                { success: false, message: "Username or email already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(trimmedPassword);

        // Determine final role: first admin = super_admin, others = admin
        const finalRole = isFirstAdmin ? 'super_admin' : requestedRole;

        // Create admin
        const admin = await AdminModel.create({
            username: trimmedUsername,
            password: hashedPassword,
            email: trimmedEmail,
            role: finalRole,
            isActive: true
        });

        console.log(`✅ Admin registered: ${admin.username} (${admin.email}) as ${admin.role}`);

        return NextResponse.json({
            success: true,
            message: `Admin registered successfully as ${admin.role}`,
            user: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role,
                isActive: admin.isActive
            }
        }, { status: 201 });

    } catch (error) {
        console.error('❌ Register admin error:', error);
        
        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, message: "Username or email already exists" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}

/**
 * GET /api/admin/register
 * Get all admins (super_admin only)
 */
async function GET(request) {
    try {
        await connectDB();

        const currentAdmin = getAdminFromToken(request);
        
        if (!currentAdmin) {
            return NextResponse.json(
                { success: false, message: "Authentication required" },
                { status: 401 }
            );
        }

        if (currentAdmin.role !== 'super_admin') {
            return NextResponse.json(
                { success: false, message: "Unauthorized. Only super_admin can view all admins." },
                { status: 403 }
            );
        }

        const admins = await AdminModel.find({}, { password: 0 }).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            count: admins.length,
            admins: admins
        });

    } catch (error) {
        console.error('❌ Get admins error:', error);
        return NextResponse.json(
            { success: false, message: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}

export { POST, GET };

