import Image from "next/image";
import SigninButton from "./components/buttons/SigninButton";
import { WavyBackground } from "../components/ui/wavy-background";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import GithubButton from "./components/buttons/GithubButton";

interface GridItemProps {
  className?: string;
}

function GithubGridItem({ className }: GridItemProps) {
  return (
    <BentoGridItem
      className={className}
      header={<GithubButton />}
    />
  );
}

function SigninGridItem({ className }: GridItemProps) {
  return (
    <BentoGridItem
      className={className}
      header={<SigninButton />}
    />
  );
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
        <BentoGridItem className="sm:col-span-5 md:col-span-4 sm:row-span-3" />
        <BentoGridItem className="sm:col-span-7 md:col-span-8 sm:row-span-2 sm:hover:scale-105" />
        <GithubGridItem className="hidden md:flex md:col-span-3" />
        <SigninGridItem className="order-first sm:order-none sm:col-span-7 md:col-span-5 " />
      </BentoGrid>
    </main>
  );
}

export default function WavyLandingPage() {
  return (
    <main className="flex flex-col">
      <WavyBackground>
        <LandingPage />
      </WavyBackground>
    </main>
  );
}
