import SignoutButton from "../components/buttons/SignoutButton";
import Image from "next/image";
import { WavyBackground } from "@/components/ui/wavy-background";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

function Home() {
  return (
    <main className="w-screen h-screen flex flex-col">
      <div className="w-full flex flex-row justify-between px-8">
        <div className="flex w-48 relative flex-row">
          <a
            className="pointer-events-none flex place-flex-col items-center p-8 lg:pointer-events-auto"
            href="https://github.com/jnssay/lifeness"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/logo_notag.svg" alt="Lifeness Logo" fill />
          </a>
        </div>

        <SignoutButton />
      </div>

      <BentoGrid className="w-80 sm:w-full max-w-[1200px]">
        <BentoGridItem className="sm:col-span-5 md:col-span-4 sm:row-span-3" />
        <BentoGridItem className="sm:col-span-7 md:col-span-8 sm:row-span-2 sm:hover:scale-105" />
        <BentoGridItem className="hidden md:flex md:col-span-3" />
        <BentoGridItem className="order-first sm:order-none sm:col-span-7 md:col-span-5" />
      </BentoGrid>
    </main>
  );
}

export default function WavyHome() {
  return (
    <main className="flex flex-col">
      <WavyBackground>
        <Home />
      </WavyBackground>
    </main>
  );
}
