"use client";

import AudioPlayer from "@vibe-components/AudioPlayer"; // Corrected import path
import GameLayout from "@vibe-components/game/GameLayout";
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
    <>
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
              <AudioPlayer src="/music/2_Arcade_Fever.mp3" volume={0.15} />
            </div>

            {/* Right: Game UI */}
            <div className="flex items-center justify-end w-1/3">
              <GameUI score={score} time={timeLeft} health={health} />
            </div>
          </div>
        }
        gameArea={
          <div className="flex flex-col items-center justify-center w-full h-full">
            {/* Three.js Canvas or Game Rendering Area */}
            <h1 className="font-headline text-4xl sm:text-6xl font-bold text-primary drop-shadow-lg mb-6">
          Flame Frenzy
        </h1>
        <div className="mt-4 h-3/5 w-4/5 max-w-4xl rounded-lg border-4 border-accent/50 bg-black/30 backdrop-blur-sm">
          <p className="p-4 text-center text-muted-foreground">
            Game Canvas Placeholder (Fire Theme)
          </p>
        </div>
          </div>
        }
        bottomSection={
          <>
            <div className="bg-black/70 p-4 rounded-lg max-w-xs">
              <h3 className="font-headline text-xl font-bold mb-2">Goal</h3>
              <p>Cut gems to earn points.</p>
              <p>Avoid ice cubes (freeze) and explosives (damage).</p>
            </div>
            <div className="flex items-center justify-center">
              <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2IwNDVjbTQyZjlxb3JwNDl0ZXB1Mm1xcDlsMDUzcm1vOHBkN3JnayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xTiTnELcAbgn0oHKKY/giphy.gif" alt="Fire Animation" className="w-40 h-auto rounded-lg shadow-lg" />
            </div>
            <div className="bg-black/70 p-4 rounded-lg max-w-xs">
              <h3 className="font-headline text-xl font-bold mb-2">Movement</h3>
              <p>Mouse drag or touch swipe: Move flame sword.</p>
            </div>
          </>
        }
      />

      {/* Game Over Messages (adapt as needed based on health/time) */}
      {(health <= 0 || timeLeft <= 0) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="text-center">
            {health <= 0 && (
              <h2 className="font-headline text-4xl font-bold text-red-400">Game Over!</h2>
            )}
            {timeLeft <= 0 && health > 0 && (
                 <h2 className="font-headline text-4xl font-bold text-yellow-400">Time's Up!</h2>
            )}
            <Button onClick={() => window.location.reload()} className="mt-4">
              Play Again
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
