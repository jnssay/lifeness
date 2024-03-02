import SignoutButton from "../components/buttons/SignoutButton";
import Image from "next/image";
import { WavyBackground } from "@/components/ui/wavy-background";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

function Home() {
  return (
    <main className="flex flex-col w-screen h-screen items-center px-8">
      <div className="flex flex-row w-full justify-between py-4">
        <div className="flex flex-row w-48 relative">
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

      <BentoGrid className="w-full mx-auto">
        <BentoGridItem className="col-span-2 row-span-3" />
        <BentoGridItem className="col-span-3 row-span-3" />
        <BentoGridItem className="col-span-2 row-span-5" />
        <BentoGridItem className="col-span-2 row-span-7" />
        <BentoGridItem className="col-span-3 row-span-4" />
        <BentoGridItem className="col-span-5 row-span-5" />
        <BentoGridItem className="col-span-3 row-span-3" />
        <BentoGridItem className="col-span-2 row-span-5" />
        <BentoGridItem className="col-span-3 row-span-3" />
        <BentoGridItem className="col-span-2 row-span-3" />
        <BentoGridItem className="col-span-5 row-span-2" />
      </BentoGrid>

    </main >
  );
}

export default function WavyHome() {
  return (
    <WavyBackground>
      <Home />
    </WavyBackground>
  );
}
