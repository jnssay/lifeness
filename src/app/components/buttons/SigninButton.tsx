"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "../../../components/ui/button";

const SigninButton = () => {
  return (
    <Button
      variant="ghost"
      className="transition h-full bg-gradient-to-b from-pink-600 max-w-[1000px] w-full text-white text-2xl p-6 font-bold"
      onClick={() => signIn()}
    >
      SIGN IN
    </Button>
  );
};

export default SigninButton;
