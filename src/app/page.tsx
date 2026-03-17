"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ProgressRing } from "@/components/ProgressRing";
import { SpotlightCard } from "@/components/SpotlightCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Button } from "@/components/Button";

const metrics = [
  {
    name: "VO2 Max",
    value: 48.2,
    unit: "ml/kg/min",
    optimal: 55,
    score: 87,
    color: "#16a34a",
  },
  {
    name: "Resting HR",
    value: 52,
    unit: "bpm",
    optimal: 55,
    score: 94,
    color: "#16a34a",
  },
  {
    name: "HRV",
    value: 68,
    unit: "ms",
    optimal: 75,
    score: 91,
    color: "#16a34a",
  },
  {
    name: "Fasting Glucose",
    value: 82,
    unit: "mg/dL",
    optimal: 85,
    score: 96,
    color: "#16a34a",
  },
];

const supplements = [
  { name: "Rapamycin", dose: "6mg", color: "#16a34a" },
  { name: "NMN", dose: "1g", color: "#2563eb" },
  { name: "Metformin", dose: "500mg", color: "#7c3aed" },
  { name: "Omega-3", dose: "2g", color: "#ea580c" },
  { name: "Vitamin D3", dose: "5000 IU", color: "#eab308" },
  { name: "Resveratrol", dose: "500mg", color: "#dc2626" },
];

const hrvData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  hrv: Math.round(55 + (13 * i) / 29 + (((i * 7 + 3) % 5) - 2)),
}));

export default function DashboardPage() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true, margin: "-50px" });

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-10"
      >
        <div>
          <h1
            className="text-3xl font-bold text-helix-black"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {greeting}
          </h1>
          <p className="text-helix-silver text-sm mt-1">{dateStr}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right mr-2">
            <p className="text-xs text-helix-silver uppercase tracking-wider">
              Protocol Score
            </p>
            <p
              className="text-sm font-semibold text-helix-green"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              92 / 100
            </p>
          </div>
          <ProgressRing value={92} size={64} strokeWidth={5} label="score" />
        </div>
      </motion.div>

      {/* Bento Grid - Metric Cards */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {metrics.map((metric, i) => (
          <SpotlightCard key={metric.name} delay={i * 0.1}>
            <div className="flex flex-col items-center text-center">
              <ProgressRing
                value={metric.score}
                size={80}
                strokeWidth={6}
                color={metric.color}
              />
              <p className="text-sm font-medium text-helix-black mt-3">
                {metric.name}
              </p>
              <p
                className="text-xl font-bold mt-1"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <AnimatedCounter
                  value={metric.value}
                  decimals={metric.name === "VO2 Max" ? 1 : 0}
                />
              </p>
              <p className="text-xs text-helix-silver">{metric.unit}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Today's Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-10"
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-xl font-bold text-helix-black"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Today&apos;s Stack
          </h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {supplements.map((supp, i) => (
            <motion.div
              key={supp.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              className="bg-white rounded-xl border border-helix-border p-4 card-shadow hover:border-helix-green/30 transition-all duration-200 cursor-pointer group"
            >
              <div
                className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: supp.color }}
              >
                {supp.name.charAt(0)}
              </div>
              <p className="text-sm font-medium text-helix-black group-hover:text-helix-green transition-colors">
                {supp.name}
              </p>
              <p
                className="text-xs text-helix-silver mt-0.5"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {supp.dose}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom row: Chart + Active Protocol */}
      <div className="grid grid-cols-3 gap-4">
        {/* HRV Chart */}
        <motion.div
          ref={chartRef}
          initial={{ opacity: 0, y: 20 }}
          animate={chartInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-2 bg-white rounded-2xl border border-helix-border p-6 card-shadow"
        >
          <h3
            className="text-lg font-bold text-helix-black mb-4"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            HRV Trend (30 Days)
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={hrvData}>
              <defs>
                <linearGradient id="hrvGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                domain={[50, 75]}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="hrv"
                stroke="#16a34a"
                strokeWidth={2}
                fill="url(#hrvGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Active Protocol */}
        <SpotlightCard delay={0.3}>
          <div className="flex flex-col items-center text-center h-full justify-center py-4">
            <p className="text-xs text-helix-silver uppercase tracking-wider mb-3">
              Active Protocol
            </p>
            <ProgressRing value={92} size={100} strokeWidth={7} label="done" />
            <h3 className="text-lg font-bold text-helix-black mt-4">
              Blueprint Protocol
            </h3>
            <p className="text-xs text-helix-silver mt-1">
              92% completion this week
            </p>
            <Button variant="soft" shape="pill" size="sm" className="mt-4">
              View Details
            </Button>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
