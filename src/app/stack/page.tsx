"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SpotlightCard } from "@/components/SpotlightCard";

interface Supplement {
  name: string;
  dose: string;
  timing: string;
  evidence: number;
  color: string;
  category: "morning" | "afternoon" | "evening";
}

const supplements: Supplement[] = [
  {
    name: "Rapamycin",
    dose: "6mg",
    timing: "Weekly (Sunday)",
    evidence: 4,
    color: "#16a34a",
    category: "morning",
  },
  {
    name: "NMN",
    dose: "1000mg",
    timing: "Morning, fasted",
    evidence: 4,
    color: "#2563eb",
    category: "morning",
  },
  {
    name: "Metformin",
    dose: "500mg",
    timing: "Evening",
    evidence: 4,
    color: "#7c3aed",
    category: "evening",
  },
  {
    name: "Resveratrol",
    dose: "500mg",
    timing: "Morning, with fat",
    evidence: 3,
    color: "#dc2626",
    category: "morning",
  },
  {
    name: "Omega-3 (EPA/DHA)",
    dose: "2000mg",
    timing: "With meals",
    evidence: 5,
    color: "#ea580c",
    category: "afternoon",
  },
  {
    name: "Vitamin D3",
    dose: "5000 IU",
    timing: "Morning",
    evidence: 5,
    color: "#eab308",
    category: "morning",
  },
  {
    name: "Magnesium L-Threonate",
    dose: "144mg",
    timing: "Evening",
    evidence: 4,
    color: "#6366f1",
    category: "evening",
  },
  {
    name: "Creatine Monohydrate",
    dose: "5g",
    timing: "Morning",
    evidence: 5,
    color: "#0891b2",
    category: "morning",
  },
  {
    name: "Ashwagandha KSM-66",
    dose: "600mg",
    timing: "Evening",
    evidence: 3,
    color: "#059669",
    category: "evening",
  },
  {
    name: "CoQ10 (Ubiquinol)",
    dose: "200mg",
    timing: "Morning",
    evidence: 4,
    color: "#d97706",
    category: "morning",
  },
  {
    name: "Lion's Mane",
    dose: "1000mg",
    timing: "Morning",
    evidence: 3,
    color: "#f5f5f4",
    category: "morning",
  },
  {
    name: "Berberine",
    dose: "500mg",
    timing: "With meals",
    evidence: 3,
    color: "#a16207",
    category: "afternoon",
  },
  {
    name: "NAC",
    dose: "600mg",
    timing: "Morning",
    evidence: 3,
    color: "#475569",
    category: "morning",
  },
  {
    name: "Spermidine",
    dose: "1mg",
    timing: "Morning",
    evidence: 3,
    color: "#be185d",
    category: "morning",
  },
  {
    name: "Fisetin",
    dose: "500mg",
    timing: "Monthly (2-day course)",
    evidence: 3,
    color: "#9333ea",
    category: "morning",
  },
];

function MoleculeIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <polygon
        points="16,4 27,10 27,22 16,28 5,22 5,10"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <polygon
        points="16,8 23,12 23,20 16,24 9,20 9,12"
        stroke={color}
        strokeWidth="1"
        fill={color}
        fillOpacity="0.1"
      />
      <circle cx="16" cy="4" r="2" fill={color} fillOpacity="0.6" />
      <circle cx="27" cy="10" r="2" fill={color} fillOpacity="0.4" />
      <circle cx="5" cy="22" r="2" fill={color} fillOpacity="0.3" />
    </svg>
  );
}

function EvidenceDots({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i < count ? "bg-helix-green" : "bg-helix-border"
          }`}
        />
      ))}
    </div>
  );
}

export default function StackPage() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });
  const scheduleRef = useRef<HTMLDivElement>(null);
  const scheduleInView = useInView(scheduleRef, { once: true, margin: "-50px" });

  const morningSupps = supplements.filter((s) => s.category === "morning");
  const afternoonSupps = supplements.filter((s) => s.category === "afternoon");
  const eveningSupps = supplements.filter((s) => s.category === "evening");

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
          02
        </span>
        <h1
          className="text-3xl font-bold text-helix-black relative z-10"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Your Stack
        </h1>
        <p className="text-helix-silver text-sm mt-1 relative z-10">
          {supplements.length} active supplements and interventions
        </p>
      </motion.div>

      {/* Supplement Grid */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {supplements.map((supp, i) => (
          <SpotlightCard key={supp.name} delay={i * 0.05}>
            <div className="flex gap-4">
              {/* Color accent strip */}
              <div
                className="w-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: supp.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-helix-black leading-tight">
                      {supp.name}
                    </h3>
                    <p
                      className="text-lg font-bold text-helix-black mt-0.5"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {supp.dose}
                    </p>
                  </div>
                  <MoleculeIcon color={supp.color} />
                </div>
                <p className="text-xs text-helix-silver mb-2">{supp.timing}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-helix-silver uppercase tracking-wider">
                    Evidence
                  </span>
                  <EvidenceDots count={supp.evidence} />
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Daily Timing Schedule */}
      <motion.div
        ref={scheduleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={scheduleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2
          className="text-xl font-bold text-helix-black mb-6"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Daily Schedule
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {/* Morning */}
          <div className="bg-white rounded-2xl border border-helix-border p-5 card-shadow">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <h3 className="text-sm font-semibold text-helix-black">
                Morning
              </h3>
              <span className="text-xs text-helix-silver ml-auto">
                {morningSupps.length} items
              </span>
            </div>
            <div className="space-y-2">
              {morningSupps.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between py-1.5 border-b border-helix-border/50 last:border-0"
                >
                  <span className="text-sm text-helix-black">{s.name}</span>
                  <span
                    className="text-xs text-helix-silver"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {s.dose}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Afternoon */}
          <div className="bg-white rounded-2xl border border-helix-border p-5 card-shadow">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-orange-400" />
              <h3 className="text-sm font-semibold text-helix-black">
                Afternoon
              </h3>
              <span className="text-xs text-helix-silver ml-auto">
                {afternoonSupps.length} items
              </span>
            </div>
            <div className="space-y-2">
              {afternoonSupps.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between py-1.5 border-b border-helix-border/50 last:border-0"
                >
                  <span className="text-sm text-helix-black">{s.name}</span>
                  <span
                    className="text-xs text-helix-silver"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {s.dose}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Evening */}
          <div className="bg-white rounded-2xl border border-helix-border p-5 card-shadow">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-indigo-400" />
              <h3 className="text-sm font-semibold text-helix-black">
                Evening
              </h3>
              <span className="text-xs text-helix-silver ml-auto">
                {eveningSupps.length} items
              </span>
            </div>
            <div className="space-y-2">
              {eveningSupps.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between py-1.5 border-b border-helix-border/50 last:border-0"
                >
                  <span className="text-sm text-helix-black">{s.name}</span>
                  <span
                    className="text-xs text-helix-silver"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {s.dose}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
