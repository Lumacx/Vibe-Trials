'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Mesh } from 'three';

interface StarPlayerProps {
  position: [number, number, number];
}

function StarPlayer({ position }: StarPlayerProps) {
  const meshRef = useRef<Mesh>(null);

  // Geometry: star shape
  const geometry = useMemo(() => {
    const starShape = new THREE.Shape();
    const r = 0.4;
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) starShape.moveTo(x, y);
      else starShape.lineTo(x, y);
    }
    starShape.closePath();
    const extrudeSettings = { depth: 0.2, bevelEnabled: false };
    return new THREE.ExtrudeGeometry(starShape, extrudeSettings);
  }, []);

  // Animación: rotar + flotar
  useFrame((state) => {
    const mesh = meshRef.current;
    if (mesh) {
      mesh.rotation.y += 0.01;
      mesh.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[...position]}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color="gold" />
    </mesh>
  );
}

interface CanvasSceneProps {
  labyrinthGrid: number[][];
  TILE_SIZE: number;
  EXIT_POSITION: { x: number; y: number };
  GRID_WIDTH: number;
  GRID_HEIGHT: number;
}

export default function CanvasScene({
  labyrinthGrid,
  TILE_SIZE,
  EXIT_POSITION,
  GRID_WIDTH,
  GRID_HEIGHT,
}: CanvasSceneProps) {
  return (
    <Canvas
      camera={{
        position: [
          (GRID_WIDTH / 2) * TILE_SIZE - TILE_SIZE / 2,
          10,
          (GRID_HEIGHT / 2) * TILE_SIZE - TILE_SIZE / 2,
        ],
        fov: 75,
        up: [0, 0, -1],
        far: 1000,
      }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />

      {/* Piso */}
      <mesh
        position={[
          (GRID_WIDTH / 2) * TILE_SIZE - TILE_SIZE / 2,
          0,
          (GRID_HEIGHT / 2) * TILE_SIZE - TILE_SIZE / 2,
        ]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[GRID_WIDTH * TILE_SIZE, GRID_HEIGHT * TILE_SIZE]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>

      {/* Laberinto */}
      {labyrinthGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const x = colIndex * TILE_SIZE;
          const z = rowIndex * TILE_SIZE;

          if (cell === 1) {
            return (
              <mesh key={`wall-${rowIndex}-${colIndex}`} position={[x, 0.5, z]}>
                <boxGeometry args={[TILE_SIZE, TILE_SIZE, TILE_SIZE]} />
                <meshStandardMaterial color="gray" />
              </mesh>
            );
          } else if (cell === 2) {
            return (
              <mesh key={`hole-${rowIndex}-${colIndex}`} position={[x, 0.05, z]}>
                <boxGeometry args={[TILE_SIZE, 0.1, TILE_SIZE]} />
                <meshStandardMaterial color="black" />
              </mesh>
            );
          } else {
            return (
              <mesh
                key={`ground-${rowIndex}-${colIndex}`}
                position={[x, 0, z]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <planeGeometry args={[TILE_SIZE, TILE_SIZE]} />
                <meshStandardMaterial color="lightgray" />
              </mesh>
            );
          }
        })
      )}

      {/* Jugador */}
      <StarPlayer position={[TILE_SIZE, 0.5, TILE_SIZE]} />

      {/* Salida */}
      <mesh position={[EXIT_POSITION.x * TILE_SIZE, 0.1, EXIT_POSITION.y * TILE_SIZE]}>
        <boxGeometry args={[TILE_SIZE * 0.8, 0.2, TILE_SIZE * 0.8]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </Canvas>
  );
}
