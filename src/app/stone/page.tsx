'use client';

import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

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

function StoneLabyrinthPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); // Ref for the canvas element
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [playerPosition, setPlayerPosition] = useState(START_POSITION); // Start position
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Three.js setup and rendering
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );

    // Add a simple cube
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

    // Cleanup
    return () => {
      renderer.dispose();
    };
  }, []); // Empty dependency array to run only once on mount

  // Handle keyboard input for player movement
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
      // Check for wall collision (adapt this logic later for Three.js)
      if (labyrinthGrid[newPosition.y][newPosition.x] !== 1) {
        setPlayerPosition(newPosition);
      }
       event.preventDefault(); // Prevent default scrolling
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition, gameOver, gameWon]); // Include relevant dependencies

  // Game loop and logic (timer, hole collision, win condition)
  useEffect(() => {
    if (gameOver || gameWon) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    if (labyrinthGrid[playerPosition.y][playerPosition.x] === 2) {
      setGameOver(true);
      clearInterval(timer);
    }

    if (
      playerPosition.x === EXIT_POSITION.x &&
      playerPosition.y === EXIT_POSITION.y
    ) {
      setGameWon(true);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [playerPosition, gameOver, gameWon]);

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-900 text-white">
        <div className="text-lg mb-4">Score: {score}</div>
        <div className="text-lg mb-4">Time Left: {timeLeft}s</div>
        <h1 className="text-4xl font-bold mb-4">Game Over!</h1>
        <p className="text-xl">Time ran out or you fell into a hole.</p>
        {/* Add retry or return to menu options here */}
      </div>
    );
  }

  if (gameWon) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-800 text-white">
        <h1 className="text-4xl font-bold mb-4">You Won!</h1>
        <p className="text-xl">You reached the exit!</p>
        {/* Add score display and potential Web3 interaction here */}\
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-800 text-white">
      <h1 className="text-4xl font-bold mb-8">Stone Labyrinth</h1>

      <div className="flex justify-between w-full max-w-md mb-4">
        <div className="text-lg">Score: {score}</div>
        <div className="text-lg">Time Left: {timeLeft}s</div>
      </div>

      {/* Canvas Container */}
      <div ref={containerRef} className="w-full max-w-md aspect-square bg-gray-700 rounded-lg overflow-hidden shadow-lg">
        {/* Vanilla Three.js Canvas */}
        <canvas ref={canvasRef}></canvas>
      </div>

      <div className="mt-4 text-center">
        <p>Navigate the labyrinth using arrow keys.</p>
      </div>
    </div>
  );
}

export default StoneLabyrinthPage;
