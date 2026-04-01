"use client";

import useMousePosition from "@/hooks/useMousePosition";

export default function CustomCursor() {
  const { x, y } = useMousePosition();

  return (
    <div
      className="cursor-crosshair hidden md:block"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    />
  );
}
