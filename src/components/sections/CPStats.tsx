"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { RefreshCw } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import VerdictBadge from "@/components/ui/VerdictBadge";
import TerminalText from "@/components/ui/TerminalText";
import useCountUp from "@/hooks/useCountUp";
import { PORTFOLIO_DATA, RATING_GRAPH_PATH, RATING_GRAPH_FILL_PATH, HEATMAP_COLORS } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";
import useCodeforcesData from "@/hooks/useCodeforcesData";


/* ===================== 6A: RATING CARD ===================== */
function RatingCard({ 
  isInView, 
  cfData, 
  onRefresh, 
  isLoading 
}: { 
  isInView: boolean; 
  cfData: any; 
  onRefresh: () => void;
  isLoading: boolean;
}) {
  const rating = cfData?.rating || PORTFOLIO_DATA.cp.cfRating;
  const maxRating = cfData?.maxRating || PORTFOLIO_DATA.cp.cfRating;
  const maxRank = cfData?.maxRank || PORTFOLIO_DATA.cp.cfRank;
  const problems = cfData?.totalProblemsSolved || PORTFOLIO_DATA.cp.totalProblems;

  const ratingValue = useCountUp(rating, 2000, isInView);

  return (
    <motion.div variants={fadeUp}>
      <GlowCard glowColor="var(--accent-blue)" className="overflow-hidden">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3
              className="text-xl md:text-2xl font-bold tracking-wider mb-1"
              style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
            >
              COMPETITIVE PROGRAMMING
              <span className="animate-blink ml-1" style={{ color: "var(--accent-primary)" }}>_</span>
            </h3>
            <p className="text-sm" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
              {"// ranked among the best problem solvers"}
            </p>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 group self-start md:self-center"
            style={{
              fontFamily: "var(--font-mono)",
              backgroundColor: "rgba(0, 255, 136, 0.05)",
              border: "1px solid rgba(0, 255, 136, 0.2)",
              color: "var(--accent-primary)",
              boxShadow: "0 0 15px rgba(0, 255, 136, 0.05)",
            }}
          >
            <RefreshCw 
              size={14} 
              className={`${isLoading ? "animate-spin" : "group-hover:rotate-180"} transition-transform duration-500`} 
            />
            <span>{isLoading ? "FETCHING_DATA..." : "REFRESH_STATS"}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left: Rating Graph SVG */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <svg
              viewBox="0 0 420 150"
              className="w-full lg:w-[320px]"
              style={{ overflow: "visible" }}
            >
              {/* Fill gradient */}
              <defs>
                <linearGradient id="ratingFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4fc3f7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#4fc3f7" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[30, 60, 90, 120].map((y) => (
                <line
                  key={y}
                  x1="0" y1={y} x2="400" y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.5"
                />
              ))}

              {/* Fill area */}
              <motion.path
                d={RATING_GRAPH_FILL_PATH}
                fill="url(#ratingFill)"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Line */}
              <motion.path
                d={RATING_GRAPH_PATH}
                fill="none"
                stroke="#4fc3f7"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Peak dot */}
              <motion.circle
                cx="400"
                cy="20"
                r="4"
                fill="#4fc3f7"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: 2 }}
              />

              {/* Contest marker dots */}
              {[80, 160, 240, 320].map((x, i) => (
                <motion.circle
                  key={x}
                  cx={x}
                  cy={95 - i * 18}
                  r="3"
                  fill="rgba(79,195,247,0.5)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.5 + i * 0.3 }}
                />
              ))}
            </svg>
          </div>

          {/* Center: Big Rating Number */}
          <div className="text-center flex-shrink-0">
            <p
              className="font-bold leading-none"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(4rem, 10vw, 8rem)",
                color: "#4fc3f7",
                textShadow: "0 0 30px rgba(79,195,247,0.5), 0 0 60px rgba(79,195,247,0.2)",
              }}
            >
              {ratingValue}
            </p>
            <p
              className="text-sm tracking-widest mt-2 uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
            >
              PEAK: {maxRating} · CODEFORCES {maxRank}
            </p>
          </div>

          {/* Right: Achievement Pills */}
          <div className="flex flex-col gap-3">
            <motion.div variants={fadeUp}>
              <VerdictBadge verdict="AC" label={`GLOBAL RANK #${PORTFOLIO_DATA.cp.cfGlobalRank}`} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <VerdictBadge verdict="AC" label={`${problems}+ PROBLEMS SOLVED`} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <VerdictBadge verdict="WA" label={`${PORTFOLIO_DATA.cp.problemsSet}+ PROBLEMS SET`} />
            </motion.div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

/* ===================== 6B: MINI HEATMAP ===================== */
function MiniHeatmap({ isInView, cfData }: { isInView: boolean; cfData: any }) {
  const cellData = useMemo(() => {
    if (cfData?.heatmap) return cfData.heatmap;
    const cells: number[] = [];
    let seed = 123;
    const rng = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let col = 0; col < 52; col++) {
      for (let row = 0; row < 7; row++) {
        const r = rng();
        const isContestWeek = col % 7 <= 1 && r > 0.6;
        let idx: number;
        if (isContestWeek) {
          idx = 3 + Math.floor(rng() * 3);
        } else if (r < 0.3) {
          idx = 0;
        } else if (r < 0.55) {
          idx = 1;
        } else if (r < 0.75) {
          idx = 2;
        } else if (r < 0.9) {
          idx = 3;
        } else {
          idx = 4 + Math.floor(rng() * 2);
        }
        cells.push(idx);
      }
    }
    return cells;
  }, [cfData]);

  const currentStreak = cfData?.currentStreak ?? PORTFOLIO_DATA.cp.currentStreak;
  const longestStreak = cfData?.longestStreak ?? PORTFOLIO_DATA.cp.longestStreak;
  const activeDays = cfData?.activeDays ?? PORTFOLIO_DATA.cp.activeDays;

  return (
    <motion.div variants={fadeUp}>
      <GlowCard className="overflow-hidden">
        <p
          className="text-xs tracking-widest mb-4"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
        >
          PROBLEM SOLVING ACTIVITY — LAST 12 MONTHS
        </p>

        <div
          className="w-full pb-2"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(52, 1fr)`,
            gridTemplateRows: `repeat(7, 1fr)`,
            gap: "min(3px, 0.4vw)",
            gridAutoFlow: "column",
          }}
        >
          {cellData.map((colorIdx: number, i: number) => (
            <div
              key={i}
              title={`${colorIdx > 0 ? colorIdx : 0} submissions`}
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "2px",
                backgroundColor: isInView ? HEATMAP_COLORS[colorIdx] : HEATMAP_COLORS[0],
                transition: `background-color 0.3s ease ${Math.floor(i / 7) * 0.015}s`,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = "scale(1.8)";
                (e.target as HTMLElement).style.zIndex = "10";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = "scale(1)";
                (e.target as HTMLElement).style.zIndex = "0";
              }}
            />
          ))}
        </div>

        {/* Streak Stats */}
        <div className="flex flex-wrap gap-6 mt-4">
          {[
            { label: "Current Streak", value: `${currentStreak} days` },
            { label: "Longest Streak", value: `${longestStreak} days` },
            { label: "Active Days", value: `${activeDays}` },
          ].map((stat) => (
            <div key={stat.label}>
              <span
                className="text-xs"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
              >
                {stat.label}:{" "}
              </span>
              <span
                className="text-sm font-bold"
                style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </GlowCard>
    </motion.div>
  );
}

/* ===================== 6C: DIFFICULTY BAR ===================== */
function DifficultyBar({ isInView }: { isInView: boolean }) {
  return (
    <motion.div variants={fadeUp}>
      <GlowCard>
        <p
          className="text-xs tracking-widest mb-4"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
        >
          PROBLEM DIFFICULTY DISTRIBUTION
        </p>

        <div className="relative w-full h-10 rounded-lg overflow-hidden flex">
          {PORTFOLIO_DATA.cp.difficultyDistribution.map((segment, i) => (
            <motion.div
              key={segment.label}
              className="h-full relative flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: segment.color }}
              initial={{ width: "0%" }}
              animate={isInView ? { width: `${segment.percentage}%` } : { width: "0%" }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            >
              <span
                className="text-[10px] font-bold whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--bg-void)",
                  textShadow: "0 0 4px rgba(0,0,0,0.3)",
                }}
              >
                {segment.count}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Labels below */}
        <div className="flex mt-3 gap-4 flex-wrap">
          {PORTFOLIO_DATA.cp.difficultyDistribution.map((segment) => (
            <div key={segment.label} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: segment.color }}
              />
              <span
                className="text-[10px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
              >
                {segment.label}
              </span>
            </div>
          ))}
        </div>
      </GlowCard>
    </motion.div>
  );
}

/* ===================== 6D: TOPIC GRID ===================== */
function TopicGrid({ isInView }: { isInView: boolean }) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  return (
    <motion.div variants={fadeUp}>
      <GlowCard>
        <p
          className="text-xs tracking-widest mb-4"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
        >
          TOPIC MASTERY
        </p>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {PORTFOLIO_DATA.topics.map((topic, i) => (
            <div
              key={topic.name}
              className="relative cursor-pointer"
              style={{ perspective: "600px" }}
              onMouseEnter={() => setFlippedIndex(i)}
              onMouseLeave={() => setFlippedIndex(null)}
            >
              <motion.div
                className="relative w-full"
                animate={{ rotateY: flippedIndex === i ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front */}
                <div
                  className="rounded-lg p-3"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    border: `1px solid ${topic.color}30`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <p
                    className="text-xs font-medium mb-2 truncate"
                    style={{ fontFamily: "var(--font-mono)", color: topic.color }}
                  >
                    {topic.name}
                  </p>
                  {/* Mastery bar */}
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: `${topic.color}20` }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: topic.color }}
                      initial={{ width: "0%" }}
                      animate={isInView ? { width: `${topic.proficiency}%` } : { width: "0%" }}
                      transition={{ duration: 1, delay: i * 0.05 }}
                    />
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-lg p-3 flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    border: `1px solid ${topic.color}60`,
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <p
                    className="text-lg font-bold"
                    style={{ fontFamily: "var(--font-mono)", color: topic.color }}
                  >
                    {topic.count}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </GlowCard>
    </motion.div>
  );
}

/* ===================== 6E: TERMINAL EXPERIENCE ===================== */
function TerminalExperience({ isInView }: { isInView: boolean }) {
  return (
    <motion.div variants={fadeUp}>
      <div
        className="rounded-xl p-6 overflow-hidden"
        style={{
          backgroundColor: "var(--bg-elevated)",
          borderLeft: "3px solid var(--accent-primary)",
        }}
      >
        {isInView && (
          <TerminalText
            lines={[
              '$ ./experience --role "Problem Setter & Tester"',
              "",
              "Organization: ACM Student Chapter, LNMIIT",
              "Duration: Sept 2025 – Present",
              "[✓] Authored 20+ original problems (Codeforces Polygon)",
              "[✓] Validated 50+ problem statements & test cases",
              "[✓] Mentored 100+ students on DSA & contest strategies",
              "[✓] Led contests with 200+ active participants",
              "[✓] Offered DSA Teaching Assistant role at LNMIIT",
              "$ _",
            ]}
            typingSpeed={30}
            startDelay={300}
            className="text-xs md:text-sm leading-relaxed"
          />
        )}
      </div>
    </motion.div>
  );
}

/* ===================== MAIN CPStats COMPONENT ===================== */
export default function CPStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: cfData, refresh, isLoading } = useCodeforcesData();

  return (
    <section
      id="cp"
      className="relative py-32 px-6 md:px-12"
      style={{ backgroundColor: "var(--bg-void)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="space-y-8"
        >
          <RatingCard 
            isInView={isInView} 
            cfData={cfData} 
            onRefresh={refresh} 
            isLoading={isLoading} 
          />
          <MiniHeatmap isInView={isInView} cfData={cfData} />
          <DifficultyBar isInView={isInView} />
          <TopicGrid isInView={isInView} />
          <TerminalExperience isInView={isInView} />
        </motion.div>
      </div>
    </section>
  );
}
