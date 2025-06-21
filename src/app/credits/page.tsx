import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CreditsPage() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="font-headline text-6xl font-bold text-primary">
        Credits
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        This game was created for the Vibe Retro Game Jam. It's a collection of five elemental-themed mini-games designed to be fun, replayable, and nostalgic.
      </p>
      <div className="mt-8 space-y-2 font-code text-accent">
        <p>Lead Developer: Luis Cajiao</p>
        <p>Concept: Studio Swai</p>
        <p>Engine: React, Next.js, Three.js, Dojo Engine, Cairo, Starknet</p>
        <p>Styling: Tailwind CSS, ShadCN/UI</p>
      </div>
      <Link href="/" passHref className="mt-12">
        <Button>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Hub
        </Button>
      </Link>
    </div>
  );
}
