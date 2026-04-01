"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export default function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const target = useRef<MousePosition>({ x: 0, y: 0 });
  const animationFrame = useRef<number>(0);

  const lerp = useCallback(() => {
    setPosition((prev) => ({
      x: prev.x + (target.current.x - prev.x) * 0.12,
      y: prev.y + (target.current.y - prev.y) * 0.12,
    }));
    animationFrame.current = requestAnimationFrame(lerp);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrame.current = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [lerp]);

  return position;
}
