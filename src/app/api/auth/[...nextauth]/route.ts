import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/lib/prisma'
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: { username: credentials.username }
                });

                if (user && user.password === credentials.password) {
                    return user;
                } else {
                    return null;
                }
            }
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

            const dbUser: { id: string } = await prisma.user.upsert({

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
                select: {
                    id: true
                }
            })
            user.id = dbUser.id;
            return true;
        },

        async jwt({ token, user, account }) {
            if (user && user.id) {
                token.id = user.id;
            }
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },

        async session({ session, token }: { session: Session, token: JWT }) {
            if (token.id) {
              session.user.id = token.id;  // token.id is string or undefined
            } else {
              console.error('UUID from token is not available');
              session.user.id = null;  // Explicitly null is acceptable if type includes | null
            }
            return session;
          },


        async redirect({ url, baseUrl }) {
            return baseUrl + '/home';
        },

    },
});

export { handler as GET, handler as POST };