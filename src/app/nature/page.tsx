'use client';

import { useState, useEffect, useRef } from "react";
import { Howl } from 'howler';
import AudioPlayer from "@/components/AudioPlayer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GameUI } from "@/components/game/GameUI";
import { ArrowLeft } from "lucide-react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { addScore } from "@/services/LeaderboardService";

import GameLayout from '@/components/game/GameLayout';

// Define grid dimensions and tile size
const GRID_WIDTH = 16;
const TILE_SIZE = 1;

const gameGrid: number[][] = [
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
];

const GRID_HEIGHT = gameGrid.length;

const FOREST_ROW = 0;
const GRID_TYPE = {
  GROUND: 0,
  LANE: 1,
  MEDIAN: 2,
  FOREST: 3,
  START: 4,
};

type GameState = 'playing' | 'win' | 'lose-time' | 'lose-hit' | 'lose';

interface Vehicle {
  id: number;
  gridX: number;
  gridY: number;
  speed: number;
  type: 'car' | 'motorcycle';
  mesh: THREE.Mesh;
}

const PLAYER_START_GRID_X = Math.floor(GRID_WIDTH / 2);
const PLAYER_START_POSITION = { x: PLAYER_START_GRID_X, y: GRID_HEIGHT - 1 };

const LANE_GRID_YS = gameGrid.map((row, index) => row[0] === GRID_TYPE.LANE ? index : -1).filter(index => index !== -1);

export default function ForestCrossingPage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [playerName, setPlayerName] = useState('');
  const playerPositionRef = useRef(PLAYER_START_POSITION);
  const vehiclesRef = useRef<Vehicle[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<THREE.Mesh | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const lastSpawnTimeRef = useRef(0);

  const playerHopSound = useRef<Howl | null>(null);
  const vehiclePassSound = useRef<Howl | null>(null);
  const playerHitSound = useRef<Howl | null>(null);
  const laneCrossedSound = useRef<Howl | null>(null);
  const forestReachedSound = useRef<Howl | null>(null);
  const gameOverSound = useRef<Howl | null>(null);

  const [playerLives, setPlayerLives] = useState(2);

  const handleSaveScore = () => {
    if (playerName.trim() !== '') {
      addScore('Forest Crossing', playerName, score);
      window.location.href = '/';
    }
  };

  const handlePlayerHit = () => {
    setPlayerLives(prevLives => {
      const newLives = prevLives - 1;
      if (newLives <= 0) {
        gameOverSound.current?.play();
        setGameState('lose-hit');
      } else {
        playerPositionRef.current = PLAYER_START_POSITION;
        if (playerRef.current) {
          playerRef.current.position.set(
            (playerPositionRef.current.x - GRID_WIDTH / 2 + 0.5) * TILE_SIZE,
            TILE_SIZE * 0.5,
            (playerPositionRef.current.y - GRID_HEIGHT / 2 + 0.5) * TILE_SIZE
          );
        }
      }
      return newLives;
    });
  };

  useEffect(() => {
    if (typeof Howl === 'undefined') return;
    playerHopSound.current = new Howl({ src: ['/sfx/Frog_Hop.mp3'], volume: 0.25 });
    vehiclePassSound.current = new Howl({ src: ['/sfx/Vehicle_Pass_1.mp3', '/sfx/Vehicle_Pass_2.mp3', '/sfx/Vehicle_Pass_3.mp3'], volume: 0.1 });
    playerHitSound.current = new Howl({ src: ['/sfx/Frog_splat_1.mp3', '/sfx/Frog_splat_2.mp3', '/sfx/Frog_splat_3.mp3', '/sfx/Frog_splat_4.mp3'], volume: 0.3 });
    laneCrossedSound.current = new Howl({ src: ['/sfx/Lane_Crossed_chime.mp3'], volume: 0.2 });
    forestReachedSound.current = new Howl({ src: ['/sfx/Forest_Victory1.mp3', '/sfx/Forest_Victory2.mp3', '/sfx/Forest_Victory3.mp3'], volume: 0.3 });
    gameOverSound.current = new Howl({ src: ['/sfx/Game_Over_Defeated.mp3'], volume: 0.08 });
  }, []);

  const renderEnvironment = (grid: number[][]) => {
    console.log("renderEnvironment called");
    console.log("GRID_WIDTH:", GRID_WIDTH);
    console.log("GRID_HEIGHT:", GRID_HEIGHT);
    if (!sceneRef.current) return;

    sceneRef.current.children = sceneRef.current.children.filter(
      obj => !(obj.userData && obj.userData.type === 'environment-tile')
    );

    const tileGeometry = new THREE.BoxGeometry(TILE_SIZE, 0.05, TILE_SIZE);

    for (let y = GRID_HEIGHT - 1; y >= 0; y--) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        console.log("Rendering tile at x:", x, "y:", y);
        console.log("Grid value at [", y, "][", x, "]:", grid[y][x]);

        const value = grid[y][x];
        let material;

        if (value === GRID_TYPE.LANE) {
          material = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.9 });
        } else if (value === GRID_TYPE.MEDIAN) {
          material = new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.7 });
        } else if (value === GRID_TYPE.FOREST) {
          material = new THREE.MeshStandardMaterial({ color: 0x006400, roughness: 0.6 });
        } else {
          material = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.8 });
          if (value === GRID_TYPE.START) {
            material = new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.7 });
          }
        }
        const tile = new THREE.Mesh(tileGeometry, material);

        tile.position.set(
          (x - GRID_WIDTH / 2 + 0.5) * TILE_SIZE,
          -0.025,
          (y - GRID_HEIGHT / 2 + 0.5) * TILE_SIZE
        );
        tile.userData.type = 'environment-tile';
        sceneRef.current.add(tile);
      }
    }
  };

  useEffect(() => {
    const canvasContainer = gameAreaRef.current;
    if (!canvasContainer) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    canvasContainer.appendChild(renderer.domElement);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    renderEnvironment(gameGrid);

    const playerGeometry = new THREE.BoxGeometry(TILE_SIZE * 0.8, TILE_SIZE * 0.8, TILE_SIZE * 0.8);
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const player = new THREE.Mesh(playerGeometry, playerMaterial);

    player.position.set(
      (playerPositionRef.current.x - GRID_WIDTH / 2 + 0.5) * TILE_SIZE,
      TILE_SIZE * 0.5,
      (playerPositionRef.current.y - GRID_HEIGHT / 2 + 0.5) * TILE_SIZE
    );

    scene.add(player);
    playerRef.current = player;

    const ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // This logic now runs only in the client-side useEffect,
    // where `window` is available and GRID_WIDTH, GRID_HEIGHT, TILE_SIZE are properly defined.
    if (typeof window !== 'undefined') {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const gridDiagonal = Math.sqrt(GRID_WIDTH ** 2 + GRID_HEIGHT ** 2) * TILE_SIZE;
      const fov = camera.fov * Math.PI / 180;
      const distance = gridDiagonal / (2 * Math.tan(fov / 2)) / Math.min(aspectRatio, 1);

      camera.position.set(0, distance, 0);
      camera.lookAt(0, 0, 0);
    } else {
        camera.position.set(0, GRID_HEIGHT * TILE_SIZE, 0);
        camera.lookAt(0, 0, 0);
    }

    let lastTime = 0;
    const animate = (currentTime: number) => {
      requestAnimationFrame(animate);

      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (gameState === 'playing') {
        if (playerRef.current) {
          playerRef.current.position.x = (playerPositionRef.current.x - GRID_WIDTH / 2 + 0.5) * TILE_SIZE;
          playerRef.current.position.z = (playerPositionRef.current.y - GRID_HEIGHT / 2 + 0.5) * TILE_SIZE;
        }

        const updatedVehicles: Vehicle[] = [];
        vehiclesRef.current.forEach(vehicle => {
          if (!vehicle.mesh) return;

          const updatedVehicle = {
            ...vehicle,
            gridX: vehicle.gridX + vehicle.speed * deltaTime,
          };

          updatedVehicle.mesh.position.x = (updatedVehicle.gridX - GRID_WIDTH / 2 + 0.5) * TILE_SIZE;

          if ((updatedVehicle.speed > 0 && updatedVehicle.gridX > GRID_WIDTH) || (updatedVehicle.speed < 0 && updatedVehicle.gridX < -1.5 * GRID_WIDTH)) {
              sceneRef.current?.remove(updatedVehicle.mesh);
              updatedVehicle.mesh.geometry?.dispose();
              (updatedVehicle.mesh.material as THREE.Material).dispose();
          } else {
              updatedVehicles.push(updatedVehicle);
          }
        });
        vehiclesRef.current = updatedVehicles;

        if (playerRef.current) {
          const playerBox = new THREE.Box3().setFromObject(playerRef.current);

          for (const vehicle of vehiclesRef.current) {
            if (!vehicle.mesh) continue;
            const vehicleBox = new THREE.Box3().setFromObject(vehicle.mesh);
            if (playerBox.intersectsBox(vehicleBox)) {
              if (gameState === 'playing') {
                playerHitSound.current?.play();
                handlePlayerHit();
                break;
              }
            }
          }
        }

        if (currentTime - lastSpawnTimeRef.current > 800) {
            spawnVehicle();
            lastSpawnTimeRef.current = currentTime;
        }
      }

      renderer.render(scene, camera);
    };
    animate(0);

    const handleResize = () => {
      if (rendererRef.current && cameraRef.current && gameAreaRef.current) {
        const width = gameAreaRef.current.clientWidth;
        const height = gameAreaRef.current.clientHeight;
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;

        // Recalculate camera distance on resize to fit the view
        const aspectRatio = width / height;
        const gridDiagonal = Math.sqrt(GRID_WIDTH ** 2 + GRID_HEIGHT ** 2) * TILE_SIZE;
        const fov = cameraRef.current.fov * Math.PI / 180;
        const distance = gridDiagonal / (2 * Math.tan(fov / 2)) / Math.min(aspectRatio, 1);
        cameraRef.current.position.y = distance;

        cameraRef.current.updateProjectionMatrix();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
        handleResize();
    });

    if (gameAreaRef.current) {
        resizeObserver.observe(gameAreaRef.current);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach(mat => mat.dispose());
          }
        }
      });
      renderer.dispose();
      if (canvasContainer && renderer.domElement && canvasContainer.contains(renderer.domElement)) {
          canvasContainer.removeChild(renderer.domElement);
      }
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if (gameState === 'playing' && playerLives > 0) {
            gameOverSound.current?.play();
            setGameState('lose-time');
            clearInterval(timer);
            return 0;
          } else if (gameState === 'playing' && playerLives <= 0) {
              setGameState('lose-time');
              clearInterval(timer);
              return 0;
          }
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, playerLives]);

  useEffect(() => {
    if (!gameAreaRef.current) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      let newPosition = { ...playerPositionRef.current };

      switch (event.key) {
        case 'ArrowUp':
          newPosition.y = Math.max(0, playerPositionRef.current.y - 1);
          break;
        case 'ArrowDown':
          newPosition.y = Math.min(GRID_HEIGHT - 1, playerPositionRef.current.y + 1);
          break;
        case 'ArrowLeft':
          newPosition.x = Math.max(0, playerPositionRef.current.x - 1);
          break;
        case 'ArrowRight':
          newPosition.x = Math.min(GRID_WIDTH - 1, playerPositionRef.current.x + 1);
          break;
        default:
          return;
      }

      if (newPosition.x >= 0 && newPosition.x < GRID_WIDTH && newPosition.y >= 0 && newPosition.y < GRID_HEIGHT) {
        const targetRowType = gameGrid[newPosition.y][newPosition.x];
        if (targetRowType === GRID_TYPE.MEDIAN || targetRowType === GRID_TYPE.FOREST) {
            laneCrossedSound.current?.play();
            if (targetRowType === GRID_TYPE.MEDIAN) {
              setScore(prevScore => prevScore + 50);
            } else if (targetRowType === GRID_TYPE.FOREST) {
              setScore(prevScore => prevScore + 500);
            }
        }
        playerPositionRef.current = newPosition;
        playerHopSound.current?.play();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing' && playerPositionRef.current.y === FOREST_ROW) {
      forestReachedSound.current?.play();
      setGameState('win');
    }
  }, [playerPositionRef.current.y, gameState]);

  const spawnVehicle = () => {
    console.log("spawnVehicle called");
    if (gameState !== 'playing' || !sceneRef.current) return;

    const randomLaneIndex = Math.floor(Math.random() * LANE_GRID_YS.length); const laneGridY = LANE_GRID_YS[randomLaneIndex];

    const direction = randomLaneIndex % 2 === 0 ? 1 : -1; const startGridX = direction === 1 ? -2 : GRID_WIDTH + 1;

    const speed = (direction === 1 ? 1 : -1) * (Math.random() * 3 + 2);
    console.log("Vehicle speed:", speed);
    const type = Math.random() > 0.5 ? 'car' : 'motorcycle';

    let vehicleGeometry;
    let vehicleMaterial;

    if (type === 'car') {
        vehicleGeometry = new THREE.BoxGeometry(TILE_SIZE * 1.8, TILE_SIZE * 0.8, TILE_SIZE * 0.8);
        vehicleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    } else { // motorcycle
        vehicleGeometry = new THREE.BoxGeometry(TILE_SIZE * 1.2, TILE_SIZE * 0.8, TILE_SIZE * 0.8);
        vehicleMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    }

    const vehicleMesh = new THREE.Mesh(vehicleGeometry, vehicleMaterial);

    vehicleMesh.position.set(
      (startGridX - GRID_WIDTH / 2 + 0.5) * TILE_SIZE,
      TILE_SIZE * 0.5,
      (laneGridY - GRID_HEIGHT / 2 + 0.5) * TILE_SIZE
    );

    sceneRef.current.add(vehicleMesh);

    const newVehicle: Vehicle = {
      id: Date.now() + Math.random(),
      gridX: startGridX,
      gridY: laneGridY,
      speed: speed,
      type: type,
      mesh: vehicleMesh,
    };

    vehiclesRef.current.push(newVehicle);
    console.log("Vehicle spawned:", newVehicle);
    console.log("Number of vehicles in vehiclesRef:", vehiclesRef.current.length);
  };

  useEffect(() => {
    if (gameState === 'lose-time' || gameState === 'lose-hit' || gameState === 'win') {
      console.log("Game Over/Win State:", gameState);
    }
  }, [gameState]);

  return (
    <>
      <div className="w-full px-[10%] p-2 mb-0 flex flex-wrap gap-6 justify-between">
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
            <AudioPlayer src="/music/6_Pixel_Groove_Adventure.mp3" volume={0.25} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 flex-1 min-w-[250px]">
          <div className="text-green-400 font-headline font-bold text-xl sm:text-2xl">
            Forest Crossing
          </div>
          <div
            className="flex-shrink-0"
            style={{ transform: 'scale(0.8)', transformOrigin: 'right center' }}
          >
            <GameUI score={score} time={timeLeft} lives={playerLives} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">
        <div
          ref={gameAreaRef}
          className="relative mx-auto rounded-lg border-4 border-accent/50 bg-black/30 backdrop-blur-sm"
          style={{
            height: 'calc(70vh - 2rem)',
            aspectRatio: `${GRID_WIDTH} / ${GRID_HEIGHT}`,
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
        </div>
      </div>

      <div className="w-full flex justify-center items-stretch gap-4 flex-wrap px-[10%] p-2">
        <div className="bg-black/70 p-4 rounded-lg max-w-xs min-w-[120px] flex-1 text-sm md:text-base">
          <h3 className="font-headline text-xl font-bold mb-2">Goal</h3>
          <p>Reach the forest on the other side.</p>
          <p>Avoid being hit by vehicles.</p>
        </div>

        <div className="flex items-center justify-center flex-1 min-w-[120px]">
          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXZrZWYydThnb2l6cWdnNDY2azk5c3RpNnRndnlrNWh6MzFhczMweCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xckpvtJhGi3TpQKRrW/giphy.gif"
            alt="Nature Animation"
            className="w-32 sm:w-40 h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="bg-black/70 p-4 rounded-lg max-w-xs min-w-[120px] flex-1 text-sm md:text-base">
          <h3 className="font-headline text-xl font-bold mb-2">Movement</h3>
          <p>Arrow Keys: Move 1 space.</p>
        </div>
      </div>

      {gameState !== 'playing' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="text-center space-y-4 p-4 rounded-lg bg-black/80">
            {gameState === 'win' && (
              <h2 className="font-headline text-4xl font-bold text-green-400">You Crossed!</h2>
            )}
            {gameState === 'lose-time' && (
              <h2 className="font-headline text-4xl font-bold text-red-400">Time's Up!</h2>
            )}
            {gameState === 'lose-hit' && (
              <h2 className="font-headline text-4xl font-bold text-red-400">Squished!</h2>
            )}
            {(gameState === 'win' || gameState === 'lose-time' || gameState === 'lose-hit') && (
              <>
                <p className="text-white mb-4">Final Score: {score}</p>
                <div className="flex flex-col items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="px-2 py-1 rounded text-black"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                  />
                  <Button onClick={handleSaveScore} disabled={playerName.trim() === ''}>Save Score</Button>
                </div>
              </>
            )}
            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.reload()}>Play Again</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}