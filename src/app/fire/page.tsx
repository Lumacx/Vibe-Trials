'use client';

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import GameUI from "@/components/game/GameUI";
import GameLayout from "@/components/game/GameLayout";

import * as THREE from "three";
import { Howl } from "howler";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import { addScore } from "@/services/LeaderboardService"; // Adjust the path if necessary

const GAME_DURATION = 90;
const OBJECT_SPAWN_INTERVAL = 800;
const FREEZE_DURATION = 1500;
const OBJECT_SPEED_FACTOR = 1.25;

interface ThreeSceneProps {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setHealth: React.Dispatch<React.SetStateAction<number>>;
  gameState: 'playing' | 'gameOver';
}

// ThreeScene component (your game canvas + logic)
const ThreeScene: React.FC<ThreeSceneProps> = ({ setScore, setHealth, gameState }) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const swordRef = useRef<THREE.Mesh | null>(null);
  const groupRef = useRef(new THREE.Group());
  const animRef = useRef<number>();
  const spawnRef = useRef<NodeJS.Timeout>();
  const swordPos = useRef(new THREE.Vector3(0, 0, 0));
  const [isFrozen, setIsFrozen] = useState(false);
  const frozenRef = useRef(false);

  useEffect(() => {
    frozenRef.current = isFrozen;
  }, [isFrozen]);

  // SFX
  const gemSFX = useRef(
    ["/sfx/Gem_Cut_1.mp3", "/sfx/Gem_Cut_2.mp3", "/sfx/Gem_Cut_3.mp3"].map(
      (src) => new Howl({ src: [src], volume: 0.15 }) // ✨ Suave y cristalino
    )
  );
  
  const iceSFX = useRef(
    new Howl({ src: ["/sfx/Ice_Cube_freeze.mp3"], volume: 0.1 }) // ❄️ Ambiental y ligero
  );
  
  const boomSFX = useRef(
    new Howl({ src: ["/sfx/Explosion_boom.mp3"], volume: 0.2 }) // 💥 Impactante pero no molesto
  );
  
  const wooshSFX = useRef(
    new Howl({ src: ["/sfx/Object_Woosh_Gentle.mp3"], volume: 0.1 }) // 🌬️ Suave como brisa
  );

  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
    camera.position.z = 10;
    cameraRef.current = camera;

    const sword = new THREE.Mesh(
      new THREE.ConeGeometry(height * 0.04, height * 0.1, 32),
      new THREE.MeshStandardMaterial({ color: 0xffa500, emissive: 0xffa500, emissiveIntensity: 0.8 })
    );
    sword.rotation.z = Math.PI;
    swordRef.current = sword;
    scene.add(sword);

    scene.add(new THREE.AmbientLight(0xffffff));
    scene.add(groupRef.current);

    const speedTimer = setInterval(() => {
      setSpeedMultiplier(prev => prev * 1.01); // +1% speed per second
    }, 1000);
    
    //Particle effects functions
    const spawnFireTrail = (position: THREE.Vector3) => {
      const particle = new THREE.Mesh(
        new THREE.SphereGeometry(2, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xff4500, transparent: true, opacity: 0.8 })
      );
      particle.position.copy(position);
      sceneRef.current?.add(particle);
    
      // Animate fade out + remove
      const fade = { opacity: 0.8 };
      const fadeDuration = 300; // ms
      const start = performance.now();
    
      const fadeAnim = (time: number) => {
        const elapsed = time - start;
        fade.opacity = Math.max(0, 0.8 - (elapsed / fadeDuration) * 0.8);
        (particle.material as THREE.MeshBasicMaterial).opacity = fade.opacity;
        if (fade.opacity > 0) {
          requestAnimationFrame(fadeAnim);
        } else {
          sceneRef.current?.remove(particle);
        }
      };
      requestAnimationFrame(fadeAnim);
    };
    
    const spawnGemSpark = (position: THREE.Vector3) => {
      const spark = new THREE.Mesh(
        new THREE.SphereGeometry(4, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 })
      );
      spark.position.copy(position);
      sceneRef.current?.add(spark);
    
      // Fade out quickly
      const start = performance.now();
      const duration = 200;
    
      const animateSpark = (time: number) => {
        const elapsed = time - start;
        const opacity = Math.max(0, 1 - (elapsed / duration));
        (spark.material as THREE.MeshBasicMaterial).opacity = opacity;
        if (opacity > 0) {
          requestAnimationFrame(animateSpark);
        } else {
          sceneRef.current?.remove(spark);
        }
      };
      requestAnimationFrame(animateSpark);
    };

    const swordToIceEffect = () => {
      if (!swordRef.current) return;
      const mat = swordRef.current.material as THREE.MeshStandardMaterial;
      mat.color.set(0x00bfff);
      mat.emissive.set(0x00bfff);
    
      // Spawn ice particles at sword position
      for (let i = 0; i < 5; i++) {
        const iceParticle = new THREE.Mesh(
          new THREE.SphereGeometry(2, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0x00bfff, transparent: true, opacity: 0.8 })
        );
        iceParticle.position.copy(swordRef.current.position);
        sceneRef.current?.add(iceParticle);
    
        const targetY = iceParticle.position.y - 20 - Math.random() * 10;
        const start = performance.now();
    
        const animateIce = (time: number) => {
          const elapsed = time - start;
          iceParticle.position.y = iceParticle.position.y - 0.1;
          iceParticle.material.opacity = Math.max(0, 0.8 - elapsed / 500);
          if (iceParticle.material.opacity > 0) {
            requestAnimationFrame(animateIce);
          } else {
            sceneRef.current?.remove(iceParticle);
          }
        };
        requestAnimationFrame(animateIce);
      }
    
      // Revert color after freeze duration
      setTimeout(() => {
        mat.color.set(0xffa500);
        mat.emissive.set(0xffa500);
      }, FREEZE_DURATION);
    };
    
    const spawnExplosion = (position: THREE.Vector3) => {
      const explosion = new THREE.Mesh(
        new THREE.SphereGeometry(6, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 1 })
      );
      explosion.position.copy(position);
      sceneRef.current?.add(explosion);
    
      const start = performance.now();
      const duration = 500;
    
      const animateExplosion = (time: number) => {
        const elapsed = time - start;
        const scale = 1 + (elapsed / duration) * 2;
        explosion.scale.set(scale, scale, scale);
        explosion.material.opacity = Math.max(0, 1 - (elapsed / duration));
        if (explosion.material.opacity > 0) {
          requestAnimationFrame(animateExplosion);
        } else {
          sceneRef.current?.remove(explosion);
        }
      };
      requestAnimationFrame(animateExplosion);
    };

    const startSwordExplosionBlink = () => {
      if (!swordRef.current) return;
      const mat = swordRef.current.material as THREE.MeshStandardMaterial;
      const colors = [0xffffff, 0xffa500, 0xff0000]; // white, orange, red
      let index = 0;
      let blinkCount = 0;
      const maxBlinks = 6;
    
      const blink = () => {
        mat.color.set(colors[index % colors.length]);
        mat.emissive.set(colors[index % colors.length]);
        index++;
        blinkCount++;
        if (blinkCount < maxBlinks) {
          setTimeout(blink, 100);
        } else {
          mat.color.set(0xffa500);
          mat.emissive.set(0xffa500);
        }
      };
    
      blink();
    };
    
    const startScreenFlash = () => {
      if (!rendererRef.current) return;
      const renderer = rendererRef.current;
      const originalClearColor = new THREE.Color();
      renderer.getClearColor(originalClearColor);
      
      const colors = [0xffffff, 0xffa500, 0xff0000];
      let index = 0;
      let flashCount = 0;
      const maxFlashes = 6;
    
      const flash = () => {
        renderer.setClearColor(colors[index % colors.length]);
        index++;
        flashCount++;
        if (flashCount < maxFlashes) {
          setTimeout(flash, 100);
        } else {
          renderer.setClearColor(originalClearColor);
        }
      };
    
      flash();
    };

  //Spawning details
    const spawn = () => {
      let geometry: THREE.BufferGeometry;
      let material: THREE.MeshStandardMaterial;
      let type: 'gem' | 'ice' | 'explosive';
      const dist = 280 + Math.random() * 100;
      const rand = Math.random();

      if (rand < 0.5) {
        const s = height * 0.03;
        const shape = new THREE.Shape();
        shape.moveTo(0, s);
        shape.lineTo(s / 2, 0);
        shape.lineTo(0, -s);
        shape.lineTo(-s / 2, 0);
        shape.lineTo(0, s);
        geometry = new THREE.ShapeGeometry(shape);
        material = new THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 0x00ff00, emissiveIntensity: 0.8 });
        type = "gem";
      } else if (rand < 0.75) {
        geometry = new THREE.BoxGeometry(height * 0.04, height * 0.04, 1);
        material = new THREE.MeshStandardMaterial({ color: 0x00bfff, emissive: 0x00bfff, emissiveIntensity: 0.8 });
        type = "ice";
      } else {
        const s = height * 0.03;
        const sh = new THREE.Shape();
        sh.moveTo(0, s);
        sh.lineTo(s * 0.3, s * 0.3);
        sh.lineTo(s, 0);
        sh.lineTo(s * 0.3, -s * 0.3);
        sh.lineTo(0, -s);
        sh.lineTo(-s * 0.3, -s * 0.3);
        sh.lineTo(-s, 0);
        sh.lineTo(-s * 0.3, s * 0.3);
        sh.lineTo(0, s);
        geometry = new THREE.ShapeGeometry(sh);
        material = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 0.8 });
        type = "explosive";
      }

      const obj = new THREE.Mesh(geometry, material);
      obj.userData.type = type;
      const angle = Math.random() * Math.PI * 2;
      obj.position.set(Math.cos(angle) * dist, Math.sin(angle) * dist, 0);
      obj.userData.dir = new THREE.Vector3().subVectors(new THREE.Vector3(0, 0, 0), obj.position).normalize();
      groupRef.current.add(obj);
      wooshSFX.current.play();
    };   

    if (gameState === 'playing') spawnRef.current = setInterval(spawn, OBJECT_SPAWN_INTERVAL);

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
    
      if (gameState === 'gameOver') {
        renderer.render(scene, camera);
        return;
      }
    
      if (swordRef.current && !frozenRef.current) {
        swordRef.current.position.copy(swordPos.current);
        // Add fire trail particle
        spawnFireTrail(swordRef.current.position);
      }
    
      groupRef.current.children.forEach(obj => {
        obj.position.addScaledVector(obj.userData.dir, OBJECT_SPEED_FACTOR * speedMultiplier);

        if (swordRef.current) {
          const swordBox = new THREE.Box3().setFromObject(swordRef.current);
          const objBox = new THREE.Box3().setFromObject(obj);
          if (swordBox.intersectsBox(objBox)) {
            if (obj.userData.type === "gem") {
              setScore(prev => prev + 5);
              gemSFX.current[Math.floor(Math.random() * gemSFX.current.length)].play();
              spawnGemSpark(obj.position);
            } else if (obj.userData.type === "ice") {
              if (!isFrozen) {
                setIsFrozen(true);
                iceSFX.current.play();
                swordToIceEffect();
                setTimeout(() => setIsFrozen(false), FREEZE_DURATION);
              }
            } else if (obj.userData.type === "explosive") {
              boomSFX.current.play();
              spawnExplosion(obj.position);
              startSwordExplosionBlink();
              startScreenFlash();
              setHealth(prev => Math.max(0, prev - 1));
              swordRef.current.position.set(0, 0, 0);
            }
            groupRef.current.remove(obj);
          }
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (frozenRef.current || !container) return;
      const rect = container.getBoundingClientRect();
      const clientX = (e as MouseEvent).clientX ?? (e as TouchEvent).touches?.[0]?.clientX;
      const clientY = (e as MouseEvent).clientY ?? (e as TouchEvent).touches?.[0]?.clientY;
      if (clientX == null || clientY == null) return;

      const x = ((clientX - rect.left) / rect.width) * width - width / 2;
      const y = -((clientY - rect.top) / rect.height) * height + height / 2;
      swordPos.current.set(x, y, 0);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });

    // 🌟 CLEANUP SECTION:
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (spawnRef.current) clearInterval(spawnRef.current);
      clearInterval(speedTimer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [gameState]);

  return <div ref={canvasRef} className="w-full h-full" />;
};

//export default ThreeScene;
// FirePage component (your page layout + game)
const FirePage: React.FC = () => {
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [playerName, setPlayerName] = useState('');
  const router = useRouter(); // Import and use useRouter for navigation

  const handleSaveScore = async () => {
    if (playerName.trim()) {
      await addScore('Flame Frenzy', playerName, score);
      router.push('/'); // Navigate back to the hub
    }
  };

  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameState, setGameState] = useState<'playing' | 'gameOver'>('playing');

  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (health <= 0 && gameState === 'playing') {
      setGameState('gameOver');
    }
  }, [health, gameState]);

  /*CSS Code UI*/
  return  (
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
            <AudioPlayer src="/music/2_Arcade_Fever.mp3" volume={0.15} />
          </div>
        </div>
  
        {/* Right side group */}
        <div className="flex flex-wrap items-center justify-between gap-5 flex-1 min-w-[250px]">
          <div className="text-red-400 font-headline font-bold text-xl sm:text-2xl">
            Flame Frenzy
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
        className="relative max-w-5xl w-[80vw] rounded-lg border-4 border-accent/50 bg-black/30 backdrop-blur-sm"
        style={{ height: 'calc(60vh - 2rem)' }}
      >
        <ThreeScene setScore={setScore} setHealth={setHealth} gameState={gameState} />
      </div>
    </div>

    {/* Footer */}
    <div className="w-full flex justify-center items-stretch gap-4 flex-wrap px-[10%] p-2">
      <div className="bg-black/70 p-4 rounded-lg max-w-xs min-w-[120px] flex-1">
        <h3 className="font-headline text-xl font-bold mb-2">Goal</h3>
        <p>Cut the glowing gems to get points.</p>
        <p>Avoid the ice cubes and explosives.</p>
      </div>

      <div className="flex items-center justify-center flex-1 min-w-[120px]">
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDNvaTNua2JlOWV0ajE1M2pkd2IzM25naGNpamRta2xmbHYyN2p6eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Dt9Kt7v5r30BHtkRdx/giphy.gif"
          alt="Cutting Animation"
          className="w-32 sm:w-40 h-auto rounded-lg shadow-lg"
        />
      </div>

      <div className="bg-black/70 p-4 rounded-lg max-w-xs min-w-[120px] flex-1">
        <h3 className="font-headline text-xl font-bold mb-2">Movement</h3>
        <p>Move the cursor/finger to control the flame sword.</p>
        <p>Use arrow keys too!</p>
      </div>
    </div>

    {/* End Game Message Overlay */}
    {gameState === 'gameOver' && (
  <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-bold text-red-400 mb-4">Time's up - Save Score in Hub?</h2>
      <p className="text-white mb-4">Final Score: {score}</p>
      <div className="mb-4">
        <Input
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      <div className="flex gap-4 justify-center">
        <Button onClick={handleSaveScore}>Save Score</Button>
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
};

export default FirePage;