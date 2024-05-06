import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { checkPassword } from '@/utils/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const user = await prisma.user.findFirst({
            where: {
                username: data.username,
            },
        });

        if (!user) {
            return new NextResponse(JSON.stringify({
                error: "No account found with that username."
            }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        if (!(await checkPassword(data.password, user.password!))) {
            return new NextResponse(JSON.stringify({
                error: "Invalid password."
            }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        return new NextResponse(JSON.stringify({
            message: "Login success."
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error: unknown) {
        return new NextResponse(JSON.stringify({
            message: "Signin error:"
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
