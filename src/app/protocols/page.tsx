"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ProgressRing } from "@/components/ProgressRing";
import { Button } from "@/components/Button";
import { IconChevronDown } from "@tabler/icons-react";

interface Protocol {
  name: string;
  description: string;
  score: number;
  steps: string[];
}

const protocols: Protocol[] = [
  {
    name: "Blueprint Protocol",
    description: "Bryan Johnson-inspired comprehensive longevity protocol",
    score: 92,
    steps: [
      "Wake at 5:00 AM consistently",
      "Morning supplement stack (NMN, Resveratrol, D3, etc.)",
      "Precise caloric intake of 1977 kcal daily",
      "Exercise for 1 hour (alternating strength and cardio)",
      "Evening wind-down routine starting at 7:30 PM",
      "Sleep by 8:30 PM in temperature-controlled room",
    ],
  },
  {
    name: "Rapamycin Longevity",
    description: "mTOR inhibition protocol for cellular rejuvenation",
    score: 88,
    steps: [
      "Take 6mg rapamycin every Sunday morning",
      "Monitor blood work monthly (CBC, CMP, lipids)",
      "Track mTOR pathway markers quarterly",
      "Combine with periodic fasting (24-48hr monthly)",
    ],
  },
  {
    name: "Zone 2 Cardio",
    description: "Mitochondrial density and aerobic base building",
    score: 95,
    steps: [
      "4x per week, 45-minute sessions minimum",
      "Maintain heart rate between 120-140 bpm",
      "Emphasis on nasal breathing throughout",
      "Track VO2 max with quarterly testing",
    ],
  },
  {
    name: "Cold Exposure",
    description: "Hormetic stress for metabolic and immune benefits",
    score: 78,
    steps: [
      "3-5 minute cold shower daily (end of shower)",
      "Weekend ice bath at 11\u00b0C for 10 minutes",
      "Track HRV response post-exposure",
      "Gradual temperature decrease over 8-week cycles",
    ],
  },
  {
    name: "Senolytics Cycling",
    description: "Periodic clearance of senescent cells",
    score: 82,
    steps: [
      "Fisetin 500mg for 2 consecutive days each month",
      "Quercetin 1g on senolytic days",
      "48-hour fast during each senolytic cycle",
      "Blood panel (p16, SA-\u03b2-gal) before and after each cycle",
    ],
  },
  {
    name: "Circadian Optimization",
    description: "Align biology with natural light-dark cycles",
    score: 90,
    steps: [
      "Morning sunlight exposure for 10+ minutes within 1 hour of waking",
      "Blue light filter on all screens after 7:00 PM",
      "Consistent sleep and wake times (\u00b130 min variance)",
      "Temperature-controlled bedroom at 18\u00b0C (65\u00b0F)",
    ],
  },
  {
    name: "NAD+ Restoration",
    description: "Replenish cellular energy currency for repair",
    score: 86,
    steps: [
      "NMN 1g daily, taken in the morning on empty stomach",
      "Niacin 50mg with meals as NAD+ precursor support",
      "Avoid excessive alcohol (depletes NAD+)",
      "Track NAD+ levels quarterly via intracellular assay",
    ],
  },
  {
    name: "Glucose Optimization",
    description: "Minimize glycemic variability for metabolic health",
    score: 94,
    steps: [
      "Continuous glucose monitor (CGM) for real-time feedback",
      "15-minute walk after every meal to blunt glucose spikes",
      "Protein-first eating order at each meal",
      "Apple cider vinegar (1 tbsp) before carbohydrate-heavy meals",
    ],
  },
];

function ProtocolCard({ protocol, index }: { protocol: Protocol; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white rounded-2xl border border-helix-border card-shadow hover:border-helix-green/30 transition-all duration-300 overflow-hidden"
    >
      <div
        className="p-5 cursor-pointer flex items-center gap-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ProgressRing
          value={protocol.score}
          size={56}
          strokeWidth={4}
          color={
            protocol.score >= 90
              ? "#16a34a"
              : protocol.score >= 80
              ? "#2563eb"
              : "#d97706"
          }
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-helix-black">
            {protocol.name}
          </h3>
          <p className="text-sm text-helix-silver mt-0.5">
            {protocol.description}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-sm font-bold text-helix-green"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {protocol.score}/100
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <IconChevronDown size={18} className="text-helix-silver" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-helix-border">
              <div className="pt-4 space-y-3">
                {protocol.steps.map((step, si) => (
                  <div key={si} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-helix-bg flex items-center justify-center text-xs font-semibold text-helix-silver"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {si + 1}
                    </span>
                    <p className="text-sm text-helix-black/80 pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="soft" shape="pill" size="sm">
                  Start Protocol
                </Button>
                <Button variant="ghost" shape="pill" size="sm">
                  Edit Steps
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProtocolsPage() {
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
          04
        </span>
        <h1
          className="text-3xl font-bold text-helix-black relative z-10"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Protocols
        </h1>
        <p className="text-helix-silver text-sm mt-1 relative z-10">
          Structured longevity interventions with step-by-step guidance
        </p>
      </motion.div>

      {/* Protocol Cards */}
      <div className="space-y-4">
        {protocols.map((protocol, i) => (
          <ProtocolCard key={protocol.name} protocol={protocol} index={i} />
        ))}
      </div>
    </div>
  );
}
