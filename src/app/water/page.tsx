'use client';

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

import { useRouter } from 'next/navigation'; // Add this import
import { Input } from "@/components/ui/input"; // Add this import
import { addScore } from "@/services/LeaderboardService"; // Add this import

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import GameUI from "@/components/game/GameUI";
import * as THREE from "three";
import { Howl } from "howler";

const GAME_DURATION = 90;
const GAME_AREA_WIDTH = 500;
const GAME_AREA_HEIGHT = 500;
const gridSize = 40;

// Audio
const waterBlastSound = new Howl({ src: ["/sfx/Water_Blast_hose.mp3"], volume: 0.15 });
const fireExtinguishSound = new Howl({ src: ["/sfx/Fire_Extinguish.mp3"], volume: 0.1 });
const monsterMoveSounds = [
  new Howl({ src: ["/sfx/Monster_Movement_1.mp3"], volume: 0.05 }),
  new Howl({ src: ["/sfx/Monster_Movement_2.mp3"], volume: 0.05 }),
];

const playerHitSounds = [
  new Howl({ src: ["/sfx/Player_Hit_ouch_1.mp3"], volume: 0.2 }),
  new Howl({ src: ["/sfx/Player_Hit_ouch_2.mp3"], volume: 0.2 }),
];
const houseBurningSound = new Howl({
  src: ["/sfx/House_Burning.mp3"],
  loop: true,
  volume: 0.05, // Más suave para sonido de fondo
});

const gameOverSound = new Howl({ src: ["/sfx/Game_Over_Despair.mp3"], volume: 0.15 });

export default function HydroHeroesPage() {
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameState, setGameState] = useState<"playing" | "gameOver">("playing");

  const [playerName, setPlayerName] = useState(''); // Add this state

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<THREE.Mesh | null>(null);
  const monsterRef = useRef<THREE.Mesh | null>(null);
  const houseRefs = useRef<THREE.Mesh[]>([]);
  const waterBlastsRef = useRef<THREE.Mesh[]>([]);
  const particleSystemsRef = useRef<THREE.Points[]>([]);
  const invincibleRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  const router = useRouter(); // Initialize useRouter

  const handleSaveScore = async () => { // Add this function
    if (playerName.trim()) {
      await addScore('Hydro Heroes', playerName, score);
      router.push('/'); // Navigate back to the hub
    }
  };

  const playerDirectionRef = useRef<'up' | 'down' | 'left' | 'right'>('up');
  const monsterSpeedRef = useRef(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0 || health <= 0) {
      setGameState("gameOver");
      gameOverSound.play();
    }
  }, [timeLeft, health]);

  useEffect(() => {
    const speedTimer = setInterval(() => {
      monsterSpeedRef.current += 0.5;
    }, 30000);
    return () => clearInterval(speedTimer);
  }, []);

  useEffect(() => {
    const monsterInterval = setInterval(() => {
      if (sceneRef.current) {
        spawnMonster(sceneRef.current);
      }
    }, 10000); // 10 seconds
  
    return () => clearInterval(monsterInterval);
  }, []);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(
      -GAME_AREA_WIDTH / 2, GAME_AREA_WIDTH / 2,
      GAME_AREA_HEIGHT / 2, -GAME_AREA_HEIGHT / 2, 1, 1000
    );
    camera.position.z = 10;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Player
    const starShape = createStarShape(15, 6, 5);
    const player = new THREE.Mesh(new THREE.ShapeGeometry(starShape),
      new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide }));
    player.position.set(0, -150, 0);
    scene.add(player);
    playerRef.current = player;

    // Monster
    spawnMonster(scene);

    // Houses
    const houseGeom = new THREE.BoxGeometry(45, 45, 10);
    const burningMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const wallMat = new THREE.MeshBasicMaterial({ color: 0xbbbbbb });

    houseRefs.current = [];
    const placed: THREE.Vector3[] = [];
    for (let i = 0; i < 3; i++) {
      const pos = generateValidHousePosition(placed);
      const house = new THREE.Mesh(houseGeom, burningMat.clone());
      house.position.copy(pos);
      house.userData.isBurning = true;
      scene.add(house);
      houseRefs.current.push(house);
      placed.push(pos);
      addFireParticles(pos, scene);
    }
    [[-180, -180], [180, -180], [-80, -200], [80, -200], [-120, 200], [120, 200]].forEach(([x, y]) => {
      const wall = new THREE.Mesh(houseGeom, wallMat.clone());
      wall.position.set(x, y, 0);
      scene.add(wall);
      houseRefs.current.push(wall);
    });
    houseBurningSound.play();

    // Input
    const keyHandler = (e: KeyboardEvent) => {
      if (!playerRef.current || gameState !== "playing") return;
      const pos = playerRef.current.position.clone();
      let nextPos = pos.clone();

      if (e.key === "ArrowUp") { nextPos.y += gridSize; playerDirectionRef.current = 'up'; }
      if (e.key === "ArrowDown") { nextPos.y -= gridSize; playerDirectionRef.current = 'down'; }
      if (e.key === "ArrowLeft") { nextPos.x -= gridSize; playerDirectionRef.current = 'left'; }
      if (e.key === "ArrowRight") { nextPos.x += gridSize; playerDirectionRef.current = 'right'; }

      const playerBox = new THREE.Box3().setFromCenterAndSize(nextPos, new THREE.Vector3(30, 30, 30));
      const collision = houseRefs.current.some(h => new THREE.Box3().setFromObject(h).intersectsBox(playerBox));
      if (!collision) playerRef.current.position.copy(nextPos);

      if (e.key === " " || e.key === "z") {
        waterBlastSound.play();
        shootWaterBlast(scene);
      }
    };
    window.addEventListener("keydown", keyHandler);

   // Animation
   const animate = () => {
    if (renderer && camera && playerRef.current) {
      // Move monster toward player
      if (monsterRef.current) {
        const dir = new THREE.Vector3()
          .subVectors(playerRef.current.position, monsterRef.current.position)
          .normalize()
          .multiplyScalar(monsterSpeedRef.current);
        monsterRef.current.position.add(dir);
      }
  
      // Check water blast collisions
      waterBlastsRef.current.forEach(blast => {
        const bBox = new THREE.Box3().setFromObject(blast);
  
        // Check burning houses
        houseRefs.current.forEach(h => {
          if (h.userData.isBurning) {
            const hBox = new THREE.Box3().setFromObject(h);
            if (bBox.intersectsBox(hBox)) {
              (h.material as THREE.MeshBasicMaterial).color.set(0x888888); // Extinguished color
              h.userData.isBurning = false;
              setScore(prev => prev + 100);
              fireExtinguishSound.play();
            }
          }
        });
  
        // Check monster hit
        if (monsterRef.current) {
          const mBox = new THREE.Box3().setFromObject(monsterRef.current);
          if (bBox.intersectsBox(mBox)) {
            sceneRef.current?.remove(monsterRef.current);
            monsterRef.current = null;
            setScore(prev => prev + 200);
            fireExtinguishSound.play();
          }
        }
      });
  
      // Check player-monster collision
      if (monsterRef.current) {
        const pBox = new THREE.Box3().setFromObject(playerRef.current);
        const mBox = new THREE.Box3().setFromObject(monsterRef.current);
  
        if (pBox.intersectsBox(mBox) && !invincibleRef.current) {
          playerHitSounds[Math.floor(Math.random() * playerHitSounds.length)].play();
          setHealth(prev => Math.max(0, prev - 25));
          invincibleRef.current = true;
          (playerRef.current.material as THREE.MeshBasicMaterial).color.set(0xff0000);
          setTimeout(() => {
            (playerRef.current!.material as THREE.MeshBasicMaterial).color.set(0x00ffff);
            invincibleRef.current = false;
          }, 1000);
        }
  
        // Check monster burning houses
        houseRefs.current.forEach(h => {
          if (!h.userData.isBurning) {
            const hBox = new THREE.Box3().setFromObject(h);
            if (mBox.intersectsBox(hBox)) {
              (h.material as THREE.MeshBasicMaterial).color.set(0xff0000);
              h.userData.isBurning = true;
              addFireParticles(h.position, sceneRef.current!);
            }
          }
        });
      }
  
      renderer.render(scene, camera);
    }
  
    animFrameRef.current = requestAnimationFrame(animate);
  };
  
  animate();

  return () => {
    window.removeEventListener("keydown", keyHandler);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    houseBurningSound.stop();
    renderer.dispose();
    container.removeChild(renderer.domElement);
  };
}, [gameState]);

  return (
    /*Header*/
    <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-blue-900">
      <div className="w-full px-[10%] p-2 mb-2 flex flex-wrap gap-6 justify-between">
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
        <div className="flex flex-wrap items-center justify-between gap-5 flex-1 min-w-[250px]">
          <div className="text-cyan-400 font-headline font-bold text-xl sm:text-2xl">
            Hydro Heroes
          </div>
          <div
            className="flex-shrink-0"
            style={{ transform: "scale(0.8)", transformOrigin: "right center" }}
          >
            <GameUI score={score} time={timeLeft} health={health} />
          </div>
        </div>
      </div>
      
      {/* GameArea */}
      <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">
        <div
          ref={canvasRef}
          className="relative w-full max-w-5xl rounded-lg border-4 border-accent/50 bg-black/30 backdrop-blur-sm"
          style={{ height: "calc(60vh - 2rem)" }}
        ></div>
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

    {gameState === "gameOver" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"> {/* Add background and padding */}
              <h2 className="font-headline text-4xl font-bold text-red-400 mb-4"> {/* Add margin-bottom */}
                Game Over!
              </h2>
              <p className="text-white mb-4">Final Score: {score}</p>
              <div className="mb-4"> {/* Add margin-bottom */}
                <Input
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                />
              </div>
              <div className="flex gap-4 justify-center"> {/* Add flex and gap */}
                <Button onClick={handleSaveScore}>Save Score</Button> {/* Add Save Score Button */}
                <Button onClick={() => window.location.reload()}>
                  Play Again
                </Button>
                 {/* Optional: Add Back to Hub button like in other games */}
                 {/* <Link href="/" passHref><Button variant="secondary">Back to Hub</Button></Link> */}
              </div>
            </div>
          </div>
        )}
    </div>
  );

  function createStarShape(outer: number, inner: number, points: number) {
    const shape = new THREE.Shape();
    shape.moveTo(outer, 0);
    for (let i = 0; i < points; i++) {
      const outerA = (Math.PI / points) * (2 * i);
      const innerA = (Math.PI / points) * (2 * i + 1);
      shape.lineTo(outer * Math.cos(outerA), outer * Math.sin(outerA));
      shape.lineTo(inner * Math.cos(innerA), inner * Math.sin(innerA));
    }
    shape.closePath();
    return shape;
  }

  function shootWaterBlast(scene: THREE.Scene) {
    const positions: THREE.Vector3[] = [];
    const p = playerRef.current!.position.clone();
  
    switch (playerDirectionRef.current) {
      case 'up':
        positions.push(new THREE.Vector3(p.x, p.y + gridSize, 0));
        positions.push(new THREE.Vector3(p.x, p.y + gridSize * 2, 0));
        break;
      case 'down':
        positions.push(new THREE.Vector3(p.x, p.y - gridSize, 0));
        positions.push(new THREE.Vector3(p.x, p.y - gridSize * 2, 0));
        break;
      case 'left':
        positions.push(new THREE.Vector3(p.x - gridSize, p.y, 0));
        positions.push(new THREE.Vector3(p.x - gridSize * 2, p.y, 0));
        break;
      case 'right':
        positions.push(new THREE.Vector3(p.x + gridSize, p.y, 0));
        positions.push(new THREE.Vector3(p.x + gridSize * 2, p.y, 0));
        break;
    }
  
    positions.forEach(pos => {
      const blast = new THREE.Mesh(
        new THREE.ConeGeometry(10, 30, 8),
        new THREE.MeshBasicMaterial({ color: 0x0000aa, opacity: 0.7, transparent: true }) // Darker blue
      );
      blast.position.copy(pos);
      scene.add(blast);
      waterBlastsRef.current.push(blast);
      setTimeout(() => {
        scene.remove(blast);
        waterBlastsRef.current = waterBlastsRef.current.filter(b => b !== blast);
      }, 300);
    });
  }

  function spawnMonster(scene: THREE.Scene) {
    const monster = new THREE.Mesh(
      new THREE.ConeGeometry(18, 36, 16),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    monster.position.set(0, GAME_AREA_HEIGHT / 2 - gridSize * 2, 0);
    scene.add(monster);
    monsterRef.current = monster;
  }

  function addFireParticles(pos: THREE.Vector3, scene: THREE.Scene) {
    const geom = new THREE.BufferGeometry();
    const verts = new Float32Array(300).map(() => (Math.random() - 0.5) * 20);
    geom.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    const pts = new THREE.Points(geom, new THREE.PointsMaterial({ color: 0xff6600, size: 2 }));
    pts.position.copy(pos);
    scene.add(pts);
    particleSystemsRef.current.push(pts);
  }

  function generateValidHousePosition(existing: THREE.Vector3[]): THREE.Vector3 {
    let valid = false;
    let newPos = new THREE.Vector3(0, 0, 0);
    while (!valid) {
      newPos.set(
        Math.round((Math.random() - 0.5) * (GAME_AREA_WIDTH - gridSize * 4) / gridSize) * gridSize,
        Math.round((Math.random() - 0.5) * (GAME_AREA_HEIGHT - gridSize * 4) / gridSize) * gridSize,
        0
      );
      valid = existing.every(pos => pos.distanceTo(newPos) >= gridSize * 2);
      if (
        Math.abs(newPos.x) > GAME_AREA_WIDTH / 2 - gridSize * 2 ||
        Math.abs(newPos.y) > GAME_AREA_HEIGHT / 2 - gridSize * 2
      ) {
        valid = false;
      }
    }
    return newPos;
  }
}
