import { ReactNode } from "react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import SignoutButton from "../components/buttons/SignoutButton";
import { WavyBackground } from "@/components/ui/wavy-background";


export default function HomeLayout({
    children,
    todo,
}: Readonly<{
    children: ReactNode;
    todo: ReactNode;
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
                    <BentoGridItem className="col-span-2 row-span-3" />
                    <BentoGridItem className="col-span-3 row-span-3" header={todo} />
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
            </main>
        </WavyBackground>
    );
}
