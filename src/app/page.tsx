import Image from "next/image";
import SigninButton from "@/app/components/buttons/SigninButton";
import { WavyBackground } from "@/components/ui/wavy-background";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import GithubButton from "@/app/components/buttons/GithubButton";
import GridItem, { GridItemProps } from "@/app/components/GridItem";


function GithubGridItem({ className }: GridItemProps) {
  return <GridItem className={className} header={<GithubButton />} />;
}

function SigninGridItem({ className }: GridItemProps) {
  return <GridItem className={className} header={<SigninButton />} />;
}


function LandingPage() {
  return (
    <main className="flex flex-col w-screen h-screen justify-start items-center p-10 space-y-10">

      <div className="flex flex-col h-1/4 sm:h-1/3 min-h-[100px] w-80 sm:w-full max-w-[1200px] justify-center relative sm:hover:scale-105 transition">

        <Image
          className="hidden sm:flex"
          src="/lifeness.svg"
          alt="Lifeness Logo"
          fill
          priority
        />

        <Image
          className="flex sm:hidden"
          src="/logo_small.svg"
          alt="Lifeness Logo"
          fill
          priority />

      </div>

      <BentoGrid className="w-80 sm:w-full max-w-[1400px]">
        <BentoGridItem className="row-span-2 sm:col-span-5 md:col-span-4 md:row-span-7 sm:row-span-5" />
        <BentoGridItem className="row-span-2 sm:col-span-7 md:col-span-8 md:row-span-5 sm:row-span-3 sm:hover:scale-105" />
        <GithubGridItem className="hidden md:flex md:col-span-3 md:row-span-2" />
        <SigninGridItem className="order-first sm:order-none sm:col-span-7 md:col-span-5 row-span-2" />
      </BentoGrid>

    </main>
  );
}

export default function WavyLandingPage() {
  return (
    <WavyBackground>
      <LandingPage />
    </WavyBackground>
  );
}
