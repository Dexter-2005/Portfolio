"use client";

export default function ScanLine() {
  return (
    <div
      className="fixed left-0 w-full pointer-events-none animate-scan"
      style={{
        height: "1px",
        background: "rgba(0, 255, 136, 0.2)",
        zIndex: 9998,
        top: 0,
      }}
    />
  );
}
