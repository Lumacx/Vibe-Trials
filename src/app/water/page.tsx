"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@vibe-components/ui/button";
import { GameUI } from "@vibe-components/game/GameUI";
import AudioPlayer from "@vibe-components/AudioPlayer";
import { ArrowLeft } from "lucide-react";

import GameLayout from '@vibe-components/game/GameLayout'; // Assuming GameLayout is in this path
export default function HydroHeroesPage() {
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [timeLeft, setTimeLeft] = useState(90);
  const [audio] = useState(typeof Audio !== 'undefined' ? new Audio('/music/5_Chasing_Shadows.mp3') : undefined);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Removed direct audio handling as AudioPlayer component is used

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-blue-900">
      <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/222244/00ff00.png?text=Burning+Town')] bg-cover bg-center" data-ai-hint="burning town"></div>
      <div className="absolute inset-0 bg-black/50"></div>

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
              <AudioPlayer src="/music/5_Chasing_Shadows.mp3" volume={0.15} />
            </div>

            {/* Right: Game UI */}
            <div className="flex items-center justify-end w-1/3">
              <GameUI score={score} time={timeLeft} health={health} /> {/* Assuming Water uses score, time, and health */}
            </div>
          </div>
        }

        gameArea={
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="font-headline text-4xl sm:text-6xl font-bold text-primary drop-shadow-lg mb-6">
              Hydro Heroes
            </h1>
            <div
              className="relative w-full max-w-5xl rounded-lg border-4 border-accent/50 bg-black/30 backdrop-blur-sm"
              style={{ height: 'calc(70vh - 2rem)' }} // Adjust height as needed
            >
              {/* Game Canvas Placeholder */}
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Game Canvas Placeholder (Bomberman Style)
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
              <p>Extinguish all fires and survive flame monster attacks.</p>
            </div>

            {/* Center: GIF */}
            <div className="flex items-center justify-center">
              <img
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHljZ3Y5ajB3MWV1MHR1dGdxeXp5amYzdWlkZGFnazZreHoxaXFlNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ynSpLoEGuwKEJFlydz/giphy.gif"
                alt="Water Animation"
                className="w-40 h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Right: Movement */}
            <div className="bg-black/70 p-4 rounded-lg max-w-xs">
              <h3 className="font-headline text-xl font-bold mb-2">Movement</h3>
              <p>Arrow Keys: Move.</p>
              <p>Spacebar/Z: Deploy water.</p>
            </div>
          </>
        }
      />

      {/* Game Over Message Placeholder (Adapt as needed for Water game) */}
      {/* Example: If you have a win/lose condition based on time or health */}
      {/*
      {(timeLeft === 0 || health <= 0 || allFiresExtinguished) && ( // Assuming allFiresExtinguished is a state variable
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="text-center">
            {allFiresExtinguished && health > 0 && (
              <h2 className="font-headline text-4xl font-bold text-green-400">Fires Extinguished!</h2>
            )}
            {(timeLeft === 0 || health <= 0) && !allFiresExtinguished && ( // Assuming time out or no health means lose
              <h2 className="font-headline text-4xl font-bold text-red-400">Game Over!</h2>
            )}
            <Button onClick={() => window.location.reload()} className="mt-4">
              Play Again
            </Button>
          </div>
        </div>
      )}
      */}
      {/* Removed original main content */}
      {/*
      <main className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        <h1 className="font-headline text-6xl font-bold text-primary drop-shadow-lg">
          Hydro Heroes
        </h1>
        <div className="mt-4 h-3/5 w-4/5 max-w-4xl rounded-lg border-4 border-accent/50 bg-black/30 backdrop-blur-sm">
          <p className="p-4 text-center text-muted-foreground">
            Game Canvas Placeholder (Bomberman Style)
          </p>
        </div>
      </main>
      */}
    </div>
  );
}
