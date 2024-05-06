import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export async function GET(req: NextRequest) {

    const token = await getToken({ req, secret })

    if (!token || !token.uid) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const todos = await prisma.todo.findMany({
        where: {
            userId: String(token.uid),
            complete: false,
        },
    });

    return NextResponse.json(todos)
}

export async function POST(req: NextRequest) {
    const token = await getToken({ req, secret });

    if (!token || !token.uid) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const data = await req.json();

        const newTodo = await prisma.todo.create({
            data: {
                title: data.title,
                content: data.content || null,
                due: data.due,
                complete: data.complete || false,
                userId: String(token.uid),
            },
        });

        return new NextResponse(JSON.stringify(newTodo), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Failed to create todo" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}