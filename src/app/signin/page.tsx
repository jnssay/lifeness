"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-x-4">
      <div className="flex flex-row w-full justify-center space-x-4">
        <div className="flex sm:w-24 sm:h-24 p-8 relative flex-row">
          <Image src="/google.svg" alt="Google Logo" fill />
        </div>
        <Button
          className="text-pink-600 bg-pink-200 text-xl sm:text-4xl p-8 sm:p-12 font-bold"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </Button>
      </div>
      <Link
        className="w-full flex justify-center max-w-96"
        href="/signup"
        passHref
      >
        <Button className="mt-10 p-8 w-full text-3xl font-bold text-pink-500 bg-pink-100 border border-pink-300">
          Create Account
        </Button>
      </Link>
    </div>
  );
}
