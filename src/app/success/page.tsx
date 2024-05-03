"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-10">
      <div className="flex relative font-bold text-3xl w-full max-w-lg h-1/5 ">
        <Image
          className="w-full"
          fill
          src="/logo_notag.svg"
          alt="Lifeness Logo"
        />
      </div>
      <div>
        <div className="text-lg sm:text-3xl md:text-3xl max-w-lg md:pt-12 text-pink-500 font-bold">
          You have successfully signed up!
        </div>
        <br />
        <div className="text-md sm:text-2xl max-w-lg md:text-xl">
          Please check your email inbox for a verification link to complete the
          registration process. The link expires in one hour.
        </div>
        <Link className="w-full flex justify-center" href="/signin" passHref>
          <Button className="mt-10 md:mt-16 w-full sm:text-2xl sm:h-16 text-pink-500 bg-pink-100 border border-pink-300">
            Back to Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}
