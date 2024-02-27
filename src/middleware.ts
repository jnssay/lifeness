import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const session = await getToken({ req: req as any, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = req.nextUrl;

    if (session && pathname === '/') {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    if (!session && pathname === '/home') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}
