"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  FireIcon,
  StoneIcon,
  WindIcon,
  WaterIcon,
  NatureIcon,
  WalletIcon, // Assuming you have or will create a WalletIcon
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
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  // TODO: Implement global state for connected account using GameStore.ts

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      const { connect } = await import('starknetkit');
      const connection = await connect({ modalMode: "always" });
      if (connection && connection.isConnected) {
        setAccount(connection.account.address);
        // Future: Store account in global state (GameStore.ts)
      } else {
        console.log("Wallet connection failed or was cancelled.");
        setAccount(null);
      }
    } catch (e) {
      console.error("Error connecting wallet:", e);
      setAccount(null);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-background text-foreground overflow-hidden">
      <AudioPlayer src="/music/1_Celestial_Drift.mp3" volume={0.15} />
    <div className="absolute inset-0 z-0 bg-stars animate-stars" />
      
      <header className="relative z-10 text-center mb-8 sm:mb-12 flex flex-col items-center">
        <h1 className="font-headline text-4xl sm:text-6xl font-bold tracking-tighter text-primary">
          RetroVibe Arcade
        </h1>
        {/* Textbox and Connect Wallet Button */}
        <p className="text-center text-gray-300 max-w-sm mt-4 mb-4 text-sm sm:text-base">
          Register/Log In to record your scores on the leaderboard for prizes, airdrops and NFTs in competitions
        </p>
        {account ? (
          <div className="flex items-center bg-primary/10 text-primary-foreground px-4 py-2 rounded-full text-sm sm:text-base">
            <WalletIcon className="w-5 h-5 mr-2" /> {/* Use WalletIcon */}
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </div>
        ) : (
          <Button variant="secondary" onClick={connectWallet} disabled={isConnecting}>
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        )}
        <p className="text-muted-foreground mt-8 text-lg sm:text-xl">
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

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
          <Link href="/credits">
            <button
              className="group transform transition-transform duration-300 hover:scale-110"
              aria-label="View Credits"
            >
              <TreasureChestIcon />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
