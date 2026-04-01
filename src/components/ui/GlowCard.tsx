"use client";

import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  glowColor?: string;
  className?: string;
}

export default function GlowCard({
  children,
  glowColor = "var(--accent-primary)",
  className = "",
}: GlowCardProps) {
  return (
    <div
      className={`relative rounded-xl p-6 transition-all duration-200 ${className}`}
      style={{
        background: "rgba(12, 12, 20, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid color-mix(in srgb, ${glowColor} 15%, transparent)`,
        boxShadow: `0 0 15px color-mix(in srgb, ${glowColor} 8%, transparent)`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `color-mix(in srgb, ${glowColor} 40%, transparent)`;
        el.style.boxShadow = `0 0 30px color-mix(in srgb, ${glowColor} 20%, transparent)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `color-mix(in srgb, ${glowColor} 15%, transparent)`;
        el.style.boxShadow = `0 0 15px color-mix(in srgb, ${glowColor} 8%, transparent)`;
      }}
    >
      {children}
    </div>
  );
}
