"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

interface TerminalTextProps {
  lines: string[];
  typingSpeed?: number;
  startDelay?: number;
  className?: string;
  onComplete?: () => void;
  cursorChar?: string;
}

export default function TerminalText({
  lines,
  typingSpeed = 60,
  startDelay = 0,
  className = "",
  onComplete,
  cursorChar = "█",
}: TerminalTextProps) {
  const linesStr = JSON.stringify(lines);
  const stableLines = useMemo(() => JSON.parse(linesStr) as string[], [linesStr]);

  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Handle start delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true);
      setDisplayedLines(stableLines.map(() => ""));
    }, startDelay);
    return () => clearTimeout(timer);
  }, [startDelay, stableLines]);

  // Typing animation
  useEffect(() => {
    if (!isStarted || isComplete) return;

    const currentLine = stableLines[currentLineIndex];
    if (!currentLine && currentLineIndex >= stableLines.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    if (currentCharIndex >= (currentLine?.length ?? 0)) {
      // Move to next line
      if (currentLineIndex < stableLines.length - 1) {
        const timer = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, typingSpeed * 2);
        return () => clearTimeout(timer);
      } else {
        setIsComplete(true);
        onComplete?.();
        return;
      }
    }

    const timer = setInterval(() => {
      setCurrentCharIndex((prev) => {
        const nextIndex = prev + 1;
        setDisplayedLines((prevLines) => {
          const newLines = [...prevLines];
          newLines[currentLineIndex] = currentLine.slice(0, nextIndex);
          return newLines;
        });
        if (nextIndex >= currentLine.length) {
          clearInterval(timer);
        }
        return nextIndex;
      });
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [isStarted, isComplete, currentLineIndex, currentCharIndex, stableLines, typingSpeed, onComplete]);

  if (!isStarted) return null;

  return (
    <div
      className={`${className}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {displayedLines.map((line, i) => (
        <div key={i} className="min-h-[1.6em]">
          <span>{line}</span>
          {i === currentLineIndex && !isComplete && (
            <span
              className="animate-blink"
              style={{ color: "var(--accent-primary)" }}
            >
              {cursorChar}
            </span>
          )}
          {i === stableLines.length - 1 && isComplete && (
            <span
              className="animate-blink"
              style={{ color: "var(--accent-primary)" }}
            >
              {cursorChar}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
