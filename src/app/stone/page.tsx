'use client';

import React, { useState, useEffect, useRef } from "react";
import { Howl } from 'howler';
import Link from "next/link";
//import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation'; // Add this import
import { Input } from "@/components/ui/input"; // Add this import
import { addScore } from "@/services/LeaderboardService"; // Add this import

import { Button } from "@/components/ui/button";
import AudioPlayer from "@/components/AudioPlayer";
import GameUI from "@/components/game/GameUI";
import { ArrowLeft } from "lucide-react";
import * as THREE from 'three'; // Import Three.js
import GameLayout from "@/components/game/GameLayout";

// Define a predefined 10x16 labyrinth grid (0: ground, 1: wall, 2: hole)
let labyrinthGrid = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 1
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1], // 2
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1], // 3
  [1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 1, 2, 1], // 4
  [1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0], // 5
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1], // 6, Added a 10th row
  [1, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 1], // 7
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], // 8
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 9 - Added a 10th row
];

const TILE_SIZE = 1; // Size of each grid tile in Three.js units
const GRID_WIDTH = labyrinthGrid[0].length;
const GRID_HEIGHT = labyrinthGrid.length;
const WALL_VALUE = 1;
const START_POSITION = { x: 1, y: 9 }; // Corresponds to grid index [9][1] - Start position (bottom left of open area)
const EXIT_POSITION = { x: 15, y: 5 }; // Corresponds to grid index [5][15] - Exit position, corrected grid index to match labyrinthGrid
const HOLE_VALUE = 2;

type GameState = 'playing' | 'win' | 'lose-time' | 'lose-hole' | 'lose';

export default function StoneLabyrinthPage() {
  const [timeLeft, setTimeLeft] = useState(45);
  const [lives, setLives] = useState(3);

  const [gameState, setGameState] = useState<GameState>('playing');
  const [playerPosition, setPlayerPosition] = useState(START_POSITION);
  const [isFalling, setIsFalling] = useState(false);
  const [playerName, setPlayerName] = useState(''); // Add this state

  const gameCanvasRef = useRef<HTMLDivElement>(null);

  const router = useRouter(); // Initialize useRouter

  // Calculate score based on remaining time and lives (adjust as needed for your game's scoring)
  const calculateScore = () => {
    return timeLeft * lives; // Example: Score is time left multiplied by lives
  };

  const handleSaveScore = async () => { // Add this function
    if (playerName.trim()) {
      const finalScore = calculateScore(); // Calculate the final score
      await addScore('Stone Labyrinth', playerName, finalScore);
      router.push('/'); // Navigate back to the hub
    }
  };
  
  const threeCanvasRef = useRef<HTMLCanvasElement>(null);

  const playerRef = useRef<THREE.Mesh | null>(null);
  const wallsRef = useRef<THREE.Mesh[]>([]);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  // Sound effects
  const playerStepSound = useRef<Howl | null>(null);
  const fallingHoleSound = useRef<Howl | null>(null);
  const exitDingSound = useRef<Howl | null>(null);
  const gameOverSound = useRef<Howl | null>(null);

  useEffect(() => {
    // Ensure Howler is loaded before creating sounds
    if (typeof Howl === 'undefined') return;
    // Initialize sounds
    playerStepSound.current = new Howl({
      src: ['/sfx/Player_Step.mp3'],
      volume: 0.25,
    });
    fallingHoleSound.current = new Howl({
      src: ['/sfx/Falling_into_Hole.mp3'],
      volume: 0.25,
    });
    exitDingSound.current = new Howl({
      src: ['/sfx/Exit_ding.mp3'],
      volume: 0.25,

    });
    gameOverSound.current = new Howl({
      src: ['/sfx/Game_Over_Ominous.mp3'],
      volume: 0.25, // Set initial volume to half of 0.5 (0.25)
    });
  }, []);
  // Function to generate a random labyrinth grid with a guaranteed path
  const generateLabyrinth = () => {
    let newGrid: number[][] = [];
    let pathFound = false;
    let attempts = 0;
    const maxAttempts = 1000; // Prevent infinite loops

    while (!pathFound && attempts < maxAttempts) {
      newGrid = Array.from({ length: GRID_HEIGHT }, () =>
        Array.from({ length: GRID_WIDTH }, () => Math.random() > 0.7 ? WALL_VALUE : (Math.random() > 0.9 ? HOLE_VALUE : 0))
      );

      // Ensure edges are walls except for start and exit
      for (let y = 0; y < GRID_HEIGHT; y++) {
        newGrid[y][0] = WALL_VALUE;
        newGrid[y][GRID_WIDTH - 1] = WALL_VALUE;
      }
      for (let x = 0; x < GRID_WIDTH; x++) {
        newGrid[0][x] = WALL_VALUE;
        newGrid[GRID_HEIGHT - 1][x] = WALL_VALUE;
      }

      // Ensure start and exit are open and not holes
      newGrid[START_POSITION.y][START_POSITION.x] = 0;
      newGrid[EXIT_POSITION.y][EXIT_POSITION.x] = 0;

      // Check for a path using Breadth-First Search (BFS)
      const queue: { x: number; y: number }[] = [{ ...START_POSITION }];
      const visited: boolean[][] = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(false));
      visited[START_POSITION.y][START_POSITION.x] = true;

      const directions = [
        { dx: 0, dy: -1 }, // Up
        { dx: 0, dy: 1 }, // Down
        { dx: -1, dy: 0 }, // Left
        { dx: 1, dy: 0 }, // Right
      ];

      while (queue.length > 0) {
        const current = queue.shift()!;

        if (current.x === EXIT_POSITION.x && current.y === EXIT_POSITION.y) {
          pathFound = true;
          break;
        }

        for (const dir of directions) {
          const nextX = current.x + dir.dx;
          const nextY = current.y + dir.dy;

          if (
            nextX >= 0 &&
            nextX < GRID_WIDTH &&
            nextY >= 0 &&
            nextY < GRID_HEIGHT &&
            !visited[nextY][nextX] &&
            newGrid[nextY][nextX] !== WALL_VALUE &&
            newGrid[nextY][nextX] !== HOLE_VALUE // Don't consider holes as part of a valid path
          ) {
            visited[nextY][nextX] = true;
            queue.push({ x: nextX, y: nextY });
          }
        }
      }
      attempts++;
    }

    if (!pathFound) {
      console.warn("Could not generate a labyrinth with a path after multiple attempts. Using a default or simple grid.");
      // Fallback to a simple grid or the initial predefined one if generation fails
      return [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ]; // Example simple grid
    }
    return newGrid;
  };

  const renderLabyrinth = (grid: number[][]) => {
    if (!sceneRef.current) return;
  
    // Limpiar laberinto anterior
    sceneRef.current.children = sceneRef.current.children.filter(
      obj => !(obj.userData && obj.userData.type === 'labyrinth-tile')
    );
  
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        const value = grid[y][x];
        const posX = (x - GRID_WIDTH / 2 + 0.5) * TILE_SIZE;
        const posZ = (y - GRID_HEIGHT / 2 + 0.5) * TILE_SIZE;
  
        // Piso base
        const groundGeometry = new THREE.BoxGeometry(TILE_SIZE, 0.1, TILE_SIZE);
        // 🪨 Suelo de piedra desgastada
        const groundMaterial = new THREE.MeshStandardMaterial({
          color: 0x5C4438,      // Marrón medio tipo tierra/piedra antigua
          roughness: 0.9,
          metalness: 0.05,
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.position.set(posX, 0, posZ);
        ground.userData.type = 'labyrinth-tile';
        sceneRef.current.add(ground);
  
        if (value === WALL_VALUE) {
          const wallGeometry = new THREE.BoxGeometry(TILE_SIZE, TILE_SIZE, TILE_SIZE);
          // 🧱 Pared de piedra (oscura, sólida)
          const wallMaterial = new THREE.MeshStandardMaterial({
            color: 0x3B2F2F,      // Marrón profundo tipo roca
            roughness: 0.8,
            metalness: 0.1,
          });
          const wall = new THREE.Mesh(wallGeometry, wallMaterial);
          wall.position.set(posX, TILE_SIZE / 2, posZ);
          wall.userData.type = 'labyrinth-tile';
          sceneRef.current.add(wall);
        } else if (value === HOLE_VALUE) {
          const holeGeometry = new THREE.CylinderGeometry(TILE_SIZE / 2, TILE_SIZE / 2, 0.05, 32);
          // 🕳️ Hueco (casi igual al suelo pero más apagado)
          const holeMaterial = new THREE.MeshStandardMaterial({
            color: 0x4A3F38,      // Café grisáceo oscuro, casi se camufla
            roughness: 1.0,
            metalness: 0.0,
            });
          const hole = new THREE.Mesh(holeGeometry, holeMaterial);
          hole.rotation.x = -Math.PI / 2;
          hole.position.set(posX, 0.05, posZ);
          hole.userData.type = 'labyrinth-tile';
          sceneRef.current.add(hole);
        }
  
        // Marcar salida
        if (x === EXIT_POSITION.x && y === EXIT_POSITION.y) {
          const exitGeometry = new THREE.BoxGeometry(TILE_SIZE * 0.8, 0.2, TILE_SIZE * 0.8);
          const exitMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
          const exit = new THREE.Mesh(exitGeometry, exitMaterial);
          exit.position.set(posX, 0.1, posZ);
          exit.userData.type = 'labyrinth-tile';
          sceneRef.current.add(exit);
        }
      }
    }
  };
  
  useEffect(() => {
    // Initialize Three.js scene, camera, and renderer here
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: threeCanvasRef.current!, antialias: true });
    renderer.setSize(gameCanvasRef.current!.clientWidth, gameCanvasRef.current!.clientHeight);
    
    // Guardar en refs
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // This effect should only run once on component mount
    // Player
    const playerGeometry = new THREE.BoxGeometry(TILE_SIZE * 0.8, TILE_SIZE * 0.8, TILE_SIZE * 0.8);
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.set(
      (START_POSITION.x - GRID_WIDTH / 2 + 0.5) * TILE_SIZE,
      TILE_SIZE / 2,
      (START_POSITION.y - GRID_HEIGHT / 2 + 0.5) * TILE_SIZE
    );
    
    renderLabyrinth(labyrinthGrid);

    sceneRef.current?.add(player);
    playerRef.current = player;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xaaaaaa);
    sceneRef.current?.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    sceneRef.current?.add(directionalLight);

    // Animation Loop
    const animate = () => {
      if (gameState !== 'playing' && gameState !== 'lose-hole') {
        // Only animate if the game is playing or recently lost a life (for falling animation)
        return;
      } // Corrected to use requestAnimationFrame directly

      requestAnimationFrame(animate); // Corrected to use requestAnimationFrame directly
      if (playerRef.current && cameraRef.current && rendererRef.current && sceneRef.current) {
        const playerPos = playerRef.current.position; // Corrected variable name
          cameraRef.current.position.set( // Corrected camera position for over-the-shoulder view
            playerPos.x + 3,
            playerPos.y + 5,
            playerPos.z + 3
        );
        cameraRef.current.lookAt(playerPos);
      }
      rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
    };
    animate();

    // Handle Window Resize
    const handleResize = () => {
      const canvasContainer = gameCanvasRef.current;
      const camera = cameraRef.current;
      const renderer = rendererRef.current;
    
      if (!canvasContainer || !camera || !renderer) return;
    
      const width = canvasContainer.clientWidth;
      const height = canvasContainer.clientHeight;
    
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    

    // Mouse Controls for Camera Rotation (keep existing)
    const onMouseDown = (event: MouseEvent) => {
      if (event.button === 0) { // Left mouse button
        isDraggingRef.current = true;
        mouseRef.current.x = event.clientX;
        mouseRef.current.y = event.clientY;
        document.body.style.cursor = 'grabbing';
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current || !gameCanvasRef.current || !cameraRef.current) return;

      const deltaX = event.clientX - mouseRef.current.x;
      const deltaY = event.clientY - mouseRef.current.y;

      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;

      // Rotate camera around the player's current position
      const playerPos = playerRef.current!.position;
      cameraRef.current.position.sub(playerPos);
      cameraRef.current.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), deltaX * 0.005);
      cameraRef.current.position.add(playerPos);
      cameraRef.current.lookAt(playerPos);
    };

    const onMouseUp = (event: MouseEvent) => {
      if (event.button === 0) { // Left mouse button
        isDraggingRef.current = false;
        document.body.style.cursor = 'grab';
      }
    };

    // Mouse Scroll for Camera Zoom
    const onMouseWheel = (event: WheelEvent) => {
      if (!cameraRef.current) return;
      const zoomSpeed = 0.1;
      const newFOV = cameraRef.current.fov + event.deltaY * zoomSpeed;
      cameraRef.current.fov = Math.max(10, Math.min(100, newFOV)); // Clamp FOV
      cameraRef.current.updateProjectionMatrix();
    };

    gameCanvasRef.current?.addEventListener('mousedown', onMouseDown);
    gameCanvasRef.current?.addEventListener('mousemove', onMouseMove);
    gameCanvasRef.current?.addEventListener('mouseup', onMouseUp);
    gameCanvasRef.current?.addEventListener('wheel', onMouseWheel);

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
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
      gameCanvasRef.current?.removeEventListener('mousedown', onMouseDown);
      gameCanvasRef.current?.removeEventListener('mousemove', onMouseMove);
      gameCanvasRef.current?.removeEventListener('mouseup', onMouseUp);
      gameCanvasRef.current?.removeEventListener('wheel', onMouseWheel);
      rendererRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const canvasContainer = gameCanvasRef.current;
      const renderer = rendererRef.current;
      const camera = cameraRef.current;
  
      if (!canvasContainer || !renderer || !camera) return;
  
      const width = canvasContainer.clientWidth;
      const height = canvasContainer.clientHeight;
  
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
  
    const observer = new ResizeObserver(() => {
      handleResize(); // 🔄 Se ejecuta cada vez que cambia el tamaño del contenedor
    });
  
    if (gameCanvasRef.current) {
      observer.observe(gameCanvasRef.current);
      handleResize(); // ✅ Ejecutar resize inmediatamente al montar
    }
  
    return () => {
      if (gameCanvasRef.current) observer.unobserve(gameCanvasRef.current);
      observer.disconnect();
    };
  }, []);
  

  // Consolidated useEffect for handling keydown events, player movement, win condition, and hole falling
  useEffect(() => {
    if (!gameCanvasRef.current) {
      return; // Exit if canvas ref is not available yet
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState !== 'playing') {
        return; // Prevent movement if the game is not playing
      }
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

      // Check for collision with walls and move if not a wall
      if (targetGridValue !== 1) {
        setIsFalling(false); // Reset falling state on valid move
        playerStepSound.current?.play(); // Play step sound on successful move
        // Update player position state
        setPlayerPosition(newPosition);

        // Update player Three.js mesh position
        if (playerRef.current) {
          playerRef.current.position.set(
            (newPosition.x - GRID_WIDTH / 2 + 0.5) * TILE_SIZE,
            TILE_SIZE / 2,
            (newPosition.y - GRID_HEIGHT / 2 + 0.5) * TILE_SIZE
          );
        }
      } else {
        // Play wall hit sound or visual feedback if needed
      }

      // Check for win condition after updating position
      if (newPosition.x === EXIT_POSITION.x && newPosition.y === EXIT_POSITION.y && gameState === 'playing') {
        setGameState('win');
        exitDingSound.current?.play(); // Play exit ding sound
      }
    };
    
    // Check if the player has fallen into a hole after the position update
    const currentPlayerGridValue = labyrinthGrid[playerPosition.y][playerPosition.x];
    if (currentPlayerGridValue === HOLE_VALUE && gameState === 'playing') {
 fallingHoleSound.current?.play(); // Play falling sound
      setGameState('lose-hole');
      setIsFalling(true);
      if (playerRef.current) {
        // Simple falling animation (move down quickly)
        playerRef.current.position.y = -TILE_SIZE;
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition, gameState]); // Depend on playerPosition and gameState

  // Timer logic (keep existing)

  useEffect(() => {
    if (gameState !== 'playing') {
      return; // Stop timer if game is not playing
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if (gameState === 'playing') {
            gameOverSound.current?.play(); // 👈 Agrega el sonido aquí también
            setGameState('lose-time');
            clearInterval(timer);
            return 0;
          }
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]); // Add gameState to dependency array

  // Handle losing a life when falling into a hole
  useEffect(() => {
    if (gameState === 'lose-hole' && lives > 0) {
      const lifeLostTimer = setTimeout(() => {
        setLives(lives - 1);
        setPlayerPosition(START_POSITION); // Reset player position
        if (playerRef.current) {
          playerRef.current.position.set(
            (START_POSITION.x - GRID_WIDTH / 2 + 0.5) * TILE_SIZE,
            TILE_SIZE / 2,
            (START_POSITION.y - GRID_HEIGHT / 2 + 0.5) * TILE_SIZE
          );
        }
        setGameState('playing'); // Resume playing
      }, 1500); // Short delay before restarting
      return () => clearTimeout(lifeLostTimer);
    } else if (gameState === 'lose-hole' && lives === 0) {
      gameOverSound.current?.play(); // Play game over sound
      setGameState('lose'); // Final lose condition
      labyrinthGrid = generateLabyrinth(); // Randomize labyrinth on final lose
      renderLabyrinth(labyrinthGrid); // Render the new labyrinth
    }
  }, [gameState, lives]);
  
  // Game UI
return (
  <>
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
      <AudioPlayer src="/music/3_Ancient_Echoes.mp3" />
    </div>
  </div>

  {/* Right side group */}
  <div className="flex flex-wrap items-center justify-between gap-5 flex-1 min-w-[250px]">
    <div className="text-primary font-headline font-bold text-xl sm:text-2xl">
      Stone Labyrinth
    </div>
    <div className="flex-shrink-0" style={{ transform: 'scale(0.8)', transformOrigin: 'right center' }}>
      <GameUI score={timeLeft * lives} time={timeLeft} lives={lives} />
    </div>
  </div>
</div>

{/* Game Area */}
<div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">
  <div
    ref={gameCanvasRef}
    className="relative w-full max-w-5xl rounded-lg border-4 border-accent/50 bg-black/30 backdrop-blur-sm"
    style={{ height: 'calc(60vh - 2rem)' }}
  >
    <canvas ref={threeCanvasRef} className="w-full h-full block" />
  </div>
</div>

{/* Footer */}
<div className="w-full flex justify-center items-stretch gap-4 flex-wrap px-[10%] p-2">
  <div className="bg-black/70 p-4 rounded-lg max-w-xs min-w-[120px] flex-1">
    <h3 className="font-headline text-xl font-bold mb-2">Goal</h3>
    <p>Reach the green exit.</p>
    <p>Avoid holes (lose a life).</p>
  </div>

  <div className="flex items-center justify-center flex-1 min-w-[120px]">
    <img
      src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGt6eWhvN2huaHppOXN2MnluYjBqbHphMnFyZjA0aXh6MXRuYTMxdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0xePQA4e8tTvFWta/giphy.gif"
      alt="Stone Animation"
      className="w-32 sm:w-40 h-auto rounded-lg shadow-lg"
    />
  </div>

  <div className="bg-black/70 p-4 rounded-lg max-w-xs min-w-[120px] flex-1">
    <h3 className="font-headline text-xl font-bold mb-2">Movement</h3>
    <p>Arrow Keys: Move 1 space</p>
    <p>Zoom in/out: Mouse wheel</p>
  </div>
</div>

jsx
  {/* End Game Message Overlay */}
{(gameState === 'win' || gameState === 'lose-time' || gameState === 'lose') && (
  <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center space-y-4">
      {gameState === 'win' && (
        <h2 className="font-headline text-4xl font-bold text-green-400">You Escaped!</h2>
      )}
      {gameState === 'lose-time' && (
        <h2 className="font-headline text-4xl font-bold text-red-400">Time's Up!</h2>
      )}
      {gameState === 'lose' && (
        <h2 className="font-headline text-4xl font-bold text-red-400">Game Over! Out of Lives.</h2>
      )}
      <p className="text-white">Final Score: {calculateScore()}</p>
      <div className="mb-4">
        <Input
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      <div className="flex gap-4 justify-center">
        <Button onClick={handleSaveScore} disabled={playerName.trim() === ''}>
          Save Score
        </Button>
        <Button onClick={() => window.location.reload()}>
          Play Again
        </Button>
        <Link href="/" passHref>
          <Button variant="secondary">Back to Hub</Button>
        </Link>
      </div>
    </div>
  </div>
)}

</>
);
}