"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import VerdictBadge from "@/components/ui/VerdictBadge";
import { PORTFOLIO_DATA } from "@/lib/data";
import { fadeUpSpring as fadeUp, staggerContainer } from "@/lib/animations";

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

interface ProjectCardProps {
  project: (typeof PORTFOLIO_DATA.projects)[number];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = ((e.clientY - centerY) / (rect.height / 2)) * -8;
      const y = ((e.clientX - centerX) / (rect.width / 2)) * 8;
      setTilt({ x, y });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  // Project-specific icons as SVG
  const iconSvgs = [
    // CV2Job - Brain/Circuit
    <svg key="cv2job" viewBox="0 0 40 40" className="w-10 h-10">
      <circle cx="20" cy="20" r="16" fill="none" stroke={project.iconColor} strokeWidth="1.5" opacity="0.3" />
      <circle cx="20" cy="14" r="4" fill={project.iconColor} opacity="0.5" />
      <circle cx="13" cy="24" r="3" fill={project.iconColor} opacity="0.3" />
      <circle cx="27" cy="24" r="3" fill={project.iconColor} opacity="0.3" />
      <line x1="20" y1="18" x2="13" y2="21" stroke={project.iconColor} strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="18" x2="27" y2="21" stroke={project.iconColor} strokeWidth="1" opacity="0.4" />
    </svg>,
    // Tars Chat - Network
    <svg key="tars" viewBox="0 0 40 40" className="w-10 h-10">
      <circle cx="10" cy="10" r="3" fill={project.iconColor} opacity="0.5" />
      <circle cx="30" cy="10" r="3" fill={project.iconColor} opacity="0.5" />
      <circle cx="20" cy="30" r="3" fill={project.iconColor} opacity="0.5" />
      <circle cx="20" cy="18" r="4" fill={project.iconColor} opacity="0.4" />
      <line x1="10" y1="10" x2="20" y2="18" stroke={project.iconColor} strokeWidth="1" opacity="0.3" />
      <line x1="30" y1="10" x2="20" y2="18" stroke={project.iconColor} strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="30" x2="20" y2="22" stroke={project.iconColor} strokeWidth="1" opacity="0.3" />
    </svg>,
    // StructLabs - Tree
    <svg key="struct" viewBox="0 0 40 40" className="w-10 h-10">
      <circle cx="20" cy="8" r="3" fill={project.iconColor} opacity="0.5" />
      <circle cx="10" cy="22" r="3" fill={project.iconColor} opacity="0.4" />
      <circle cx="30" cy="22" r="3" fill={project.iconColor} opacity="0.4" />
      <circle cx="5" cy="34" r="2.5" fill={project.iconColor} opacity="0.3" />
      <circle cx="15" cy="34" r="2.5" fill={project.iconColor} opacity="0.3" />
      <line x1="20" y1="11" x2="10" y2="19" stroke={project.iconColor} strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="11" x2="30" y2="19" stroke={project.iconColor} strokeWidth="1" opacity="0.3" />
      <line x1="10" y1="25" x2="5" y2="31" stroke={project.iconColor} strokeWidth="1" opacity="0.3" />
      <line x1="10" y1="25" x2="15" y2="31" stroke={project.iconColor} strokeWidth="1" opacity="0.3" />
    </svg>,
  ];

  return (
    <motion.div
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="transition-transform duration-200"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <GlowCard glowColor={project.iconColor} className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {iconSvgs[index]}
              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-xs"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                >
                  {project.tagline}
                </p>
              </div>
            </div>
            <VerdictBadge verdict="AC" />
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-4 flex-1"
            style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)" }}
          >
            {project.description}
          </p>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[10px] tracking-wide"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: project.iconColor,
                  border: `1px solid ${project.iconColor}30`,
                  backgroundColor: `${project.iconColor}08`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Key Metric */}
          <p
            className="text-sm font-bold mb-4"
            style={{
              fontFamily: "var(--font-mono)",
              color: project.metricColor,
            }}
          >
            {project.metric}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs tracking-wider transition-all duration-200 hover:scale-105"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--text-primary)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <GitHubIcon size={14} />
              GitHub
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs tracking-wider transition-all duration-200 hover:scale-105"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent-primary)",
                border: "1px solid rgba(0,255,136,0.2)",
              }}
            >
              <ExternalLink size={14} />
              Live
            </a>
          </div>
        </GlowCard>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
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
          className="mb-16 flex items-center gap-3"
        >
          <h2
            className="text-3xl md:text-4xl font-bold tracking-wider"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
          >
            PROJECTS
          </h2>
          <div className="flex gap-1">
            <VerdictBadge verdict="AC" />
            <VerdictBadge verdict="AC" />
            <VerdictBadge verdict="AC" />
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PORTFOLIO_DATA.projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
