import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { sendVerificationEmail } from '@/utils/verification';
import { hashPassword } from '@/utils/auth';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const hashedPassword = await hashPassword(data.password);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationExpires = new Date(Date.now() + 3600 * 1000);

        const newUser = await prisma.user.create({
            data: {
                username: data.username,
                name: data.display,
                email: data.email,
                password: hashedPassword,
                verificationToken,
                verificationExpires,
                emailVerified: false,
            },
        });

        await sendVerificationEmail(data.email, verificationToken);

        return new NextResponse(JSON.stringify({
            username: newUser.username,
            name: newUser.name,
            email: newUser.email
        }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error: unknown) {
        console.error("Full error:", error);
    
        let errorMessage = "Failed to create user";
        if (typeof error === 'object' && error !== null) {
            const prismaError = error as Prisma.PrismaClientKnownRequestError;
            if ('code' in prismaError && prismaError.code === 'P2002') {
                errorMessage = `The ${prismaError.meta?.target} is already in use.`;
            }
        } else {
            console.error("Unexpected error during user creation:", error);
        }
    
        return new NextResponse(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    
}