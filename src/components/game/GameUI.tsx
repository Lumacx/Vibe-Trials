"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { HTMLAttributes } from "react";

interface GameUIProps extends HTMLAttributes<HTMLDivElement> {
  score: number;
  time: number;
  lives?: number;
  health?: number;
}

export function GameUI({ score, time, lives, health, className, ...props }: GameUIProps) {
  const [lastScore, setLastScore] = useState(score);
  const [scoreChanged, setScoreChanged] = useState(false);

  useEffect(() => {
    if (score !== lastScore) {
      setScoreChanged(true);
      setLastScore(score);

      const timeout = setTimeout(() => setScoreChanged(false), 500); // Reset after animation
      return () => clearTimeout(timeout);
    }
  }, [score, lastScore]);

  return (
    <div
      className={cn(
        "w-48 space-y-2 rounded-lg border-2 border-accent/50 bg-background/70 p-4 font-code text-accent shadow-lg backdrop-blur-sm flex flex-col",
        className
      )}
      {...props}
    >
      {/* Time with pulse if < 20 */}
      <div
        className={cn("flex justify-between", {
          "text-red-400 animate-pulse": time < 20,
        })}
      >
        <span>TIME</span>
        <span>{time}s</span>
      </div>

      {/* Score with flash animation */}
      <div
        className={cn("flex justify-between", {
          "text-yellow-300 animate-scoreflash": scoreChanged,
        })}
      >
        <span>SCORE</span>
        <span>{score}</span>
      </div>

      {/* Lives */}
      {lives !== undefined && (
        <div className="flex justify-between">
          <span>LIVES</span>
          <span>{lives}</span>
        </div>
      )}

      {/* Health */}
      {health !== undefined && (
        <div className="flex justify-between">
          <span>HP</span>
          <span>{health}</span>
        </div>
      )}
    </div>
  );
}

export default GameUI;
