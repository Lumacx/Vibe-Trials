"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface GameUIProps extends HTMLAttributes<HTMLDivElement> {
  score: number;
  time: number;
  health?: number;
  lives?: number; // asegúrate que este esté definido
}

export function GameUI({ score, time, health, className, ...props }: GameUIProps) {
  return (
    <div
    //fixed top-4 right-4 z-45 removido
      className={cn( 'w-48 space-y-2 rounded-lg border-2 border-accent/50 bg-background/70 p-4 font-code text-accent shadow-lg backdrop-blur-sm',
        className
      )}
      {...props}
    >
      <div className="flex justify-between">
        <span>SCORE</span>
        <span>{score}</span>
      </div>
      <div className="flex justify-between">
        <span>TIME</span>
        <span>{time}</span>
      </div>
      {health !== undefined && (
        <div className="flex justify-between items-center">
          <span>HEALTH</span>
          <div className="w-1/2 bg-muted rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${health}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameUI;
