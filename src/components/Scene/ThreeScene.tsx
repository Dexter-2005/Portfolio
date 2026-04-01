"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GridFloor from "./GridFloor";
import FloatingCubes from "./FloatingCubes";
import ParticleField from "./ParticleField";

interface ThreeSceneProps {
  className?: string;
}

export default function ThreeScene({ className = "" }: ThreeSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{
          position: [0, 10, 20],
          fov: 60,
          near: 0.1,
          far: 200,
        }}
        dpr={[1, 1.2]}
        shadows={false}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight
            position={[0, 15, 0]}
            intensity={1}
            color="#00ff88"
          />

          {/* Scene Elements */}
          <GridFloor />
          <FloatingCubes />
          <ParticleField />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 4}
          />


        </Suspense>
      </Canvas>
    </div>
  );
}
