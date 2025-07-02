"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import GameUI from "@/components/game/GameUI";
import GameLayout from "@/components/game/GameLayout";

import * as THREE from "three";
import { Howl } from "howler";

const GAME_DURATION = 90;
const OBJECT_SPAWN_INTERVAL = 800;
const FREEZE_DURATION = 1500;
const OBJECT_SPEED_FACTOR = 1.25;

interface ThreeSceneProps {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setHealth: React.Dispatch<React.SetStateAction<number>>;
  gameState: 'playing' | 'gameOver';
}
 

export default function HydroHeroesPage() {
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [timeLeft, setTimeLeft] = useState(90);
  const [audio] = useState(typeof Audio !== 'undefined' ? new Audio('/music/5_Chasing_Shadows.mp3') : undefined);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null); // Ref for the game canvas container

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Three.js Setup Effect
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a); // Dark background
    sceneRef.current = scene;

    // Camera (Orthographic for 2D/Bomberman style)
    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
    camera.position.z = 10; // Position camera
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add a simple placeholder object (e.g., a cube)
    const geometry = new THREE.BoxGeometry(50, 50, 50);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []); // Run only once on mount
  // Removed direct audio handling as AudioPlayer component is used

    //<div className="relative h-screen w-screen overflow-hidden bg-blue-900">
     // <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/222244/00ff00.png?text=Burning+Town')] bg-cover bg-center" data-ai-hint="burning town"></div>
     // <div className="absolute inset-0 bg-black/50"></div>
  return (
     <>  
      <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-blue-900">
      
        {/* Header */}
    <div className="w-full px-[10%] p-2 mb-2 flex flex-wrap gap-6 justify-between">
    {/* Left side group */}
    <div className="flex flex-wrap items-center justify-between gap-5 flex-1 min-w-[250px]">
      <div className="flex-shrink-0">
        <Link href="/" passHref>
          <Button variant="outline" className="h-10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hub
          </Button>
        </Link>
      </div>
      <div className="flex-shrink max-w-[180px] w-full">
        <AudioPlayer src="/music/5_Chasing_Shadows.mp3" volume={0.15} />
      </div>
    </div>

    {/* Right side group */}
    <div className="flex flex-wrap items-center justify-between gap-5 flex-1 min-w-[250px]">
      <div className="text-cyan-400 font-headline font-bold text-xl sm:text-2xl">
        Hydro Heroes
      </div>
      <div
        className="flex-shrink-0"
        style={{ transform: 'scale(0.8)', transformOrigin: 'right center' }}
      >
        <GameUI score={score} time={timeLeft} health={health} />
      </div>
    </div>
  </div>


        {/* Game Area */}
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">
      <div
         // ref={gameCanvasRef}
        className="relative w-full max-w-5xl rounded-lg border-4 border-accent/50 bg-black/30 backdrop-blur-sm"
        style={{ height: 'calc(60vh - 2rem)' }}
      >
         {/* <canvas ref={threeCanvasRef} className="w-full h-full block" /> */}
         <canvas className="w-full h-full block" />
            {/* Three.js canvas will be rendered inside this div by the game logic */}
            {/* Add your Three.js canvas here. Example: */}
            {/* <canvas ref={yourCanvasRef} className="w-full h-full block" /> */}
            {/* Your game rendering logic will go here */}
            </div>
    </div>
      
        {/* Footer */}
    <div className="w-full flex justify-center items-stretch gap-4 flex-wrap px-[10%] p-2">
      <div className="bg-black/70 p-4 rounded-lg max-w-xs min-w-[120px] flex-1">
        <h3 className="font-headline text-xl font-bold mb-2">Goal</h3>
        <p>Extinguish all fires and survive flame monster attacks.</p>
      </div>

      <div className="flex items-center justify-center flex-1 min-w-[120px]">
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHljZ3Y5ajB3MWV1MHR1dGdxeXp5amYzdWlkZGFnazZreHoxaXFlNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ynSpLoEGuwKEJFlydz/giphy.gif"
          alt="Water Animation"
          className="w-32 sm:w-40 h-auto rounded-lg shadow-lg"
        />
      </div>

      <div className="bg-black/70 p-4 rounded-lg max-w-xs min-w-[120px] flex-1">
        <h3 className="font-headline text-xl font-bold mb-2">Movement</h3>
        <p>Arrow Keys: Move 1 space</p>
        <p>Spacebar / Z: Deploy water</p>
      </div>
    </div>

    
      {/*gameState === 'gameOver' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold text-red-400 mb-4">Time's up - Save Score in Hub?</h2>
            <p className="text-white mb-4">Final Score: {score}</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.reload()}>Restart</Button>
              <Link href="/" passHref>
                <Button variant="secondary">Back to Hub</Button>
              </Link>
            </div>
          </div>
        </div>
      )*/}
    

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
  </>
);}