'use client'; // 🔥 Obligatorio

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@vibe-components/ui/button";
import { ArrowLeft } from "lucide-react";
import AudioPlayer from "@vibe-components/AudioPlayer";
import Image from "next/image";
const backgroundMusic = "/music/7_Eternal_Horizon.mp3";
const volume = 0.15;

export default function CreditsPage() {
  return (
    <>
      <AudioPlayer src={backgroundMusic} volume={volume} />
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h1 className="font-headline text-6xl font-bold text-primary">
          Credits
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          This game was created for the Vibe Retro Game Jam. It's a collection of five elemental-themed mini-games designed to be fun, replayable, and nostalgic.
        </p>
        <div className="mt-8 space-y-2 font-code text-accent">
          <p>Lead Developer: Luis Cajiao</p>
          <p>Concept: Studio Swai</p>
          <p>Engine: React, Next.js, Three.js, Dojo Engine, Cairo, Starknet</p>
          <p>Styling: Tailwind CSS, ShadCN/UI</p>
        </div>

        <div className="logo-attribution mt-16">
         <p className="mb-2 text-center">Created by</p>
         <Image
          src="https://studioswai.com/wp-content/uploads/Swai-logo.png"
          alt="Studio Swai logo"
          width={300}
          height={120}
          className="w-1/2 h-auto mx-auto"
          />
        </div>

        <Link href="/" className="mt-12">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Hub
          </Button>
        </Link>
      </div>
    </>
  );
}
