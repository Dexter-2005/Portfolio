"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import TerminalText from "@/components/ui/TerminalText";
import RatingBadge from "@/components/ui/RatingBadge";
import useCodeforcesData from "@/hooks/useCodeforcesData";
import { PORTFOLIO_DATA } from "@/lib/data";

const ThreeScene = lazy(() => import("@/components/Scene/ThreeScene"));

export default function Hero() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: cfData } = useCodeforcesData();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const timers = [
      setTimeout(() => setShowSubtitle(true), 1000),
      setTimeout(() => setShowBadges(true), 1600),
      setTimeout(() => setShowScroll(true), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* 3D Scene Background */}
      {!isMobile && (
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Suspense fallback={null}>
            <ThreeScene />
          </Suspense>
        </div>
      )}

      {/* Mobile fallback gradient */}
      {isMobile && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.05) 0%, var(--bg-void) 70%)",
            zIndex: 0,
          }}
        />
      )}

      {/* Dark gradient overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 30%, var(--bg-void) 80%), linear-gradient(to bottom, transparent 60%, var(--bg-void) 95%)",
          zIndex: 1,
        }}
      />

      {/* UI Content */}
      <div
        className="relative flex flex-col items-center justify-center h-full px-4"
        style={{ zIndex: 10 }}
      >
        {/* Typewriter name */}
        <TerminalText
          lines={["> HIMANSHU CHAUDHARY"]}
          typingSpeed={60}
          startDelay={200}
          className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider"
        />

        {/* Subtitle */}
        {showSubtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-4 text-sm md:text-lg tracking-widest text-center"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-muted)",
            }}
          >
            LNMIIT'28 &nbsp;·&nbsp; Problem Setter &nbsp;·&nbsp; Full-Stack Dev
          </motion.p>
        )}

        {/* Rating Badges Row */}
        {showBadges && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <RatingBadge
                platform="Codeforces"
                rating={`${cfData?.rating || PORTFOLIO_DATA.cp.cfRating} ${cfData?.rank || PORTFOLIO_DATA.cp.cfRank}`}
                rank={`${cfData?.totalProblemsSolved || PORTFOLIO_DATA.cp.totalProblems}+ Solved`}
                color="var(--accent-blue)"
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <RatingBadge
                platform="Academics"
                rating="8.48 CGPA"
                rank="Rank 4/187"
                color="var(--accent-gold)"
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <RatingBadge
                platform="Skills"
                rating="DSA + Dev"
                color="var(--accent-primary)"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Scroll Indicator */}
        {showScroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute bottom-12 flex flex-col items-center gap-2"
          >
            <span
              className="text-xs tracking-widest"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
              }}
            >
              scroll to execute
            </span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-lg"
              style={{ color: "var(--accent-primary)" }}
            >
              ∨
            </motion.span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
