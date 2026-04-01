"use client";

interface RatingBadgeProps {
  platform: string;
  rating: string;
  rank?: string;
  color?: string;
  className?: string;
}

export default function RatingBadge({
  platform,
  rating,
  rank,
  color = "var(--accent-primary)",
  className = "",
}: RatingBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium tracking-wide select-none transition-all duration-200 hover:scale-105 ${className}`}
      style={{
        fontFamily: "var(--font-mono)",
        color: color,
        border: `1px solid ${color}`,
        backgroundColor: `color-mix(in srgb, ${color} 8%, transparent)`,
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px color-mix(in srgb, ${color} 30%, transparent)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      [{platform}: {rating}
      {rank && <span className="opacity-70"> · {rank}</span>}]
    </span>
  );
}
