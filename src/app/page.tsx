"use client";
import Link from 'next/link';
import { Button } from "@vibe-components/ui/button";
import {
  FireIcon,
  StoneIcon,
  WindIcon,
  WaterIcon,
  NatureIcon,
  TreasureChestIcon,
} from "@vibe-components/icons/GameIcons";
import AudioPlayer from '@vibe-components/AudioPlayer';
import { useStarknetConnect } from '../dojo/useStarknetConnect'; // Import the useStarknetConnect hook

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
    position: "top-[25%] right-[10%]",
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
    icon: <WaterIcon/>,
    position: "bottom-[10%] left-[22%]",
  },
  {
    name: "Forest Crossing",
    theme: "Nature",
    href: "/nature",
    icon: <NatureIcon />,
    position: "top-[25%] left-[10%]",
  },
];

export default function Home() {
  const { status, address, isConnecting, handleConnect, handleDisconnect } = useStarknetConnect();

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-background text-foreground overflow-hidden">
      <AudioPlayer src="/music/1_Celestial_Drift.mp3" volume={0.15} />
      <div className="absolute inset-0 z-0 bg-stars animate-stars" />

      <header className="relative z-10 text-center mb-4 sm:mb-6">
        <h1 className="font-headline text-5xl sm:text-7xl font-bold tracking-tighter text-primary">
          RetroVibe Arcade
        </h1>
      </header>

      <div className="relative z-10 text-center mb-8 sm:mb-12 flex flex-col items-center">
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
          Register/Log In to record your scores on the leaderboard for prizes, airdrops and NFTs in competitions
        </p>

        {/* Wallet Connection UI */}
        <div className="mt-4">
          {address ? (
            <div className="inline-flex items-center bg-primary/10 text-primary-foreground px-4 py-2 rounded-full text-sm sm:text-base cursor-pointer" onClick={handleDisconnect}>
              Connected: {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          ) : (
            <Button variant="outline" onClick={handleConnect} disabled={isConnecting} className="bg-yellow-200 text-gray-800 border-yellow-400 hover:bg-yellow-300 hover:border-yellow-500">
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}
        </div>
      </div>

      <p className="relative z-10 text-muted-foreground mt-2 text-lg sm:text-xl text-center mb-8 sm:mb-12">
        Select an element to begin your trial.
      </p>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg aspect-square">
        {gameSymbols.map((game) => (
          <Link
            href={game.href}
            key={game.theme}
            className={`absolute transform transition-transform duration-300 hover:scale-110 hover:z-10 group ${game.position}`}
            aria-label={`Play ${game.name}`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center shadow-lg group-hover:border-accent group-hover:shadow-accent/50 transition-all duration-300">
                {game.icon}
              </div>
              <span className="mt-2 font-headline text-sm sm:text-base text-primary-foreground group-hover:text-accent transition-colors duration-300">
                {game.theme}
              </span>
            </div>
          </Link>
        ))}

        {/* Central Treasure Chest and Leaderboard */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+2rem)] flex flex-col items-center gap-4">
          <Link href="/credits">
            <button
              className="group transform transition-transform duration-300 hover:scale-110"
              aria-label="View Credits"
            >
              <TreasureChestIcon />
            </button>
          </Link>
          <Link href="/leaderboard">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Leaderboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
