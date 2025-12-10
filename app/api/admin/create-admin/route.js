import connectDB from "@/lib/config/db";
import AdminModel from "@/lib/models/AdminModel";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

async function POST(request) {
    try {
        await connectDB(); // Ensure DB is connected

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

        // Validate email format
        const isValidEmail = /\S+@\S+\.\S+/.test(email);
        if (!isValidEmail) {
            return NextResponse.json(
                { success: false, message: "Invalid email format" },
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

        const hashedPassword = await hashPassword(password);

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
            { success: false, message: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}

export { POST };