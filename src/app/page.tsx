"use client";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  FireIcon,
  StoneIcon,
  WindIcon,
  WaterIcon,
  NatureIcon,
  TreasureChestIcon,
} from "@/components/icons/GameIcons";
import AudioPlayer from '@/components/AudioPlayer';

const gameSymbols = [
  {
    name: "Sky Guardian",
    theme: "Wind",
    href: "/wind",
    icon: <WindIcon />,
    position: "top-0 left-1/2 -translate-x-1/2",
  },
  {
    name: "Flame Frenzy",
    theme: "Fire",
    href: "/fire",
    icon: <FireIcon />,
    position: "top-[23%] right-[5%]",
  },
  {
    name: "Stone Labyrinth",
    theme: "Stone",
    href: "/stone",
    icon: <StoneIcon />,
    position: "bottom-[10%] right-[22%]",
  },
  {
    name: "Hydro Heroes",
    theme: "Water",
    href: "/water",
    icon: <WaterIcon />,
    position: "bottom-[10%] left-[22%]",
  },
  {
    name: "Forest Crossing",
    theme: "Nature",
    href: "/nature",
    icon: <NatureIcon />,
    position: "top-[23%] left-[5%]",
  },
];

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-background text-foreground overflow-hidden">
      {/* Background audio */}
      
 <header className="relative z-10 text-center mb-8 sm:mb-12">
 <AudioPlayer src="/music/1_Celestial_Drift.mp3" volume={0.15} />
        <h1 className="font-headline text-5xl sm:text-7xl font-bold tracking-tighter text-primary">
          RetroVibe Arcade
        </h1>
        <p className="text-muted-foreground mt-2 text-lg sm:text-xl">
          Select an element to begin your trial.
        </p>
      </header>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg aspect-square">
        {gameSymbols.map((game) => (
          <Link
            href={game.href}
            key={game.theme}
            className={`absolute transform transition-transform duration-300 hover:scale-110 hover:z-10 group ${game.position}`}
            aria-label={`Play ${game.name}`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center shadow-lg group-hover:border-accent group-hover:shadow-accent/50 transition-all duration-300">
                {game.icon}
              </div>
              <span className="mt-2 font-headline text-sm sm:text-base text-primary-foreground group-hover:text-accent transition-colors duration-300">
                {game.theme}
              </span>
            </div>
          </Link>
        ))}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+2rem)] flex flex-col items-center gap-4">
          <Link href="/credits">
            <button
              className="group transform transition-transform duration-300 hover:scale-110"
              aria-label="View Credits"
            >
              <TreasureChestIcon />
            </button>
          </Link>
          <Link href="/leaderboard" passHref>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Leaderboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
