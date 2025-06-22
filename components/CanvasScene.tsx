'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';

export default function CanvasScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.8} />
      {/* Temporarily removed other Three.js elements */}
    </Canvas>
  );
}