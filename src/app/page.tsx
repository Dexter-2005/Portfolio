"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeatmapLoader from "@/components/Loader/HeatmapLoader";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import CPStats from "@/components/sections/CPStats";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-void)" }}
    >
      {/* Heatmap Loader */}
      {!loaded && <HeatmapLoader onComplete={handleLoaderComplete} />}

      {/* Portfolio Content */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Navbar />
            <Hero />
            <About />
            <CPStats />
            <Projects />
            <Skills />
            <Achievements />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
