"use client";

import { useState, useEffect, useRef } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GameUI } from "@/components/game/GameUI";
import { ArrowLeft } from "lucide-react";

export default function ForestCrossingPage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
 // Removed direct audio handling
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-green-900">
      <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/223322/00ff00.png?text=Forest+Highway')] bg-cover bg-center" data-ai-hint="highway forest"></div>
      <div className="absolute inset-0 bg-black/30"></div>
      
 <header className="fixed top-4 left-4 z-50">
 <AudioPlayer src="/music/6_Pixel_Groove_Adventure.mp3" volume={0.15} />

        <Link href="/" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hub
          </Button>
        </Link>
      </header>

      <GameUI score={score} time={timeLeft} />

      <main className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        <h1 className="font-headline text-6xl font-bold text-primary drop-shadow-lg">
          Forest Crossing
        </h1>
        <div className="mt-4 h-3/5 w-4/5 max-w-4xl rounded-lg border-4 border-accent/50 bg-black/30 backdrop-blur-sm">
          <p className="p-4 text-center text-muted-foreground">
            Game Canvas Placeholder (Frogger Style)
          </p>
        </div>
      </main>
    </div>
  );
}