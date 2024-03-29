"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div className="flex flex-row items-center justify-center h-screen space-x-4">
      <div className="flex w-12 p-8 relative flex-row">
        <Image src="/google.svg" alt="Google Logo" fill />
      </div>
      <Button
        className="text-pink-600 bg-pink-200 text-2xl p-8 font-bold"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </Button>
    </div>
  );
}
