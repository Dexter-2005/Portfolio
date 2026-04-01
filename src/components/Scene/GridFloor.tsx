"use client";

import { Grid } from "@react-three/drei";

export default function GridFloor() {
  return (
    <Grid
      args={[200, 200]}
      cellSize={1}
      cellThickness={0.5}
      cellColor="#00ff88"
      sectionSize={5}
      sectionThickness={1}
      sectionColor="#00ff88"
      fadeDistance={80}
      fadeStrength={1.5}
      fadeFrom={1.5}
      infiniteGrid
      position={[0, -0.01, 0]}
      cellColor-opacity={0.08}
      sectionColor-opacity={0.15}
    />
  );
}
