"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
  color = "#16a34a",
  label,
}: ProgressRingProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg ref={ref} width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            isInView
              ? { strokeDashoffset: offset }
              : { strokeDashoffset: circumference }
          }
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-data text-lg font-semibold"
          style={{ fontFamily: "'JetBrains Mono', monospace", color }}
        >
          {value}
        </span>
        {label && (
          <span className="text-[10px] text-helix-silver uppercase tracking-wider mt-0.5">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
