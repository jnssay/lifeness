import SignoutButton from "../components/buttons/SignoutButton";
import Image from "next/image";
import { WavyBackground } from "@/components/ui/wavy-background";

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
      <div className="w-screen h-full flex flex-row">
        <div className="flex flex-col content-start w-1/3 h-full p-5 space-y-5"></div>

        <div className="flex flex-col items-center justify-center w-1/3 h-full p-5"></div>

        <div className="flex flex-col items-center justify-center w-1/3 h-full p-5"></div>
      </div>
    </main>
  );
}

export default function WavyHome() {
  return (
    <main className="flex flex-col">
      <WavyBackground backgroundFill="#fce1f9">
        <Home />
      </WavyBackground>
    </main>
  );
}
