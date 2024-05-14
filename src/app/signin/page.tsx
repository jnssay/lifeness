"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ServerError {
  message: string;
}

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<ServerError>({ message: "" });

  const formSchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const userData = await response.json();

      if (!response.ok) {
        throw new Error(userData.error || "Failed to login");
      }

      await signIn("credentials", {
        username: values.username,
        password: values.password,
      });
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      setServerError({ message: errorMessage });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex relative font-bold text-3xl w-72 h-24">
        <Image
          className="w-full"
          fill
          src="/logo_notag.svg"
          alt="Lifeness Logo"
        />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 pt-4 max-w-72"
        >
          {serverError.message && (
            <div className="text-red-500 text-center">
              {serverError.message}
            </div>
          )}
          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="w-72">
                <FormLabel>Username</FormLabel>
                <Input
                  className="border-pink-300 bg-gradient-to-r to-pink-100 from-white bg-pink-100 input-placeholder-pink"
                  placeholder="Enter your username"
                  {...field}
                />
                {error && (
                  <div className="text-red-500 text-sm">{error.message}</div>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <Input
                    className="border-pink-300 bg-gradient-to-r to-pink-100 from-white bg-pink-100 input-placeholder-pink"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOpenIcon /> : <EyeNoneIcon />}
                  </button>
                </div>
                {error && (
                  <div className="text-red-500 text-sm">{error.message}</div>
                )}
              </FormItem>
            )}
          />

          <div className="w-full flex flex-col justify-between">
            <Button
              className="py-6 w-full text-2xl bg-pink-500 border border-pink-600 my-5"
              type="submit"
            >
              Log In
            </Button>
            <Link className="w-full flex flex-col mb-5" href="/signup" passHref>
              <Button className="my-2 text-pink-500 w-full text-lg bg-pink-100 border border-pink-300">
                Create Account
              </Button>
            </Link>
            <div className="my-2 border-radius-20 border-2 border-pink-300 flex w-full text-xl text-center justify-center font-bold text-pink-500" />
            <Link className="flex flex-row my-5" href="/signin" passHref>
              <div className="flex pr-2 relative flex-row">
                <Image
                  src="/google.svg"
                  alt="Google Logo"
                  width="50"
                  height="50"
                />
              </div>
              <Button
                onClick={() => signIn("google")}
                className="py-6 text-xl text-pink-500 w-full bg-pink-100 border border-pink-300"
              >
                Sign in with Google
              </Button>
            </Link>
            <div className="pt-2 text-xs text-justify">
              Note: With changes to Google OAuth 2.0, Google Login is no longer
              supported on embedded browsers such as Telegram Mini Apps.
              <br />
              <br />
              If you have an existing Google Account, create a new account with
              the same email to link your account information.
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
