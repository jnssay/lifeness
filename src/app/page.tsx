import Image from "next/image";
import SigninButton from "./components/buttons/SigninButton";
import { WavyBackground } from "../components/ui/wavy-background";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import GithubButton from "./components/buttons/GithubButton";

const c = {
  dark_pink: "#ff00bb",
  pink: "#f576be",
  light_pink: "#ffb3de",
  white: "#FFFFFF",
};
const waveColors = [c.pink, c.white, c.dark_pink, c.light_pink, c.white];

function LandingPage() {
  return (
    <main className="flex flex-col w-screen h-screen justify-center items-center p-10 space-y-10">
      <div className="flex flex-col h-1/3 w-80 sm:w-full max-w-[1000px] relative hover:scale-105 transition">
        <Image
          className="hidden sm:flex"
          src="/lifeness.svg"
          alt="Lifeness Logo"
          fill
          priority
        />

        <div className="flex flex-col sm:hidden h-full w-80 relative space-y-4 justify-center">
          <Image src="/logo_small.svg" alt="Lifeness Logo" fill priority />
        </div>
      </div>
      <BentoGrid className="w-80 sm:w-full max-w-[1000px]">
        <BentoGridItem className="sm:col-span-5 md:col-span-4 sm:row-span-3" />
        <BentoGridItem className="sm:col-span-7 md:col-span-8 sm:row-span-2 sm:hover:scale-105" />
        <BentoGridItem
          className="hidden md:flex md:col-span-3"
          header={<GithubButton />}
        />
        <BentoGridItem
          className="order-first sm:order-none sm:col-span-7 md:col-span-8 md:col-span-5"
          header={<SigninButton />}
        />
      </BentoGrid>
    </main>
  );
}

export default function WavyLandingPage() {
  return (
    <main className="flex flex-col">
      <WavyBackground colors={waveColors}>
        <LandingPage />
      </WavyBackground>
    </main>
  );
}
