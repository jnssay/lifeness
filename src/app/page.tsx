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
      <div className="flex flex-col h-1/4 sm:h-1/3 min-h-[100px] w-80 sm:w-full lg:max-w-[1400px] 2xl:max-w-[1920px] justify-center relative sm:hover:scale-105 transition">
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
          priority
        />
      </div>

      <BentoGrid className="w-80 sm:w-full">
        <BentoGridItem className="row-span-2 sm:row-span-3 md:col-span-5 md:row-span-9 lg:col-span-5 lg:row-span-8" />
        <BentoGridItem className="row-span-2 sm:row-span-3 md:col-span-7 md:row-span-6 lg:col-span-7 lg:row-span-6" />
        <GithubGridItem className="row-span-2 sm:row-span-3 md:col-span-7 md:row-span-2 lg:col-span-3 lg:row-span-2" />
        <SigninGridItem className="row-span-2 sm:row-span-3 md:col-span-7 md:row-span-3 lg:col-span-4 lg:row-span-2 order-first md:order-none" />
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
