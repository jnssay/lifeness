"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SigninButton = () => {
  return (
    <Link href="/signin" className="h-full">
      <Button
        variant="ghost"
        className="transition h-full bg-pink-500 max-w-[10] w-full text-white text-2xl p-6 font-bold"
      >
        SIGN IN
      </Button>
    </Link>
  );
};

export default SigninButton;
