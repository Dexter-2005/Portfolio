"use client";

import { useState, useEffect } from "react";
import useScrollProgress from "@/hooks/useScrollProgress";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { activeSection } = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9990] transition-all duration-300 px-6 md:px-12 py-4"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: scrolled
          ? "rgba(5, 5, 8, 0.85)"
          : "rgba(5, 5, 8, 0.2)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 255, 136, 0.1)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <a
          href="#"
          className="text-sm tracking-wider font-bold"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--accent-primary)",
          }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          H.REPSWAL
          <span className="animate-blink" style={{ color: "var(--accent-primary)" }}>
            _
          </span>
        </a>

        {/* Right: Nav Links */}
        <div className="flex items-center gap-1 md:gap-2">
          {PORTFOLIO_DATA.navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <button
                key={link.label}
                onClick={() => handleClick(link.href)}
                className="relative px-3 py-1.5 text-xs tracking-wider transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: isActive
                    ? "var(--accent-primary)"
                    : "var(--text-muted)",
                }}
              >
                [{link.label}]
                {/* Active underline */}
                <span
                  className="absolute bottom-0 left-1/2 h-[1px] transition-all duration-300"
                  style={{
                    width: isActive ? "60%" : "0%",
                    transform: "translateX(-50%)",
                    background: "var(--accent-primary)",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
