"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { AnimatedCounter } from "@/components/AnimatedCounter";

interface Biomarker {
  name: string;
  value: number;
  unit: string;
  refRange: string;
  status: "Optimal" | "Normal" | "Needs Attention";
  trend: number[];
  suggestion: string;
  decimals: number;
}

const biomarkers: Biomarker[] = [
  {
    name: "VO2 Max",
    value: 48.2,
    unit: "ml/kg/min",
    refRange: "40-60",
    status: "Optimal",
    trend: [42, 43, 44, 45, 44, 46, 47, 46, 47, 48, 48, 48.2],
    suggestion: "Add Zone 2 training 4x/week to push toward 55+",
    decimals: 1,
  },
  {
    name: "Resting Heart Rate",
    value: 52,
    unit: "bpm",
    refRange: "50-70",
    status: "Optimal",
    trend: [58, 57, 56, 55, 54, 54, 53, 53, 52, 52, 52, 52],
    suggestion: "Maintain current exercise regimen; consider cold exposure",
    decimals: 0,
  },
  {
    name: "HRV (RMSSD)",
    value: 68,
    unit: "ms",
    refRange: "50-100",
    status: "Optimal",
    trend: [55, 58, 60, 62, 63, 64, 65, 66, 67, 67, 68, 68],
    suggestion: "Prioritize sleep quality and stress management for 75+ target",
    decimals: 0,
  },
  {
    name: "Fasting Glucose",
    value: 82,
    unit: "mg/dL",
    refRange: "70-100",
    status: "Optimal",
    trend: [88, 87, 85, 84, 84, 83, 83, 82, 82, 82, 82, 82],
    suggestion: "Continue metformin and post-meal walks for glucose optimization",
    decimals: 0,
  },
  {
    name: "HbA1c",
    value: 5.1,
    unit: "%",
    refRange: "4.0-5.6",
    status: "Optimal",
    trend: [5.4, 5.3, 5.3, 5.2, 5.2, 5.2, 5.1, 5.1, 5.1, 5.1, 5.1, 5.1],
    suggestion: "Excellent range; maintain current glucose management protocol",
    decimals: 1,
  },
  {
    name: "Testosterone",
    value: 680,
    unit: "ng/dL",
    refRange: "300-1000",
    status: "Normal",
    trend: [620, 630, 640, 650, 660, 665, 670, 675, 678, 680, 680, 680],
    suggestion: "Consider resistance training and sleep optimization for boost",
    decimals: 0,
  },
  {
    name: "DHEA-S",
    value: 320,
    unit: "\u03bcg/dL",
    refRange: "200-500",
    status: "Normal",
    trend: [290, 295, 300, 305, 310, 315, 318, 320, 320, 320, 320, 320],
    suggestion: "Trending well; continue stress management and exercise",
    decimals: 0,
  },
  {
    name: "hsCRP",
    value: 0.4,
    unit: "mg/L",
    refRange: "<1.0",
    status: "Optimal",
    trend: [0.8, 0.7, 0.7, 0.6, 0.6, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4],
    suggestion: "Excellent inflammation marker; omega-3 protocol is working",
    decimals: 1,
  },
  {
    name: "Vitamin D",
    value: 62,
    unit: "ng/mL",
    refRange: "40-80",
    status: "Optimal",
    trend: [35, 40, 45, 48, 52, 55, 58, 60, 61, 62, 62, 62],
    suggestion: "Maintain 5000 IU daily; retest in 3 months",
    decimals: 0,
  },
  {
    name: "ApoB",
    value: 68,
    unit: "mg/dL",
    refRange: "<90",
    status: "Optimal",
    trend: [85, 82, 80, 78, 75, 73, 72, 70, 69, 68, 68, 68],
    suggestion: "Excellent cardiovascular risk marker; continue current approach",
    decimals: 0,
  },
  {
    name: "Triglycerides",
    value: 62,
    unit: "mg/dL",
    refRange: "<150",
    status: "Optimal",
    trend: [90, 85, 80, 78, 75, 72, 70, 68, 65, 63, 62, 62],
    suggestion: "Outstanding level; omega-3 and low-carb approach effective",
    decimals: 0,
  },
  {
    name: "Grip Strength",
    value: 52,
    unit: "kg",
    refRange: "40-60",
    status: "Optimal",
    trend: [45, 46, 47, 48, 49, 50, 50, 51, 51, 52, 52, 52],
    suggestion: "Add dead hangs and farmer carries for continued improvement",
    decimals: 0,
  },
];

const statusColors = {
  Optimal: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  Normal: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  "Needs Attention": { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
};

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const chartData = data.map((v, i) => ({ v, i }));
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function BiomarkersPage() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      {/* Page Title */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative mb-10"
      >
        <span
          className="absolute -top-8 -left-2 text-[120px] font-bold text-helix-border/40 leading-none select-none pointer-events-none"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          03
        </span>
        <h1
          className="text-3xl font-bold text-helix-black relative z-10"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Biomarkers
        </h1>
        <p className="text-helix-silver text-sm mt-1 relative z-10">
          Track your key health metrics over time
        </p>
      </motion.div>

      {/* Biomarker Grid */}
      <div className="grid grid-cols-3 gap-4">
        {biomarkers.map((marker, i) => {
          const sc = statusColors[marker.status];
          const sparkColor =
            marker.status === "Optimal"
              ? "#16a34a"
              : marker.status === "Normal"
              ? "#d97706"
              : "#dc2626";

          return (
            <motion.div
              key={marker.name}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-helix-border p-5 card-shadow hover:border-helix-green/30 transition-all duration-300 group relative"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-medium text-helix-black">
                  {marker.name}
                </h3>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${sc.bg} ${sc.text}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                  {marker.status}
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <AnimatedCounter
                  value={marker.value}
                  decimals={marker.decimals}
                  className="text-2xl font-bold text-helix-black"
                />
                <span className="text-xs text-helix-silver">{marker.unit}</span>
              </div>

              <p
                className="text-[10px] text-helix-silver mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Ref: {marker.refRange}
              </p>

              <Sparkline data={marker.trend} color={sparkColor} />

              {/* Hover suggestion */}
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl p-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto border border-helix-green/20">
                <div className="text-center">
                  <p className="text-[10px] text-helix-silver uppercase tracking-wider mb-2">
                    Optimization Suggestion
                  </p>
                  <p className="text-sm text-helix-black/80 leading-relaxed">
                    {marker.suggestion}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
