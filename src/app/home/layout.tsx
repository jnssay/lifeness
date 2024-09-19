import { ReactNode } from "react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import SignoutButton from "../components/buttons/SignoutButton";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Toaster } from "@/components/ui/toaster";
import { useSession } from "next-auth/react";

export default function HomeLayout({
  todo,
}: Readonly<{
  todo: ReactNode;
}>) {
  const items = [
    {
      header: todo,
      className:
        "row-span-10 bg-pink-100",
    },
  ];

  return (
    <>
      <main className="flex flex-col w-screen h-screen items-center px-8">
        <div className="flex flex-row w-full justify-between py-4">
          <div className="flex flex-row w-48 relative p-8">
            <Image src="/logo_notag.svg" alt="Lifeness Logo" fill />
          </div>

          <SignoutButton />
        </div>
        <BentoGrid className="grid-container w-full h-full mx-auto">
          {items.map((item, index) => (
            <BentoGridItem
              key={index}
              className={item.className}
              header={item.header}
            />
          ))}
        </BentoGrid>
      </main>
      <Toaster />
    </>
  );
}
