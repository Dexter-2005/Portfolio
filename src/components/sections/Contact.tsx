"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Terminal, Mail, Copy, Check, Send } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import VerdictBadge from "@/components/ui/VerdictBadge";
import { PORTFOLIO_DATA } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

/* Simple SVG icons for LinkedIn and GitHub since lucide-react v0.460+ removed brand icons */
function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    icon: <LinkedInIcon />,
    url: PORTFOLIO_DATA.socials.linkedin,
    handle: "himanxhu",
    hoverColor: "#0a66c2",
  },
  {
    name: "GitHub",
    icon: <GitHubIcon />,
    url: PORTFOLIO_DATA.socials.github,
    handle: "Dexter-2005",
    hoverColor: "#e8e8f0",
  },
  {
    name: "Codeforces",
    icon: <Code2 size={18} />,
    url: PORTFOLIO_DATA.socials.codeforces,
    handle: "DeXTer-69",
    hoverColor: "#ff4444",
  },
  {
    name: "LeetCode",
    icon: <Terminal size={18} />,
    url: PORTFOLIO_DATA.socials.leetcode,
    handle: "Dexter-69",
    hoverColor: "#ff6b35",
  },
  {
    name: "Email",
    icon: <Mail size={18} />,
    url: `mailto:${PORTFOLIO_DATA.personal.email}`,
    handle: PORTFOLIO_DATA.personal.email,
    hoverColor: "#00ff88",
  },
];

const SUGGESTED_QUESTIONS = [
  "What's his CF rating?",
  "What projects has he built?",
  "Is he available for internships?",
];

/* ===================== ASK CLAUDE CHAT ===================== */
function AskClaude() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (question: string) => {
    const q = question || input;
    if (!q.trim()) return;
    setLoading(true);
    setResponse("");
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setResponse(data.error || "Error processing query. Please try again.");
      } else {
        setResponse(data.response);
      }
    } catch {
      setResponse("Network error. Could not connect to the AI model.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <GlowCard glowColor="var(--accent-primary)" className="mt-16 relative overflow-hidden group border border-[rgba(0,255,136,0.2)] shadow-[0_0_30px_rgba(0,255,136,0.05)]">
      {/* Background glow that increases on hover */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-primary)] opacity-5 rounded-full blur-[80px] group-hover:opacity-15 transition-opacity duration-700 pointer-events-none" />

      <div className="p-3 sm:p-5 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)] shadow-[0_0_15px_rgba(0,255,136,0.1)] flex items-center justify-center">
            <Terminal size={24} className="text-[var(--accent-primary)] animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold tracking-wider" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
              HIMANSHU'S <span style={{ color: "var(--accent-primary)" }}>AI ASSISTANT</span>
            </h3>
            <span
              className="text-sm"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
            >
              Ask anything about his projects, skills, or experience
            </span>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="flex flex-wrap gap-2.5 mb-6">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => handleAsk(q)}
              className="px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:scale-105 hover:bg-[rgba(0,255,136,0.1)]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent-primary)",
                border: "1px solid rgba(0,255,136,0.3)",
                backgroundColor: "rgba(0,255,136,0.02)",
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk(input)}
          placeholder="Type your question..."
          className="flex-1 px-5 py-3.5 rounded-xl text-base outline-none transition-all duration-200 focus:ring-1 focus:ring-[var(--accent-primary)]"
          style={{
            fontFamily: "var(--font-mono)",
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(0,255,136,0.2)",
            color: "var(--text-primary)",
          }}
        />
        <button
          onClick={() => handleAsk(input)}
          disabled={loading}
          className="px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,136,0.1)] hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
          style={{
            fontFamily: "var(--font-mono)",
            backgroundColor: "rgba(0,255,136,0.15)",
            border: "1px solid rgba(0,255,136,0.4)",
            color: "var(--accent-primary)",
          }}
        >
          <Send size={18} />
        </button>
      </div>

      {/* Response */}
        {(loading || response) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-5 rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(0,255,136,0.15)",
            }}
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <Terminal size={16} className="text-[var(--accent-primary)] animate-bounce" />
                <span
                  className="text-base animate-pulse"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}
                >
                  GENERATING_RESPONSE...
                </span>
              </div>
            ) : (
              <p
                className="text-base leading-relaxed whitespace-pre-wrap"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}
              >
                {response}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </GlowCard>
  );
}

/* ===================== MAIN CONTACT COMPONENT ===================== */
export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative py-32 px-6 md:px-12"
      style={{ backgroundColor: "var(--bg-void)" }}
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-5xl font-bold tracking-wider mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
          >
            SUBMIT SOLUTION
          </h2>
          <p
            className="text-sm"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
          >
            {"// open to opportunities, collaborations, and interesting problems"}
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {SOCIAL_LINKS.map((social) => (
            <motion.a
              key={social.name}
              variants={fadeUp}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs transition-all duration-200 hover:scale-105 group"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "var(--bg-surface)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = social.hoverColor;
                el.style.borderColor = `${social.hoverColor}40`;
                el.style.boxShadow = `0 0 15px ${social.hoverColor}20`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--text-muted)";
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.boxShadow = "none";
              }}
            >
              {social.icon}
              <span>{social.handle}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Email with Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span
            className="text-sm"
            style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}
          >
            {PORTFOLIO_DATA.personal.email}
          </span>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
            style={{
              border: "1px solid rgba(0,255,136,0.2)",
              color: copied ? "var(--accent-primary)" : "var(--text-muted)",
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </motion.div>

        {/* AI Chat Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <AskClaude />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 text-center"
        >
          <p
            className="text-xs"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
          >
            Built with Next.js · Three.js · Framer Motion
          </p>
          <p
            className="text-xs mt-1"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
          >
            © {new Date().getFullYear()} Himanshu Chaudhary. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
