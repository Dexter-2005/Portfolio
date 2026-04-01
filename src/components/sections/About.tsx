"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlowCard from "@/components/ui/GlowCard";
import VerdictBadge from "@/components/ui/VerdictBadge";
import useCountUp from "@/hooks/useCountUp";
import { PORTFOLIO_DATA } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";


interface StatCellProps {
  value: string;
  label: string;
  sublabel: string;
  color: string;
  numericTarget?: number;
  isInView: boolean;
}

function StatCell({ value, label, sublabel, color, numericTarget, isInView }: StatCellProps) {
  const countValue = useCountUp(numericTarget || 0, 1500, isInView);
  const displayValue = numericTarget ? countValue.toString() : value;

  return (
    <motion.div variants={fadeUp}>
      <GlowCard glowColor={color} className="text-center h-full">
        <p
          className="text-3xl md:text-4xl font-bold mb-1"
          style={{
            fontFamily: "var(--font-mono)",
            color: color,
          }}
        >
          {displayValue}
          {numericTarget && value.includes("+") ? "+" : ""}
          {numericTarget && value.includes("/") ? `/${value.split("/")[1]}` : ""}
        </p>
        <p
          className="text-sm font-medium"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-primary)",
          }}
        >
          {label}
        </p>
        <p
          className="text-xs mt-1"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-muted)",
          }}
        >
          {sublabel}
        </p>
      </GlowCard>
    </motion.div>
  );
}

const STATS = [
  {
    value: "1257",
    label: "CF Rating",
    sublabel: "Pupil Rank",
    color: "var(--accent-blue)",
    numericTarget: 1257,
  },
  {
    value: "272",
    label: "Problems Solved",
    sublabel: "Codeforces",
    color: "var(--accent-primary)",
    numericTarget: 272,
  },
  {
    value: "4/187",
    label: "Dept Rank",
    sublabel: "ECE Batch",
    color: "var(--accent-gold)",
    numericTarget: 4,
  },
  {
    value: "8.48",
    label: "CGPA",
    sublabel: "LNMIIT Jaipur",
    color: "var(--accent-primary)",
    numericTarget: undefined,
  },
  {
    value: "ACM",
    label: "Member",
    sublabel: "Problem Setter",
    color: "var(--accent-secondary)",
    numericTarget: undefined,
  },
  {
    value: "20+",
    label: "Contests",
    sublabel: "Problems Set",
    color: "var(--accent-blue)",
    numericTarget: 20,
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative py-32 px-6 md:px-12"
      style={{ backgroundColor: "var(--bg-void)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-16"
        >
          <VerdictBadge verdict="AC" label="CONTESTANT_PROFILE" />
        </motion.div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* LEFT: Photo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.85 }
            }
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative flex-shrink-0"
          >
            {/* Glow backdrop */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,255,136,0.15) 0%, transparent 70%)",
                transform: "scale(1.4)",
                filter: "blur(30px)",
              }}
            />

            {/* Rotating outer ring */}
            <div
              className="absolute inset-0 animate-rotate-ring"
              style={{
                width: "280px",
                height: "280px",
                border: "2px dashed rgba(0,255,136,0.2)",
                borderRadius: "50%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Photo hex container */}
            <div
              className="relative w-56 h-56 md:w-64 md:h-64 overflow-hidden"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
            >
              {/* Placeholder gradient until actual photo */}
              <div
                className="w-full h-full"
                style={{
                  background:
                    "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 50%, rgba(0,255,136,0.1) 100%)",
                  border: "2px solid var(--accent-primary)",
                  filter: "contrast(1.05) saturate(1.1)",
                }}
              >
                {/* Try to load actual photo, fallback to gradient */}
                <img
                  src="/himanshu.jpg"
                  alt="Himanshu Repswal"
                  className="w-full h-full object-cover"
                  style={{ filter: "contrast(1.05) saturate(1.1)" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Stats */}
          <div className="flex-1 min-w-0">
            {/* Bio */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="mb-10"
            >
              <p
                className="text-base md:text-lg leading-relaxed max-w-xl"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-primary)",
                }}
              >
                {PORTFOLIO_DATA.personal.bio}
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {STATS.map((stat) => (
                <StatCell
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  sublabel={stat.sublabel}
                  color={stat.color}
                  numericTarget={stat.numericTarget}
                  isInView={isInView}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
