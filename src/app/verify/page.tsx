"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function VerifyEmailContent() {
  const [status, setStatus] = useState("verifying");
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;
    if (token) {
      verifyEmail(token);
    }
  }, [searchParams]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`/api/verify?token=${token}`);
      if (response.ok) {
        setStatus("verified");
      } else {
        const result = await response.json();
        if (result.message.includes("expired")) {
          setStatus("expired");
        } else {
          console.error("Email verification failed");
        }
      }
    } catch (error) {
      console.error("Error verifying email:", error);
    }
  };

  if (status === "verified") {
    return <VerifiedMessage />;
  } else if (status === "expired") {
    return <ExpiredMessage />;
  }
  return null;
}

function VerifiedMessage() {
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
          Success!
        </div>
        <br />
        <div className="text-md sm:text-2xl max-w-lg md:text-xl">
          Your email is successfully verified! You may now log into Lifeness.
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

function ExpiredMessage() {
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
          Invalid Link!
        </div>
        <br />
        <div className="text-md sm:text-2xl max-w-lg md:text-xl">
          The verification link is invalid or expired.
        </div>
        <Link className="w-full flex justify-center" href="/" passHref>
          <Button className="mt-10 md:mt-16 w-full sm:text-2xl sm:h-16 text-pink-500 bg-pink-100 border border-pink-300">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
