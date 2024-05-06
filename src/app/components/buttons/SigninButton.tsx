"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SigninButton = () => {
  return (
    <Link href="/signin">
      <Button
        variant="ghost"
        className="transition h-full bg-gradient-to-b from-pink-600 max-w-[1000px] w-full text-white text-2xl p-6 font-bold"
      >
        SIGN IN
      </Button>
    </Link>
  );
};

export default SigninButton;
