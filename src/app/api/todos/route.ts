import type { NextApiRequest} from 'next';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'
 
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export async function GET(req: NextApiRequest) {

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