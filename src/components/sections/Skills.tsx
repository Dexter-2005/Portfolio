"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import GlowCard from "@/components/ui/GlowCard";
import VerdictBadge from "@/components/ui/VerdictBadge";
import { PORTFOLIO_DATA } from "@/lib/data";
import { fadeUp, staggerFast as staggerContainer } from "@/lib/animations";


const CATEGORY_COLORS: Record<string, string> = {
  language: "var(--accent-primary)",
  web: "var(--accent-blue)",
  dsa: "var(--accent-secondary)",
  tool: "var(--accent-gold)",
};

/* ===================== MOBILE CHIP GRID ===================== */
function SkillChipGrid({ isInView }: { isInView: boolean }) {
  const grouped = useMemo(() => {
    const groups: Record<string, typeof PORTFOLIO_DATA.skills> = {};
    PORTFOLIO_DATA.skills.forEach((skill) => {
      if (!groups[skill.category]) groups[skill.category] = [];
      groups[skill.category].push(skill);
    });
    return groups;
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="space-y-6"
    >
      {PORTFOLIO_DATA.skillCategories.map(({ key, label, color }) => (
        <motion.div key={key} variants={fadeUp}>
          <p
            className="text-xs tracking-widest mb-3"
            style={{ fontFamily: "var(--font-mono)", color }}
          >
            {label}
          </p>
          <div className="flex flex-wrap gap-2">
            {(grouped[key] || []).map((skill) => (
              <div
                key={skill.name}
                className="px-3 py-1.5 rounded-lg text-xs transition-all duration-200 hover:scale-105"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: CATEGORY_COLORS[skill.category],
                  border: `1px solid color-mix(in srgb, ${CATEGORY_COLORS[skill.category]} 20%, transparent)`,
                  backgroundColor: `color-mix(in srgb, ${CATEGORY_COLORS[skill.category]} 5%, transparent)`,
                }}
              >
                {skill.name}
                <span className="ml-1.5 opacity-50">{skill.proficiency}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ===================== SKILL BARS ===================== */
function SkillBars({ isInView }: { isInView: boolean }) {
  return (
    <div className="space-y-4 mt-10">
      {PORTFOLIO_DATA.skillCategories.map(({ key, label, color }) => {
        const skills = PORTFOLIO_DATA.skills.filter(
          (s) => s.category === key
        );
        const avg =
          skills.reduce((sum, s) => sum + s.proficiency, 0) / skills.length;

        return (
          <div key={key}>
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-xs tracking-widest"
                style={{ fontFamily: "var(--font-mono)", color }}
              >
                {label}
              </span>
              <span
                className="text-xs"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
              >
                {skills.map((s) => s.name).join(" · ")}
              </span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: "var(--bg-elevated)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: "0%" }}
                animate={isInView ? { width: `${avg}%` } : { width: "0%" }}
                transition={{ duration: 1.2, type: "spring", stiffness: 60 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ===================== MAIN SKILLS COMPONENT ===================== */
export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      className="relative py-32 px-6 md:px-12"
      style={{ backgroundColor: "var(--bg-void)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-12"
        >
          <VerdictBadge verdict="AC" label="SKILL_TREE" />
          <h2
            className="text-3xl md:text-4xl font-bold tracking-wider mt-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
          >
            SKILLS
          </h2>
        </motion.div>

        {/* Chip Grid (works on all devices) */}
        <GlowCard>
          <SkillChipGrid isInView={isInView} />
        </GlowCard>

        {/* Animated Skill Bars */}
        <SkillBars isInView={isInView} />
      </div>
    </section>
  );
}
