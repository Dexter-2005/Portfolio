"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCountUp from "@/hooks/useCountUp";

interface HeatmapLoaderProps {
  onComplete: () => void;
}

const COLS = 53;
const ROWS = 7;
const TOTAL_CELLS = COLS * ROWS;
const CELL_SIZE = 12;
const CELL_GAP = 3;

const HEATMAP_COLORS = [
  "#161b22",
  "#0d4429",
  "#006d32",
  "#26a641",
  "#39d353",
  "#00ff88",
];

// Seeded pseudo-random for consistent heatmap
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateCellData(): number[] {
  const rng = seededRandom(42);
  const cells: number[] = [];

  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS; row++) {
      const r = rng();
      // Check if this is near a "contest day" (every ~14 columns)
      const isContestWeek =
        col % 14 <= 1 && (row === Math.floor(rng() * ROWS) || r > 0.85);

      let colorIndex: number;
      if (isContestWeek && r > 0.5) {
        // Bright cells for contest days
        colorIndex = 4 + Math.floor(rng() * 2); // index 4-5
      } else if (r < 0.35) {
        colorIndex = 0; // empty/dark
      } else if (r < 0.6) {
        colorIndex = 1; // light
      } else if (r < 0.8) {
        colorIndex = 2; // medium-light
      } else if (r < 0.92) {
        colorIndex = 3; // medium
      } else if (r < 0.97) {
        colorIndex = 4; // bright
      } else {
        colorIndex = 5; // brightest
      }

      cells.push(colorIndex);
    }
  }
  return cells;
}

export default function HeatmapLoader({ onComplete }: HeatmapLoaderProps) {
  const [phase, setPhase] = useState<
    "filling" | "flash" | "accepted" | "fadeout" | "done"
  >("filling");
  const [cellsFilled, setCellsFilled] = useState(false);
  const [showAccepted, setShowAccepted] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const cellData = useMemo(() => generateCellData(), []);

  // Animation timing
  const totalFillDuration = COLS * 28 + ROWS * 4 + 400; // ~1912ms

  // Count up animation for the counter
  const counterValue = useCountUp(874, totalFillDuration, phase === "filling");

  useEffect(() => {
    // Phase transitions
    const timers: NodeJS.Timeout[] = [];

    // After fill completes → flash
    timers.push(
      setTimeout(() => {
        setPhase("flash");
        setCellsFilled(true);
      }, totalFillDuration)
    );

    // Flash lasts 150ms → show ACCEPTED
    timers.push(
      setTimeout(() => {
        setPhase("accepted");
        setShowAccepted(true);
      }, totalFillDuration + 150)
    );

    // After 900ms showing ACCEPTED → fade out
    timers.push(
      setTimeout(() => {
        setPhase("fadeout");
      }, totalFillDuration + 150 + 900)
    );

    // After 600ms fade → done
    timers.push(
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, totalFillDuration + 150 + 900 + 600)
    );

    return () => timers.forEach(clearTimeout);
  }, [totalFillDuration, onComplete]);

  if (phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#050508",
        zIndex: 99999,
      }}
      animate={{
        opacity: phase === "fadeout" ? 0 : 1,
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Heatmap Grid */}
      <div
        className="relative"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
          gap: `${CELL_GAP}px`,
        }}
      >
        {cellData.map((colorIndex, i) => {
          const col = Math.floor(i / ROWS);
          const row = i % ROWS;
          const delay = col * 0.028 + row * 0.004;

          return (
            <motion.div
              key={i}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                borderRadius: 2,
              }}
              initial={{ backgroundColor: HEATMAP_COLORS[0] }}
              animate={{
                backgroundColor:
                  phase === "flash"
                    ? "#00ff88"
                    : HEATMAP_COLORS[colorIndex],
              }}
              transition={{
                delay: phase === "flash" ? 0 : delay,
                duration: phase === "flash" ? 0.05 : 0.2,
              }}
            />
          );
        })}
      </div>

      {/* Counter */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showAccepted ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span
          className="text-lg tracking-wider"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
          }}
        >
          Loading...{" "}
          <span style={{ color: "var(--accent-primary)" }}>
            {counterValue}
          </span>{" "}
          test cases passed
        </span>
      </motion.div>

      {/* ACCEPTED Text */}
      <AnimatePresence>
        {showAccepted && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 900,
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
                color: "#00ff88",
                textShadow:
                  "0 0 30px #00ff88, 0 0 60px #00ff88, 0 0 100px rgba(0,255,136,0.2)",
                letterSpacing: "0.25em",
                userSelect: "none",
              }}
            >
              ACCEPTED
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
