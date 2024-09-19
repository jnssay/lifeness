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
      <div className="flex flex-col h-1/4 min-h-[100px] w-80 justify-center relative transition">
        <Image
          className="hidden"
          src="/lifeness.svg"
          alt="Lifeness Logo"
          fill
          priority
        />

        <Image
          className="flex"
          src="/logo_small.svg"
          alt="Lifeness Logo"
          fill
          priority
        />
      </div>

      <BentoGrid className="w-80 ">
        <GithubGridItem className="row-span-2" />
        <SigninGridItem className="row-span-2" />
      </BentoGrid>
    </main>
  );
}

export default function WavyLandingPage() {
  return (
    <LandingPage />
  );
}
