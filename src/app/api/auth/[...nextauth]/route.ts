import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import prisma from '@/lib/prisma'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            if (!profile || !profile.email) {
                throw new Error('No profile or email found');
            }

            await prisma.user.upsert({

                where: {
                    email: profile.email,
                },
                create: {
                    email: profile.email,
                    name: profile.name || ""
                },
                update: {
                    name: profile.name || ""
                },
            })

            return true;
        },

        async redirect({ url, baseUrl }) {
            return baseUrl + '/home';
        },

    },
});

export { handler as GET, handler as POST };