"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Trophy, GraduationCap, Users } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import VerdictBadge from "@/components/ui/VerdictBadge";
import useCountUp from "@/hooks/useCountUp";
import { PORTFOLIO_DATA } from "@/lib/data";
import useCodeforcesData from "@/hooks/useCodeforcesData";

const ACHIEVEMENT_ICONS = [
  <Trophy key="trophy" className="w-8 h-8" />,
  <Award key="award" className="w-8 h-8" />,
  <GraduationCap key="grad" className="w-8 h-8" />,
  <Users key="users" className="w-8 h-8" />,
];

function AchievementCard({
  achievement,
  index,
  isInView,
}: {
  achievement: (typeof PORTFOLIO_DATA.achievements)[number];
  index: number;
  isInView: boolean;
}) {
  const countValue = useCountUp(
    achievement.numericValue,
    1500,
    isInView
  );

  // For values like "#4", "400+", "200+"
  const displayMetric = (() => {
    if (achievement.metric.startsWith("#")) {
      return `#${countValue}`;
    }
    if (achievement.metric.includes("+")) {
      return `${countValue}+`;
    }
    return countValue.toString();
  })();

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90 }}
      animate={
        isInView
          ? { opacity: 1, rotateY: 0 }
          : { opacity: 0, rotateY: 90 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        type: "spring",
        stiffness: 80,
      }}
      style={{ perspective: "1000px" }}
    >
      <GlowCard
        glowColor={achievement.color}
        className="h-full relative overflow-hidden group"
      >
        {/* Shimmer overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,215,0,0.06) 45%, rgba(255,215,0,0.12) 50%, rgba(255,215,0,0.06) 55%, transparent 60%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s linear infinite",
          }}
        />

        {/* Icon */}
        <div
          className="mb-4"
          style={{ color: achievement.color, opacity: 0.6 }}
        >
          {ACHIEVEMENT_ICONS[index]}
        </div>

        {/* Large Metric */}
        <p
          className="font-bold leading-none mb-2"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            color: achievement.color,
            textShadow: `0 0 20px color-mix(in srgb, ${achievement.color} 40%, transparent)`,
          }}
        >
          {displayMetric}
        </p>

        {/* Description */}
        <p
          className="text-sm font-medium mb-1"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-primary)",
          }}
        >
          {achievement.description}
        </p>

        {/* Subtext */}
        <p
          className="text-xs"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
          }}
        >
          {achievement.subtext}
        </p>
      </GlowCard>
    </motion.div>
  );
}

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: cfData } = useCodeforcesData();

  const achievementsData = useMemo(() => {
    const data = [...PORTFOLIO_DATA.achievements];
    if (cfData) {
      data[0] = {
        ...data[0],
        title: `Codeforces ${cfData.maxRank}`,
        metric: cfData.maxRating.toString(),
        numericValue: cfData.maxRating,
        description: `Peak Rating · Codeforces ${cfData.maxRank}`,
      };
      data[1] = {
        ...data[1],
        metric: `${cfData.totalProblemsSolved}+`,
        numericValue: cfData.totalProblemsSolved,
      };
    }
    return data;
  }, [cfData]);

  return (
    <section
      id="achievements"
      className="relative py-32 px-6 md:px-12"
      style={{ backgroundColor: "var(--bg-void)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center gap-4"
        >
          <h2
            className="text-3xl md:text-4xl font-bold tracking-wider"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
          >
            ACHIEVEMENTS
          </h2>
          <VerdictBadge verdict="AC" label="HALL_OF_FAME" />
        </motion.div>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievementsData.map((achievement: any, i: number) => (
            <AchievementCard
              key={achievement.title}
              achievement={achievement}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
