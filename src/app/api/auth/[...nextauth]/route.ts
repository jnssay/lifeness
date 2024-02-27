import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

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
            return true;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl + '/home';
        }
    },
});

export { handler as GET, handler as POST };