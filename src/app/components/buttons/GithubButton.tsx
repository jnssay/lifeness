"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const GithubButton = () => {
  const redirectToGitHub = () => {
    window.location.href = "https://github.com/jnssay/lifeness";
  };

  return (
    <Button
      variant="ghost"
      className=" bg-gradient-to-b h-full from-pink-400 transition-colors max-w-[1000px] w-full text-white text-2xl p-6 font-bold"
      onClick={() => redirectToGitHub()}
    >
      GitHub
    </Button>
  );
};

export default GithubButton;
