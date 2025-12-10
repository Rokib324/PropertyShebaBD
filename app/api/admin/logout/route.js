import { NextResponse } from "next/server";

/**
 * POST /api/admin/logout
 * Logout admin user and clear session
 */
async function POST(request) {
    try {
        // Get user info from token before clearing
        let username = 'User';
        let role = null;
        
        try {
            const token = request.cookies.get('admin-token')?.value;
            if (token) {
                const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
                username = decoded.username || 'User';
                role = decoded.role || null;
            }
        } catch {
            // Ignore token parsing errors
        }

        // Create response
        const response = NextResponse.json({
            success: true,
            message: `${username} logged out successfully`
        });

        // Clear the admin token cookie
        response.cookies.set('admin-token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 0,
            path: '/'
        });

        // Also delete it explicitly
        response.cookies.delete('admin-token');

        console.log(`✅ Admin logged out: ${username} (${role || 'unknown role'})`);

        return response;
    } catch (error) {
        console.error('❌ Logout error:', error);
        
        // Even if there's an error, try to clear the cookie
        const response = NextResponse.json({
            success: true,
            message: "Logged out successfully"
        });
        
        response.cookies.delete('admin-token');
        return response;
    }
}

export { POST };

