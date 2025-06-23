"use client";

import { useState, useEffect, useRef } from "react";
import AudioPlayer from "@vibe-components/AudioPlayer";
import Link from "next/link";
import { Button } from "@vibe-components/ui/button";
import { GameUI } from "@vibe-components/game/GameUI";
import { ArrowLeft } from "lucide-react";

import GameLayout from '@vibe-components/game/GameLayout'; // Assuming GameLayout is in this path
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
  }, []); // Make sure this effect doesn't conflict with AudioPlayer

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-green-900 text-white overflow-hidden">
 <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/223322/00ff00.png?text=Forest+Highway')] bg-cover bg-center" data-ai-hint="highway forest"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      <GameLayout
        header={
          <div className="flex w-full justify-between items-center h-full">
            {/* Left: Back Button */}
            <div className="flex items-center justify-start w-1/3">
              <Link href="/" passHref>
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Hub
                </Button>
              </Link>
            </div>
            {/* Center: Audio Player */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <AudioPlayer src="/music/6_Pixel_Groove_Adventure.mp3" volume={0.15} />
            </div>
            {/* Right: Game UI */}
            <div className="flex items-center justify-end w-1/3">
              <GameUI score={score} time={timeLeft} /> {/* Assuming Nature uses score and time */}
            </div>
          </div>
        }

        gameArea={
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="font-headline text-4xl sm:text-6xl font-bold text-primary drop-shadow-lg mb-6">
              Forest Crossing
            </h1>
            <div
              className="relative w-full max-w-5xl rounded-lg border-4 border-accent/50 bg-black/30 backdrop-blur-sm"
              style={{ height: 'calc(70vh - 2rem)' }} // Adjust height as needed
            >
              {/* Game Canvas Placeholder */}
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Game Canvas Placeholder (Frogger Style)
              </div>
              {/* Replace with your Three.js canvas */}
              {/* <canvas ref={threeCanvasRef} className="w-full h-full block" /> */}
            </div>
          </div>
        }

        bottomSection={
          <>
            {/* Left: Goal */}
            <div className="bg-black/70 p-4 rounded-lg max-w-xs">
              <h3 className="font-headline text-xl font-bold mb-2">Goal</h3>
              <p>Reach the forest on the other side.</p>
              <p>Avoid being hit by vehicles.</p>
            </div>

            {/* Center: GIF */}
            <div className="flex items-center justify-center">
              <img
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXZrZWYydThnb2l6cWdnNDY2azk5c3RpNnRndnlrNWh6MzFhczMweCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xckpvtJhGi3TpQKRrW/giphy.gif"
                alt="Nature Animation"
                className="w-40 h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Right: Movement */}
            <div className="bg-black/70 p-4 rounded-lg max-w-xs">
              <h3 className="font-headline text-xl font-bold mb-2">Movement</h3>
              <p>Arrow Keys: Move 1 space.</p>
            </div>
          </>
        }
      />

      {/* Game Over Message Placeholder (Adapt as needed for Nature game) */}
      {/* Example: If you have a win/lose condition based on time or reaching the goal */}
      {/*
      {(timeLeft === 0 || gameWon) && ( // Assuming gameWon is a state variable
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="text-center">
            {gameWon && (
              <h2 className="font-headline text-4xl font-bold text-green-400">You Crossed!</h2>
            )}
            {timeLeft === 0 && !gameWon && ( // Assuming time out means lose
              <h2 className="font-headline text-4xl font-bold text-red-400">Time's Up!</h2>
            )}
            <Button onClick={() => window.location.reload()} className="mt-4">
              Play Again
            </Button>
          </div>
        </div>
      )}
      */}
    </div>
  );
}