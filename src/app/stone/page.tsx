'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GameUI } from "@/components/game/GameUI";
import { ArrowLeft } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import * as THREE from 'three'; // Import Three.js

// Define a predefined 10x16 labyrinth grid (0: ground, 1: wall, 2: hole)
const labyrinthGrid = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 1
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1], // 2
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1], // 3
  [1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 1, 2, 1], // 4
  [1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0], // 5
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1], // 6
  [1, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 1], // 7
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], // 8
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 9 - Added a 10th row
];

const TILE_SIZE = 1; // Size of each grid tile in Three.js units
const GRID_WIDTH = labyrinthGrid[0].length;
const GRID_HEIGHT = labyrinthGrid.length;

const START_POSITION = { x: 1, y: 9 }; // Corresponds to grid index [9][1] - Start position (bottom left of open area)
const EXIT_POSITION = { x: 15, y: 5 }; // Corresponds to grid index [5][15] - Exit position
const HOLE_VALUE = 2;
export default function StoneLabyrinthPage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const gameCanvasRef = useRef<HTMLDivElement>(null);
  const threeCanvasRef = useRef<HTMLCanvasElement>(null);

  const playerRef = useRef<THREE.Mesh | null>(null);
  const wallsRef = useRef<THREE.Mesh[]>([]);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [gameState, setGameState] = useState<'playing' | 'win' | 'lose-time' | 'lose-hole'>('playing');

  useEffect(() => {
    if (!threeCanvasRef.current || !gameCanvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      gameCanvasRef.current.clientWidth / gameCanvasRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ canvas: threeCanvasRef.current, antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(
      gameCanvasRef.current.clientWidth,
      gameCanvasRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0);

    const wallGeometry = new THREE.BoxGeometry(TILE_SIZE, TILE_SIZE * 2, TILE_SIZE);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

    const textureLoader = new THREE.TextureLoader();
    const brokenBrickTexture = textureLoader.load('/textures/broken_brick.png');
    brokenBrickTexture.wrapS = THREE.RepeatWrapping;
    brokenBrickTexture.wrapT = THREE.RepeatWrapping;
    brokenBrickTexture.repeat.set(2, 2);

    const groundGeometry = new THREE.PlaneGeometry(TILE_SIZE, TILE_SIZE);
    groundGeometry.rotateX(-Math.PI / 2);
    const groundMaterial = new THREE.MeshStandardMaterial({ map: brokenBrickTexture });

    const holeGeometry = new THREE.PlaneGeometry(TILE_SIZE, TILE_SIZE);
    holeGeometry.rotateX(-Math.PI / 2);
    const holeMaterial = new THREE.MeshStandardMaterial({ map: brokenBrickTexture, color: 0x222222 });

    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        const gridValue = labyrinthGrid[y][x];
        const threeX = (x - GRID_WIDTH / 2 + 0.5) * TILE_SIZE;
        const threeZ = (y - GRID_HEIGHT / 2 + 0.5) * TILE_SIZE;

        if (gridValue === 1) {
          const wall = new THREE.Mesh(wallGeometry, wallMaterial);
          wall.position.set(threeX, TILE_SIZE / 2, threeZ);
          scene.add(wall);
          wallsRef.current.push(wall);
        } else {
          const ground = new THREE.Mesh(groundGeometry, groundMaterial);
          ground.position.set(threeX, 0, threeZ);
          scene.add(ground);

          if (x === EXIT_POSITION.x && y === EXIT_POSITION.y) {
            const exitGeometry = new THREE.PlaneGeometry(TILE_SIZE * 0.8, TILE_SIZE * 0.8);
            const exitMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 });
            const exitMarker = new THREE.Mesh(exitGeometry, exitMaterial);
            exitMarker.position.set(threeX, 0.01, threeZ);
            scene.add(exitMarker);
          }

          if (gridValue === 2) {
            const hole = new THREE.Mesh(holeGeometry, holeMaterial);
            hole.position.set(threeX, -0.01, threeZ);
            scene.add(hole);
          }
        }
      }
    }

    const playerGeometry = new THREE.BoxGeometry(TILE_SIZE * 0.8, TILE_SIZE * 0.8, TILE_SIZE * 0.8);
    const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 0.8 });
    const player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.set(
      (START_POSITION.x - GRID_WIDTH / 2 + 0.5) * TILE_SIZE,
      TILE_SIZE / 2,
      (START_POSITION.y - GRID_HEIGHT / 2 + 0.5) * TILE_SIZE
    );
    scene.add(player);
    playerRef.current = player;

    const ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const animate = () => {
      requestAnimationFrame(animate);
      if (playerRef.current && cameraRef.current) {
        const playerPos = playerRef.current.position;
        cameraRef.current.position.set(
          playerPos.x + 2,
          playerPos.y + 3,
          playerPos.z + 2
        );
        cameraRef.current.lookAt(playerPos);
      }
      rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
    };
    animate();

    const handleResize = () => {
      if (!gameCanvasRef.current || !cameraRef.current) return;
      const width = gameCanvasRef.current.clientWidth;
      const height = gameCanvasRef.current.clientHeight;
      rendererRef.current?.setSize(width, height);
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      sceneRef.current?.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          }
        }
      });
      rendererRef.current?.dispose();
    };
  }, []);
 // Empty dependency array to run only once on mount

  // Player movement and collision
  const [playerPosition, setPlayerPosition] = useState(START_POSITION);



  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let newPosition = { ...playerPosition };

      switch (event.key) {
        case 'ArrowUp':
          newPosition.y = Math.max(0, playerPosition.y - 1);
          break;
        case 'ArrowDown':
          newPosition.y = Math.min(GRID_HEIGHT - 1, playerPosition.y + 1);
          break;
        case 'ArrowLeft':
          newPosition.x = Math.max(0, playerPosition.x - 1);
          break;
        case 'ArrowRight':
          newPosition.x = Math.min(GRID_WIDTH - 1, playerPosition.x + 1);
          break;
        default:
          return;
      }

      const targetGridValue = labyrinthGrid[newPosition.y][newPosition.x];

      // Check for collision with walls
      if (gameState !== 'playing') {
        return; // Prevent movement if the game is not playing
      }
      if (targetGridValue !== 1) {
        // Update player position state
        setPlayerPosition(newPosition);
    
        // Update player Three.js mesh position
        if (playerRef.current) {
          // Move player slightly below ground if falling into a hole
          const targetY = targetGridValue === HOLE_VALUE ? -TILE_SIZE / 2 : TILE_SIZE / 2;

          // Use GSAP or a simple animation for smoother movement
          // Here's a basic instant movement:
 playerRef.current.position.set(
    
            (newPosition.x - GRID_WIDTH / 2 + 0.5) * TILE_SIZE,
 targetY, // Move player slightly below ground if falling into a hole
            (newPosition.y - GRID_HEIGHT / 2 + 0.5) * TILE_SIZE
          );
        }
      }
    };
    
    // Check if the player has fallen into a hole after the position update
    const currentPlayerGridValue = labyrinthGrid[playerPosition.y][playerPosition.x];
    if (currentPlayerGridValue === HOLE_VALUE && gameState === 'playing') {
      setGameState('lose-hole');
    }

    // Check for win condition
    if (playerPosition.x === EXIT_POSITION.x && playerPosition.y === EXIT_POSITION.y && gameState === 'playing') {
      setGameState('win');
    }


    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition]); // Depend on playerPosition to get the latest state

  // Timer logic (keep existing)

  useEffect(() => {
    if (gameState !== 'playing') {
      return; // Stop timer if game is not playing
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Time's up!
          setGameState('lose-time');
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    if (timeLeft === 0 && gameState === 'playing') {
      setGameState('lose-time');
    }

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

      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white z-20">
        <div className="bg-black/50 p-4 rounded-lg">
          <h3 className="font-headline text-xl font-bold mb-2">Instructions</h3>
          <p>Goal: Reach the green exit.</p>
          <p>Avoid falling into holes.</p>
          <p className="mt-2">Movement:</p>
          <p>Arrow Keys</p>
        </div>
      </div>

      <img src="/images/stone.gif" alt="Stone Image" className="absolute right-8 top-1/2 transform -translate-y-1/2 w-32 h-auto z-20" />

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
        {gameState !== 'playing' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <div className="text-center">
              {gameState === 'win' && (
                <h2 className="font-headline text-4xl font-bold text-green-400">You Escaped!</h2>
              )}
              {gameState === 'lose-time' && (
                <h2 className="font-headline text-4xl font-bold text-red-400">Time's Up!</h2>
              )}
              {gameState === 'lose-hole' && (
                <h2 className="font-headline text-4xl font-bold text-red-400">Fell into a Hole!</h2>
              )}
              <Button onClick={() => window.location.reload()} className="mt-4">Play Again</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
