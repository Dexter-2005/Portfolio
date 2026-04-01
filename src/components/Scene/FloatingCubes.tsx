"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DIFFICULTY_COLORS = [
  "#43a047", // easy green
  "#4fc3f7", // medium cyan
  "#5c6bc0", // hard blue
  "#ab47bc", // expert purple
  "#ff6b35", // orange
  "#00ff88", // neon green
];

interface CubeData {
  position: [number, number, number];
  size: number;
  rotationSpeed: [number, number, number];
  floatOffset: number;
  color: string;
  isOcta: boolean;
}

export default function FloatingCubes() {
  const groupRef = useRef<THREE.Group>(null);

  const cubes = useMemo<CubeData[]>(() => {
    const result: CubeData[] = [];
    for (let i = 0; i < 18; i++) {
      result.push({
        position: [
          (Math.random() - 0.5) * 40, // x: -20 to 20
          Math.random() * 8,           // y: 0 to 8
          -(Math.random() * 13 + 2),   // z: -15 to -2
        ],
        size: Math.random() * 0.5 + 0.2,
        rotationSpeed: [
          (Math.random() * 0.009 + 0.003),
          (Math.random() * 0.009 + 0.003),
          (Math.random() * 0.009 + 0.003),
        ],
        floatOffset: Math.random() * Math.PI * 2,
        color: DIFFICULTY_COLORS[i % DIFFICULTY_COLORS.length],
        isOcta: i % 2 === 1,
      });
    }
    return result;
  }, []);

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <FloatingCube key={i} data={cube} />
      ))}
    </group>
  );
}

function FloatingCube({ data }: { data: CubeData }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.rotation.x += data.rotationSpeed[0];
    meshRef.current.rotation.y += data.rotationSpeed[1];
    meshRef.current.rotation.z += data.rotationSpeed[2];

    meshRef.current.position.y =
      data.position[1] + Math.sin(t + data.floatOffset) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={data.position}>
      {data.isOcta ? (
        <octahedronGeometry args={[data.size]} />
      ) : (
        <boxGeometry args={[data.size, data.size, data.size]} />
      )}
      <meshStandardMaterial
        color={data.color}
        roughness={0.3}
        metalness={0.7}
        emissive={data.color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}
