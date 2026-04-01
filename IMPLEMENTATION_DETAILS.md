# Implementation & Architecture Details

This document outlines the technical decisions, architecture, and features implemented in the portfolio to assist with future context and updates.

## 1. Data Architecture
- **Single Source of Truth:** All portfolio content (personal info, CF stats, projects, topics, skills) is strictly typed and centralized in `src/lib/data.ts`.
- **Stat Consistency:** Hardcoded LeetCode references were replaced exclusively with accurate Codeforces Data (272 problems, 1257 rating, Pupil rank, real heatmap data).

## 2. Core Features & Components
- **Bootloader (`HeatmapLoader.tsx`):** A custom simulated contribution heatmap loader. Features a seeded pseudo-random number generator for consistent block layouts, counting up to `874 test cases passed` before flashing an `ACCEPTED` banner.
- **3D Hero Scene (`ThreeScene.tsx`):** Uses `@react-three/fiber`. Includes:
  - An infinite glowing `GridFloor`.
  - Floating illuminated cubes (`FloatingCubes.tsx`).
  - An interactive star particle field (`ParticleField.tsx`).
  - *Optimization Note:* Initial bloom post-processing and some particle counts were reduced to ensure buttery 60 FPS performance on all devices.
- **CP Stats Section (`CPStats.tsx`):**
  - **Terminal Typing:** Custom `TerminalText` component mimics shell printing. (Memoized to prevent hydration remounts).
  - **Rating Graph:** SVG-based dynamic graph of rating progression.
  - **Interactive Topic Grid:** 3D flip-cards built with Framer Motion showing domain mastery (Math, Greedy, etc.).
- **Smart Chat Widget (`AskClaude` in Contact):** Simulated AI chat interface pre-loaded with responses about the candidate.

## 3. Performance Optimizations
Significant optimizations were applied to hit high frame rates and quick Time-to-Interactive (TTI):
- **Removed Laggy Elements:** Custom JS-driven cursor and full-screen moving CSS scanlines were removed.
- **WebGL Draw Calls:** Reduced particle counts from 600 -> 200 and floating cubes from 35 -> 18. Removed `@react-three/postprocessing` (Bloom) to slash GPU usage.
- **Canvas DPR Cap:** Max device pixel ratio capped at `1.2` (`[1, 1.2]`) inside the Three `<Canvas>`.
- **Framer Motion Overload:** Refactored the CP heatmap from rendering 364 concurrent `<motion.div>` objects to standard `<div>` objects with CSS transitions.
- **Hydration Fixes:** Added `suppressHydrationWarning` to the root `<html>` and `<body>` layout tags to prevent browser extension injection crashes (e.g., from `data-jetski-tab-id`).

## 4. UI/UX Design Language
- **Theme:** Cyberpunk / Hacker aesthetic (`--bg-void: #050508`).
- **Accent Colors:** Primary Green (`#00ff88`), Blue (`#4fc3f7`), Gold (`#ffd700`), Secondary Orange (`#ff6b35`).
- **Typography:** 
  - `JetBrains Mono` for code, terminal outputs, and minimal sub-labels.
  - `Syne` for large, bold section headers.
  - `DM Sans` for readable body text and descriptions.

## 5. Deployment Readiness
- Project builds completely clean with zero TypeScript errors (`tsc --noEmit`).
- Ready for one-click Vercel deployment. No environment variables required out of the box.
