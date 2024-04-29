import { ReactNode } from "react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import SignoutButton from "../components/buttons/SignoutButton";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Toaster } from "@/components/ui/toaster";
import { useSession } from "next-auth/react";

export default function HomeLayout({
  children,
  todo,
  event,
  calendar,
  habit,
  note,
  budget,
  food,
  water,
  pet,
}: Readonly<{
  children: ReactNode;
  todo: ReactNode;
  event: ReactNode;
  calendar: ReactNode;
  habit: ReactNode;
  note: ReactNode;
  budget: ReactNode;
  food: ReactNode;
  water: ReactNode;
  pet: ReactNode;
}>) {
  const items = [
    {
      header: habit,
      className:
        "2xl:col-span-3 2xl:row-span-4 xl:flex col-span-4 row-span-5 bg-pink-100 hidden ",
    },
    {
      header: todo,
      className:
        "2xl:col-span-3 2xl:row-span-4 xl:col-span-4 xl:row-span-3 lg:col-span-5 lg:row-span-5 md:col-span-8 md:row-span-4 row-span-5 bg-pink-100",
    },
    {
      header: event,
      className:
        "2xl:col-span-2 2xl:row-span-4 2xl:order-none xl:col-span-4 xl:row-span-3 xl:order-1 xl:from-pink-300 xl:bg-pink-100 lg:col-span-5 lg:row-span-5 lg:bg-pink-400 lg:order-2 md:col-span-8 md:row-span-4 md:order-1 md:bg-pink-100 sm:bg-pink-200 row-span-5 from-pink-100 bg-pink-400",
    },
    {
      header: note,
      className:
        "2xl:col-span-4 2xl:row-span-3 2xl:bg-pink-100 2xl:order-none xl:col-span-8 xl:row-span-2 xl:order-3 xl:bg-pink-400 lg:col-span-7 lg:row-span-3 md:col-span-4 md:row-span-8 md:from-pink-300 md:bg-pink-100 sm:flex row-span-5 from-pink-200 bg-pink-400 hidden",
    },
    {
      header: budget,
      className:
        "2xl:col-span-4 2xl:row-span-4 2xl:bg-pink-300 2xl:order-none xl:flex col-span-4 row-span-5 order-2 bg-pink-400 from-pink-100 hidden",
    },
    {
      header: calendar,
      className:
        "2xl:col-span-5 2xl:row-span-6 2xl:bg-pink-400 2xl:order-none xl:col-span-8 xl:row-span-5 xl:bg-pink-300 lg:col-span-7 lg:row-span-7 md:flex col-span-12 row-span-6 order-1 bg-pink-400 from-pink-100 hidden",
    },
    {
      header: pet,
      className:
        "2xl:flex col-span-3 row-span-3 from-pink-100 bg-pink-300 hidden",
    },
    {
      header: water,
      className:
        "2xl:flex col-span-2 row-span-3 from-pink-300 bg-pink-400 hidden",
    },
    {
      header: food,
      className:
        "2xl:flex col-span-5 row-span-3 from-pink-300 bg-pink-400 hidden",
    },
  ];

  return (
    <>
      {/* <WavyBackground> */}
      <main className="flex flex-col w-screen h-screen items-center  px-8">
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
      {/* </WavyBackground> */}
    </>
  );
}
