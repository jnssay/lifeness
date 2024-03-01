"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "../../../components/ui/button";

//TODO: change old signin button

const SigninButton = () => {

    const { data: session } = useSession();

    if (session && session.user) {

        console.log(session.user)

        return (
            <div className="items-center flex flex-row pt-1">
                <p
                    style={{ fontWeight: "bold", fontSize: "20px" }}
                    className="text-pink-600 pr-2"
                >
                    Logged in: {session.user.name}
                </p>
                <Button onClick={() => signOut()} variant="ghost" size="icon">
                    <ExitIcon className="h-8 w-8 text-pink-800" />
                </Button>
            </div>
        );
    }
    return (
        <p
            style={{ fontWeight: "bold", fontSize: "20px" }}
            className="text-pink-600 pr-2"
        >
            Loading...
        </p>
    );
};

export default SigninButton;
