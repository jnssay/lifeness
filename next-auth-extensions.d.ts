// next-auth-extensions.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession`, and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's id */
      uid: string | null;
      username?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string | null;
    username?: string | null;
  }
}

declare module "next-auth/jwt" {
  /** 
   * The shape of the JWT object in your application
   */
  interface JWT {
    uid?: string;
  }
}