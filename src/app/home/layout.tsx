import { ReactNode } from "react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import SignoutButton from "../components/buttons/SignoutButton";
import { WavyBackground } from "@/components/ui/wavy-background";
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
  return (
    <WavyBackground>
      <main className="flex flex-col w-screen h-screen items-center px-8">
        <div className="flex flex-row w-full justify-between py-4">
          <div className="flex flex-row w-48 relative p-8">
            <Image src="/logo_notag.svg" alt="Lifeness Logo" fill />
          </div>

          <SignoutButton />
        </div>
        <BentoGrid className="w-full mx-auto">
          <BentoGridItem
            className="col-span-3 row-span-4 bg-pink-100"
            header={habit}
          />
          <BentoGridItem
            className="col-span-3 row-span-4 bg-pink-100"
            header={todo}
          />
          <BentoGridItem
            className="col-span-2 row-span-4 bg-pink-100"
            header={event}
          />
          <BentoGridItem
            className="col-span-4 row-span-3 bg-pink-100"
            header={note}
          />
          <BentoGridItem
            className="col-span-4 row-span-4 from-pink-100 bg-pink-300"
            header={budget}
          />
          <BentoGridItem
            className="col-span-5 row-span-6 from-pink-100 bg-pink-400"
            header={calendar}
          />
          <BentoGridItem
            className="col-span-3 row-span-3 from-pink-100 bg-pink-300"
            header={pet}
          />
          <BentoGridItem
            className="col-span-2 row-span-3 from-pink-300 bg-pink-400"
            header={water}
          />
          <BentoGridItem
            className="col-span-5 row-span-3 from-pink-300 bg-pink-400"
            header={food}
          />
        </BentoGrid>
      </main>
    </WavyBackground>
  );
}
