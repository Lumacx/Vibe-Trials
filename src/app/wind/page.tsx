"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@vibe-components/ui/button";
import { GameUI } from "@vibe-components/game/GameUI";
import AudioPlayer from "@vibe-components/AudioPlayer";
import { ArrowLeft } from 'lucide-react';
import * as THREE from 'three';
import { Howl } from 'howler';

import GameLayout from '@vibe-components/game/GameLayout';

const GAME_DURATION = 90; // seconds
const PLAYER_SPEED = 10; // Adjusted speed for better feel
const PROJECTILE_SPEED = 5;
const ENEMY_SPEED = 0.2;
const ENEMY_SPAWN_INTERVAL = 1000; // milliseconds
const PLAYER_SHOT_COOLDOWN = 300; // milliseconds

export default function SkyGuardianPage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameState, setGameState] = useState<'playing' | 'gameOver'>('playing');
  const [playerLives, setPlayerLives] = useState(1); // One-hit death as per GDD

  const threeCanvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const playerRef = useRef<THREE.Mesh | null>(null);
  const enemyGroupRef = useRef<THREE.Group>(new THREE.Group());
  const projectileGroupRef = useRef<THREE.Group>(new THREE.Group());

  const playerShotSound = useRef<Howl | null>(null);
  const enemyExplosionSound = useRef<Howl | null>(null);
  const enemyProjectileSound = useRef<Howl | null>(null);
  const gameOverSound = useRef<Howl | null>(null);

  const lastShotTime = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const enemySpawnIntervalId = useRef<NodeJS.Timeout | null>(null);

  // Timer Effect
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setGameState('gameOver');
          gameOverSound.current?.play();
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Game Over Effect (based on lives)
  useEffect(() => {
    if (playerLives <= 0 && gameState === 'playing') {
      setGameState('gameOver');
      gameOverSound.current?.play();
    }
  }, [playerLives, gameState]);

  // Sound Initialization Effect
  useEffect(() => {
    if (typeof Howl === 'undefined') return;

    playerShotSound.current = new Howl({ src: ['/sfx/Player_Shot_whoosh-1.mp3'], volume: 0.2 });
    enemyExplosionSound.current = new Howl({ src: ['/sfx/Enemy_Explosion_1.mp3'], volume: 0.3 });
    enemyProjectileSound.current = new Howl({ src: ['/sfx/Enemy_Projectile_1.mp3'], volume: 0.2 }); // Optional/Placeholder
    gameOverSound.current = new Howl({ src: ['/sfx/Game_Over_Dramatic-1.mp3'], volume: 0.5 });

    // Cleanup sound on unmount
    return () => {
      playerShotSound.current?.unload();
      enemyExplosionSound.current?.unload();
      enemyProjectileSound.current?.unload();
      gameOverSound.current?.unload();
    };
  }, []);

  // Three.js Setup and Game Loop Effect
useEffect(() => {
  const canvas = threeCanvasRef.current;
  if (!canvas) return;

  const setupThreeJS = () => {
    if (rendererRef.current) {
      if (canvas.contains(rendererRef.current.domElement)) {
        canvas.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current.dispose();
    }

    if (sceneRef.current) {
      sceneRef.current.clear();
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    sceneRef.current = new THREE.Scene();
    sceneRef.current.background = new THREE.Color(0x112244);

    cameraRef.current = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );
    cameraRef.current.position.z = 10;

    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current.setSize(width, height);
    canvas.appendChild(rendererRef.current.domElement);

    // ✅ Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 0, 1);
    sceneRef.current.add(directionalLight);

    // ✅ Player Ship
    const playerGeometry = new THREE.ConeGeometry(15, 40, 32);
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    playerRef.current = new THREE.Mesh(playerGeometry, playerMaterial);
    playerRef.current.position.set(0, height / -2 + 60, 0);
    sceneRef.current.add(playerRef.current);

    // ✅ Enemy and Projectile Groups
    enemyGroupRef.current = new THREE.Group();
    projectileGroupRef.current = new THREE.Group();
    sceneRef.current.add(enemyGroupRef.current);
    sceneRef.current.add(projectileGroupRef.current);
  };

  setupThreeJS();

  const animate = () => {
    animationFrameId.current = requestAnimationFrame(animate);

    if (gameState === 'playing') {
      updateProjectiles();
      updateEnemies();
      checkCollisions();
    }

    rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
  };

  const updateProjectiles = () => {
    const projectiles: THREE.Mesh[] = projectileGroupRef.current.children as THREE.Mesh[];
    const height = canvas.clientHeight;
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const projectile = projectiles[i];
      if (projectile.userData.isPlayer) {
        projectile.position.y += PROJECTILE_SPEED;
        if (projectile.position.y > height / 2 + 20) {
          projectileGroupRef.current.remove(projectile);
        }
      } else {
        projectile.position.y -= PROJECTILE_SPEED * 0.5;
        if (projectile.position.y < height / -2 - 20) {
          projectileGroupRef.current.remove(projectile);
        }
      }
    }
  };

  const updateEnemies = () => {
    const enemies: THREE.Mesh[] = enemyGroupRef.current.children as THREE.Mesh[];
    const height = canvas.clientHeight;
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      enemy.position.y -= ENEMY_SPEED;
      if (enemy.position.y < height / -2 - 20) {
        enemyGroupRef.current.remove(enemy);
        setPlayerLives(prevLives => prevLives - 1);
      }
    }
  };

  const checkCollisions = () => {
    if (!playerRef.current || gameState !== 'playing') return;

    const playerBoundingBox = new THREE.Box3().setFromObject(playerRef.current);
    const enemies: THREE.Mesh[] = enemyGroupRef.current.children as THREE.Mesh[];
    const projectiles: THREE.Mesh[] = projectileGroupRef.current.children as THREE.Mesh[];

    for (let i = projectiles.length - 1; i >= 0; i--) {
      const projectile = projectiles[i];
      if (!projectile.userData.isPlayer) continue;

      const projectileBoundingBox = new THREE.Box3().setFromObject(projectile);

      for (let j = enemies.length - 1; j >= 0; j--) {
        const enemy = enemies[j];
        const enemyBoundingBox = new THREE.Box3().setFromObject(enemy);

        if (projectileBoundingBox.intersectsBox(enemyBoundingBox)) {
          projectileGroupRef.current.remove(projectile);
          enemyGroupRef.current.remove(enemy);
          setScore(prevScore => prevScore + 100);
          enemyExplosionSound.current?.play();
          break;
        }
      }
    }

    for (let j = enemies.length - 1; j >= 0; j--) {
      const enemy = enemies[j];
      const enemyBoundingBox = new THREE.Box3().setFromObject(enemy);
      if (playerBoundingBox.intersectsBox(enemyBoundingBox)) {
        enemyGroupRef.current.remove(enemy);
        setPlayerLives(0);
        break;
      }
    }
  };

  const spawnEnemy = () => {
    if (!sceneRef.current || gameState !== 'playing') return;
    const width = canvas.clientWidth;

    const enemyGeometry = new THREE.SphereGeometry(20, 16, 16);
    const enemyMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
    const randomX = (Math.random() - 0.5) * (width - 80);
    enemy.position.set(randomX, canvas.clientHeight / 2 + 40, 0);
    enemyGroupRef.current.add(enemy);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (gameState !== 'playing' || !playerRef.current) return;

    const width = canvas.clientWidth;
    const bounds = width / 2 - 40;

    if (event.key === 'ArrowLeft' || event.key === 'a') {
      playerRef.current.position.x -= PLAYER_SPEED;
      if (playerRef.current.position.x < -bounds) playerRef.current.position.x = -bounds;
    } else if (event.key === 'ArrowRight' || event.key === 'd') {
      playerRef.current.position.x += PLAYER_SPEED;
      if (playerRef.current.position.x > bounds) playerRef.current.position.x = bounds;
    } else if ((event.key === ' ' || event.key === 'z') && (Date.now() - lastShotTime.current > PLAYER_SHOT_COOLDOWN)) {
      shootProjectile();
      lastShotTime.current = Date.now();
    }
  };

  const shootProjectile = () => {
    if (!playerRef.current || !projectileGroupRef.current) return;

    const projectileGeometry = new THREE.CylinderGeometry(3, 3, 30, 8);
    const projectileMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const projectile = new THREE.Mesh(projectileGeometry, projectileMaterial);
    projectile.position.copy(playerRef.current.position);
    projectile.position.y += 35;
    projectile.userData.isPlayer = true;
    projectileGroupRef.current.add(projectile);
    playerShotSound.current?.play();
  };

  const handleResize = () => {
    if (!cameraRef.current || !rendererRef.current) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    cameraRef.current.left = width / -2;
    cameraRef.current.right = width / 2;
    cameraRef.current.top = height / 2;
    cameraRef.current.bottom = height / -2;
    cameraRef.current.updateProjectionMatrix();

    rendererRef.current.setSize(width, height);

    if (playerRef.current) {
      const bounds = width / 2 - 40;
      playerRef.current.position.x = Math.max(-bounds, Math.min(bounds, playerRef.current.position.x));
      playerRef.current.position.y = height / -2 + 60;
    }
  };

  // Event listeners and animation start
  window.addEventListener('keydown', handleKeyDown);
  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(canvas);

  enemySpawnIntervalId.current = setInterval(spawnEnemy, ENEMY_SPAWN_INTERVAL);
  animate();

  return () => {
    if (enemySpawnIntervalId.current) clearInterval(enemySpawnIntervalId.current);
    window.removeEventListener('keydown', handleKeyDown);
    resizeObserver.disconnect();
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);

    sceneRef.current?.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (object.material instanceof THREE.Material) object.material.dispose();
        else if (Array.isArray(object.material)) object.material.forEach(mat => mat.dispose());
      }
    });
    sceneRef.current?.clear();

    if (rendererRef.current) {
      rendererRef.current.dispose();
      if (canvas.contains(rendererRef.current.domElement)) {
        canvas.removeChild(rendererRef.current.domElement);
      }
    }
  };
}, [gameState]);

/*CSS Code*/
//<div className="relative h-screen w-screen overflow-hidden bg-sky-900">
//<div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/333344/a020f0.png?text=Sky+Background')] bg-cover bg-center" data-ai-hint="sky clouds"></div>
//<div className="absolute inset-0 bg-black/20"></div>

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
      <AudioPlayer src="/music/4_Neon_Horizons.mp3" volume={0.15} />
    </div>
  </div>

  {/* Right side group */}
  <div className="flex flex-wrap items-center justify-between gap-5 flex-1 min-w-[250px]">
    <div className="text-cyan-300 font-headline font-bold text-xl sm:text-2xl">
      Sky Guardian
    </div>
    <div
      className="flex-shrink-0"
      style={{ transform: 'scale(0.8)', transformOrigin: 'right center' }}
    >
      <GameUI score={score} time={timeLeft} lives={playerLives} />
    </div>
  </div>
</div>
 {/* Game Area */}
 <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 relative z-10">
    <div
      ref={threeCanvasRef}
      className="relative rounded-lg border-4 border-accent/50 bg-black/30 backdrop-blur-sm"
      style={{ width: '80vw', height: 'calc(70vh - 2rem)', marginTop: 0, marginLeft: 'auto', marginRight: 'auto' }}
    >
      {/* Three.js canvas goes here */}
    </div>
  </div>

  {/* Footer */}
  <div className="w-full flex justify-center items-stretch gap-4 flex-wrap px-[10%] p-2 relative z-10">
    <div className="bg-black/70 p-4 rounded-lg max-w-xs min-w-[120px] flex-1">
      <h3 className="font-headline text-xl font-bold mb-2">Goal</h3>
      <p>Destroy incoming alien enemies.</p>
      <p>Survive as long as possible.</p>
    </div>

    <div className="flex items-center justify-center flex-1 min-w-[120px]">
      <img
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXF1czhzM2djMXpyYnVyaW1tejVwMzljbDY3ZGtwOXM1b3B3enljMyZlcD12MV9pbnRlcm5hbF9naWZfYnl_idmcat=g/3IcEq6Cq9R9ErPoZIK/giphy.gif"
        alt="Wind Animation"
        className="w-32 sm:w-40 h-auto rounded-lg shadow-lg"
      />
    </div>

    <div className="bg-black/70 p-4 rounded-lg max-w-xs min-w-[120px] flex-1">
      <h3 className="font-headline text-xl font-bold mb-2">Movement</h3>
      <p>Arrow Keys / A / D: Move left/right.</p>
      <p>Spacebar / Z: Shoot.</p>
    </div>
  </div>

      {/* Game Over Message */}
      {gameState === 'gameOver' && (
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
    )}
    </>
  );
}
