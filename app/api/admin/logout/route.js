import { NextResponse } from "next/server"

// POST - Admin logout
async function POST(request) {
    const response = NextResponse.json({
        success: true,
        message: "Logged out successfully"
    });

    // Clear the admin token cookie
    response.cookies.set('admin-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0
    });

    return response;
}

export { POST };

