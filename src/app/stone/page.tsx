'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GameUI } from "@/components/game/GameUI";
import { ArrowLeft } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import * as THREE from 'three'; // Import Three.js

// Define a predefined 10x16 labyrinth grid (0: empty, 1: wall, 2: hole)
const labyrinthGrid = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], // 1
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1], // 2
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1], // 3
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1], // 4
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0], // 5 - Path to exit
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], // 6
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], // 7
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 8
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Added a 10th row to make it 10x16
];

const TILE_SIZE = 1; // Size of each grid tile in Three.js units
const GRID_WIDTH = labyrinthGrid[0].length;
const GRID_HEIGHT = labyrinthGrid.length;

const START_POSITION = { x: 1, y: 1 }; // Corresponds to grid index [1][1] - Start position
const EXIT_POSITION = { x: 14, y: 5 }; // Corresponds to grid index [5][14]

export default function StoneLabyrinthPage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const gameCanvasRef = useRef<HTMLDivElement>(null); // Ref for the game canvas container
  const threeCanvasRef = useRef<HTMLCanvasElement>(null); // Ref for the Three.js canvas element

  // Three.js setup and rendering
  useEffect(() => {
    if (!threeCanvasRef.current || !gameCanvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      gameCanvasRef.current.clientWidth / gameCanvasRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: threeCanvasRef.current, antialias: true });
    renderer.setSize(
      gameCanvasRef.current.clientWidth,
      gameCanvasRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0); // Make background transparent

    // Add a simple cube (placeholder)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Camera position (basic)
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!gameCanvasRef.current) return;
      const width = gameCanvasRef.current.clientWidth;
      const height = gameCanvasRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run only once on mount

  // Timer logic (keep existing)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-stone-900">
      <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/444444/a020f0.png?text=Stone+Cavern')] bg-cover bg-center" data-ai-hint="stone cavern"></div>
      <div className="absolute inset-0 bg-black/60"></div>

      <header className="fixed top-4 left-4 z-50">
        <Link href="/" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hub
          </Button>
        </Link>
      </header>
      <AudioPlayer src="/music/3_Ancient_Echoes.mp3" />

      <GameUI score={score} time={timeLeft} />

      <main className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        <h1 className="font-headline text-6xl font-bold text-primary drop-shadow-lg">
          Stone Labyrinth
        </h1>
        {/* Game Canvas Container - Three.js will render here */}
        <div
          ref={gameCanvasRef}
          className="mt-4 h-3/5 w-4/5 max-w-4xl rounded-lg border-4 border-accent/50 bg-black/30 backdrop-blur-sm"
        >
           {/* Three.js will render onto this canvas */}
          <canvas ref={threeCanvasRef} className="w-full h-full"></canvas>
        </div>
      </main>
    </div>
  );
}
