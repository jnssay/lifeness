import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Providers from "./components/Providers";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lifeness",
  description: "Nessa, get your shit together :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Providers>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
