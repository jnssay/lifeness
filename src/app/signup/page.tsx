"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";

interface ServerError {
  message: string;
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<ServerError>({ message: "" });

  const formSchema = z
    .object({
      username: z
        .string()
        .min(4, { message: "Username must be at least 4 characters." })
        .max(20, { message: "Username must be less than 20 characters." }),
      display: z
        .string()
        .min(4, { message: "Display name must be at least 4 characters." })
        .max(20, { message: "Display name must be less than 20 characters." }),
      email: z.string().email({ message: "Invalid email address." }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
      confirmPassword: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const userData = await response.json();

      if (!response.ok) {
        throw new Error(userData.error || "Failed to create user");
      }
      setServerError({ message: "" });
      window.location.href = `/success`;
    } catch (error) {
      console.error("Error creating user:", error);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
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
            name="display"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="w-72">
                <FormLabel>Display Name</FormLabel>
                <Input
                  className="border-pink-300 bg-gradient-to-r to-pink-100 from-white bg-pink-100 input-placeholder-pink"
                  placeholder="Enter your name"
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
            name="email"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input
                  className="border-pink-300 bg-gradient-to-r to-pink-100 from-white bg-pink-100 input-placeholder-pink"
                  placeholder="Enter your email"
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <div className="relative">
                  <Input
                    className="border-pink-300 bg-gradient-to-r to-pink-100 from-white input-placeholder-pink"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
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
              className="w-full bg-pink-500 border border-pink-600 my-5"
              type="submit"
            >
              Submit
            </Button>
            <Link href="/signin" passHref>
              <Button className="text-pink-500 w-full bg-pink-100 border border-pink-300">
                Go Back
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
