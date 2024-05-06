import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/lib/prisma'
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { checkPassword } from "@/utils/auth";

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

                if (user && (await checkPassword(credentials.password, user.password!))) {
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
        async signIn({ user, account, profile }) {
            if (!account) {
                console.error('Account details are not available');
                return false;
            }
            if (account.provider === "google") {
                if (!profile || !profile.email) {
                    console.error('Profile data is missing or incomplete.');
                    return false;
                }
                const email = profile.email;
                const dbUser = await prisma.user.findFirst({
                    where: {
                        email: email,
                        authType: 'GOOGLE'
                    }
                });
                if (dbUser) {
                    const updatedUser = await prisma.user.update({
                        where: {
                            id: dbUser.id
                        },
                        data: {
                            name: profile.name || "",
                        },
                        select: { id: true }
                    });
                    user.id = dbUser.id
                } else {
                    const newUser = await prisma.user.create({
                        data: {
                            email: email,
                            name: profile.name || "",
                            authType: 'GOOGLE',
                        },
                        select: { id: true }
                    });
                    user.id = newUser.id
                }
            } 
    
            else if (account.provider === "credentials") {
                if (!user || !user.username) {
                    console.error('User details are missing after credentials authorization.');
                    return false;
                }
                const dbUser = await prisma.user.findUnique({
                    where: { username: user.username },
                    select: { id: true }
                });
                user.id = dbUser?.id || null;
            }
            
            return true;
        },

        async jwt({ token, user, account }) {
            if (user?.id) {
                token.uid = user.id;
            }
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }
            return token;
        },

        async session({ session, token }: { session: Session, token: JWT }) {
            if (token.uid) {
              session.user.uid = token.uid; 
            } else {
              console.error('UUID from token is not available');
              console.log("********token", token)
              session.user.uid = null; 
            }
            return session;
          },


        async redirect({ url, baseUrl }) {
            return baseUrl + '/home';
        },

    },
});

export { handler as GET, handler as POST };