import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get('token');

    if (!token) {
        return new NextResponse(JSON.stringify({ message: 'Token is required' }), { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { verificationToken: token },
        });

        if (!user || (user.verificationExpires && new Date() > user.verificationExpires)) {
            return new NextResponse(JSON.stringify({ message: 'Invalid or expired token' }), { status: 404 });
            
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: true }
        });

        return new NextResponse(JSON.stringify({ message: 'Email verified successfully' }), { status: 200 });
    } catch (error) {
        console.error('Database operation failed', error);
        return new NextResponse(JSON.stringify({ message: 'Server error' }), { status: 500 });
    }
}