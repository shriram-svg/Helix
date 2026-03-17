"use client";

import { motion, useInView } from "framer-motion";
import { useRef, MouseEvent, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SpotlightCard({
  children,
  className = "",
  delay = 0,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(viewRef, { once: true, margin: "-30px" });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
  }

  return (
    <motion.div
      ref={viewRef}
      initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.95, filter: "blur(8px)" }
      }
      transition={{ duration: 0.5, delay }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`spotlight-card relative rounded-2xl bg-white border border-helix-border card-shadow p-5 transition-all duration-300 hover:border-helix-green/30 ${className}`}
      >
        {children}
      </div>
    </motion.div>
  );
}
