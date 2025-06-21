import React from 'react';
import { Canvas } from '@react-three/fiber';

const ThreeScene: React.FC = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      {/* Add your 3D objects here */}
    </Canvas>
  );
};

export default ThreeScene;