"use client";

interface VerdictBadgeProps {
  verdict: "AC" | "WA" | "TLE" | "MLE" | "RE";
  label?: string;
  className?: string;
}

const VERDICT_COLORS: Record<VerdictBadgeProps["verdict"], string> = {
  AC: "#00ff88",
  WA: "#ff6b35",
  TLE: "#ffd700",
  MLE: "#ab47bc",
  RE: "#6b7280",
};

export default function VerdictBadge({ verdict, label, className = "" }: VerdictBadgeProps) {
  const color = VERDICT_COLORS[verdict];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider select-none ${className}`}
      style={{
        fontFamily: "var(--font-mono)",
        color: color,
        border: `1px solid ${color}`,
        backgroundColor: `${color}10`,
      }}
    >
      [{verdict}]
      {label && <span className="opacity-70">{label}</span>}
    </span>
  );
}
