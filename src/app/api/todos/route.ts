import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
 
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export async function GET(req: NextRequest) {

    const token = await getToken({ req, secret })

    if (!token || !token.email) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const todos = await prisma.todo.findMany({
        where: {
            userEmail: String(token.email),
        },
    });

    return NextResponse.json(todos)
}