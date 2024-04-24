import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const secret = process.env.NEXTAUTH_SECRET

export async function PATCH(req: NextRequest) {

    try {
        const data = await req.json();

        const updatedTodo = await prisma.todo.update({
            where: {
                id: data.id,
            },
            data: {
                complete: data.completed,
            },
        });

        return new NextResponse(JSON.stringify(updatedTodo), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error updating todo:', error);
        return new NextResponse(JSON.stringify({ error: "Failed to update todo" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}