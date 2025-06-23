'use client';

import { useState, useEffect, useRef } from "react";
import { Howl } from 'howler';
import AudioPlayer from "@vibe-components/AudioPlayer";
import Link from "next/link";
import { Button } from "@vibe-components/ui/button";
import { GameUI } from "@vibe-components/game/GameUI";
import { ArrowLeft } from "lucide-react";
import * as THREE from 'three';


import GameLayout from '@vibe-components/game/GameLayout';

// Define grid dimensions and tile size
const GRID_WIDTH = 16;

const TILE_SIZE = 1;
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

const PLAYER_START_GRID_X = Math.floor(GRID_WIDTH / 2);
const PLAYER_START_POSITION = { x: PLAYER_START_GRID_X, y: GRID_HEIGHT - 1 };

const LANE_GRID_YS = gameGrid.map((row, index) => row[0] === GRID_TYPE.LANE ? index : -1).filter(index => index !== -1);

export default function ForestCrossingPage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [playerPosition, setPlayerPosition] = useState(PLAYER_START_POSITION);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const gameCanvasRef = useRef<HTMLDivElement>(null);
  const threeCanvasRef = useRef<HTMLCanvasElement>(null);

  const playerRef = useRef<THREE.Mesh | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const lastSpawnTimeRef = useRef(0);

  // Sound effects
  const playerHopSound = useRef<Howl | null>(null);
  const vehiclePassSound = useRef<Howl | null>(null);
  const playerHitSound = useRef<Howl | null>(null);
  const laneCrossedSound = useRef<Howl | null>(null);
  const forestReachedSound = useRef<Howl | null>(null);
  const gameOverSound = useRef<Howl | null>(null);

  useEffect(() => {
    if (typeof Howl === 'undefined') return;
    playerHopSound.current = new Howl({ src: ['/sfx/Frog_Hop.mp3'], volume: 0.25 });
    vehiclePassSound.current = new Howl({ src: ['/sfx/Vehicle_Pass_1.mp3', '/sfx/Vehicle_Pass_2.mp3', '/sfx/Vehicle_Pass_3.mp3'], volume: 0.1 });
    playerHitSound.current = new Howl({ src: ['/sfx/Frog_splat_1.mp3', '/sfx/Frog_splat_2.mp3', '/sfx/Frog_splat_3.mp3', '/sfx/Frog_splat_4.mp3'], volume: 0.5 });
    laneCrossedSound.current = new Howl({ src: ['/sfx/Lane_Crossed_chime.mp3'], volume: 0.2 });
    forestReachedSound.current = new Howl({ src: ['/sfx/Forest_Victory1.mp3', '/sfx/Forest_Victory2.mp3', '/sfx/Forest_Victory3.mp3'], volume: 0.3 });
    gameOverSound.current = new Howl({ src: ['/sfx/Game_Over_Defeated.mp3'], volume: 0.25 });
  }, []);

  const renderEnvironment = (grid: number[][]) => {
 console.log("renderEnvironment called");
 console.log("GRID_WIDTH:", GRID_WIDTH);
 console.log("GRID_HEIGHT:", GRID_HEIGHT);
    if (!sceneRef.current) return;

    sceneRef.current.children = sceneRef.current.children.filter(
      obj => !(obj.userData && obj.userData.type === 'environment-tile')
    );

    const tileGeometry = new THREE.BoxGeometry(TILE_SIZE, 0.1, TILE_SIZE);

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
        } else { // GRID_TYPE.GROUND or other
           material = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.8 });
           if (value === GRID_TYPE.START) {
             material = new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.7 });
           }
        }
        const tile = new THREE.Mesh(tileGeometry, material);

        tile.position.set(
          (x - GRID_WIDTH / 2 + 0.5) * TILE_SIZE,
          0,
          (y - GRID_HEIGHT / 2 + 0.5) * TILE_SIZE
        );
        tile.userData.type = 'environment-tile';
        sceneRef.current.add(tile);
      }
    }
  };

  useEffect(() => {
    const canvasContainer = gameCanvasRef.current;
    if (!canvasContainer) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(gameCanvasRef.current.clientWidth, gameCanvasRef.current.clientHeight);
    gameCanvasRef.current.appendChild(renderer.domElement);
    //threeCanvasRef.current = renderer.domElement;

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    renderEnvironment(gameGrid);

    const playerGeometry = new THREE.BoxGeometry(TILE_SIZE * 0.8, TILE_SIZE * 0.8, TILE_SIZE * 0.8);
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const player = new THREE.Mesh(playerGeometry, playerMaterial);

     player.position.set(
      (playerPosition.x - GRID_WIDTH / 2 + 0.5) * TILE_SIZE,
      TILE_SIZE / 2,
      (playerPosition.y - GRID_HEIGHT / 2 + 0.5) * TILE_SIZE
     );

    scene.add(player);
    playerRef.current = player;

    const ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    camera.position.set(0, GRID_HEIGHT * TILE_SIZE, 0);
    camera.lookAt(0, 0, 0);


    let lastTime = 0;
    const animate = (currentTime: number) => {
      if (gameState !== 'playing') {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        return;
      }

      requestAnimationFrame(animate);

      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setVehicles(prevVehicles => prevVehicles.filter(v => v.mesh !== null));

      const vehicleMeshes = vehicles.map(v => v.mesh).filter(mesh => mesh !== null);
      if (playerRef.current) {
        const playerBox = new THREE.Box3().setFromObject(playerRef.current);

        for (const vehicle of vehicles) {
          if (!vehicle.mesh) continue;
          const vehicleBox = new THREE.Box3().setFromObject(vehicle.mesh);
          if (playerBox.intersectsBox(vehicleBox)) {
            if (gameState === 'playing') {
              playerHitSound.current?.play();
              setGameState('lose-hit');
            }
            break;
          }
        }
      }

      if (currentTime - lastSpawnTimeRef.current > 1500) { // Adjust spawn rate
         spawnVehicle();
         lastSpawnTimeRef.current = currentTime;
      }

      const updatedVehicles: Vehicle[] = [];
      vehicles.filter(v => v.mesh !== null).forEach(vehicle => {
        vehicle.gridX += vehicle.speed * deltaTime;

        vehicle.mesh.position.x = (vehicle.gridX - GRID_WIDTH / 2 + 0.5) * TILE_SIZE;

        if ((vehicle.speed > 0 && vehicle.gridX > GRID_WIDTH) || (vehicle.speed < 0 && vehicle.gridX < -1.5 * GRID_WIDTH)) {
           scene.remove(vehicle.mesh);
           vehicle.mesh.geometry?.dispose();
           (vehicle.mesh.material as THREE.Material).dispose();
        } else {
           updatedVehicles.push(vehicle);
        }
      });
       setVehicles(updatedVehicles);

      renderer.render(scene, camera);
    };
    animate(0);

    const handleResize = () => {
      if (rendererRef.current && cameraRef.current && gameCanvasRef.current) {
        const width = gameCanvasRef.current.clientWidth;
        const height = gameCanvasRef.current.clientHeight;
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
        handleResize();
    });

    if (gameCanvasRef.current) {
        resizeObserver.observe(gameCanvasRef.current);
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
       if (threeCanvasRef.current && threeCanvasRef.current.parentNode) {
          threeCanvasRef.current.parentNode.removeChild(threeCanvasRef.current);
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
          if (gameState === 'playing') {
            gameOverSound.current?.play();
            setGameState('lose-time');
            clearInterval(timer);
            return 0;
          }
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (!gameCanvasRef.current) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState !== 'playing') return;

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
        setPlayerPosition(newPosition);
        playerHopSound.current?.play();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, [playerPosition, gameState]);

  useEffect(() => {
     if (gameState !== 'playing') return;

     const currentRowType = gameGrid[playerPosition.y][playerPosition.x];

     if (currentRowType === GRID_TYPE.FOREST && gameState === 'playing') {
       forestReachedSound.current?.play();
       setGameState('win');
     }
  }, [playerPosition, gameState]);

  const spawnVehicle = () => {
    if (gameState !== 'playing' || !sceneRef.current) return;

    const randomLaneIndex = Math.floor(Math.random() * LANE_GRID_YS.length);
    const laneGridY = LANE_GRID_YS[randomLaneIndex];

    const direction = randomLaneIndex % 2 === 0 ? 1 : -1;
    const startGridX = direction === 1 ? -2 : GRID_WIDTH + 1; // Start further off-screen

    const speed = (direction === 1 ? 1 : -1) * (Math.random() * 2 + 1);
    const type = Math.random() > 0.5 ? 'car' : 'motorcycle';

    let vehicleGeometry;
    let vehicleMaterial;

    if (type === 'car') {
        vehicleGeometry = new THREE.BoxGeometry(TILE_SIZE * 1.8, TILE_SIZE * 0.8, TILE_SIZE * 0.8);
        vehicleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red for cars
    } else { // motorcycle
        vehicleGeometry = new THREE.BoxGeometry(TILE_SIZE * 1.2, TILE_SIZE * 0.8, TILE_SIZE * 0.8);
        vehicleMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // Blue for motorcycles
    }

    const vehicleMesh = new THREE.Mesh(vehicleGeometry, vehicleMaterial);

    vehicleMesh.position.set(
      (startGridX - GRID_WIDTH / 2 + 0.5) * TILE_SIZE, // x
      TILE_SIZE / 2,                                  // y (altura)
      (laneGridY - GRID_HEIGHT / 2 + 0.5) * TILE_SIZE  // z (profundidad)
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

    setVehicles(prevVehicles => [...prevVehicles, newVehicle]);
  };

  useEffect(() => {
    if (gameState === 'lose-time' || gameState === 'lose-hit' || gameState === 'win') {
      console.log("Game Over/Win State:", gameState);
    }
  }, [gameState]);


  return (
    <>
      <GameLayout
        header={
          <div className="flex w-full justify-between items-center h-full">
            <div className="flex items-center justify-start w-1/3">
              <Link href="/" passHref>
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Hub
                </Button>
              </Link>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2">
              <AudioPlayer src="/music/6_Pixel_Groove_Adventure.mp3" volume={0.25} />
            </div>

            <div className="flex items-center justify-end w-1/3">
              <GameUI score={score} time={timeLeft} lives={1} />
            </div>
          </div>
        }

        gameArea={
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="font-headline text-4xl sm:text-6xl font-bold text-primary drop-shadow-lg mb-6">
              Forest Crossing
            </h1>
            <div
              ref={gameCanvasRef}
              className="relative w-full max-w-screen-lg rounded-lg border-4 border-accent/50 bg-black/30 backdrop-blur-sm"
              style={{ height: 'calc(70vh - 2rem)', aspectRatio: `${GRID_WIDTH} / ${GRID_HEIGHT}` }}
            >
              <canvas ref={threeCanvasRef} className="w-full h-full block" />
            </div>
          </div>
        }

        bottomSection={
          <div className="flex flex-wrap w-full justify-around items-center gap-4 md:gap-0">
            <div className="bg-black/70 p-4 rounded-lg max-w-xs text-sm md:text-base">
              <h3 className="font-headline text-xl font-bold mb-2">Goal</h3>
              <p>Reach the forest on the other side.</p>
              <p>Avoid being hit by vehicles.</p>
            </div>

            <div className="flex items-center justify-center flex-grow mx-0 md:mx-4 my-4 md:my-0">
              <img
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXZrZWYydThnb2l6cWdnNDY2azk5c3RpNnRndnlrNWh6MzFhczMweCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xckpvtJhGi3TpQKRrW/giphy.gif"
                alt="Nature Animation"
                className="w-32 h-auto rounded-lg shadow-lg md:w-40"
              />
            </div>

            <div className="bg-black/70 p-4 rounded-lg max-w-xs text-sm md:text-base">
              <h3 className="font-headline text-xl font-bold mb-2">Movement</h3>
              <p>Arrow Keys: Move 1 space.</p>
            </div>
          </div>
        }
      />
     

{gameState !== 'playing' && (
  <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
    <div className="text-center">
      {gameState === 'win' && (
        <h2 className="font-headline text-4xl font-bold text-green-400">You Crossed!</h2>
      )}
      {gameState === 'lose-time' && (
        <h2 className="font-headline text-4xl font-bold text-red-400">Time's Up!</h2>
      )}
      {gameState === 'lose-hit' && (
        <h2 className="font-headline text-4xl font-bold text-red-400">Squished!</h2>
      )}
      <Button onClick={() => window.location.reload()} className="mt-4">
        Play Again
      </Button>
      <Link href="/" passHref>
        <Button variant="outline" className="mt-4 ml-4">
          Back to Hub
        </Button>
      </Link>
    </div>
  </div>
)}
</>
);
}
