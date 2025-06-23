"use client";

import AudioPlayer from "@vibe-components/AudioPlayer"; // Corrected import path
import Link from 'next/link';
import GameUI from "@vibe-components/game/GameUI";
import { useEffect, useState } from "react";
import { Button } from "@vibe-components/ui/button";
import { ArrowLeft } from "lucide-react";


export default function FirePage() {
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white overflow-hidden">
      <AudioPlayer src="/music/2_Arcade_Fever.mp3" volume={0.15} />

      <header className="fixed top-4 left-4 z-50">
        <Link href="/" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hub
          </Button>
        </Link>
      </header>
      {/* Background image/animation goes here */}
      <div className="absolute inset-0 bg-black/50"></div>
      <GameUI score={score} time={timeLeft} health={health} />
      <main className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        <h1 className="font-headline text-6xl font-bold text-primary drop-shadow-lg">
          Flame Frenzy
        </h1>
        <div className="mt-4 h-3/5 w-4/5 max-w-4xl rounded-lg border-4 border-accent/50 bg-black/30 backdrop-blur-sm">
          <p className="p-4 text-center text-muted-foreground">
            Game Canvas Placeholder (Fire Theme)
          </p>
        </div>
      </main>
    </div>
  );
}
