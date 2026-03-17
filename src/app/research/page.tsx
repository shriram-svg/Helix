"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { Button } from "@/components/Button";

type EvidenceType = "RCT" | "Observational" | "Animal Model" | "In Vitro";

interface Paper {
  title: string;
  journal: string;
  year: number;
  evidence: EvidenceType;
  grade: string;
  finding: string;
  effectSize: number;
  abstract: string;
}

const papers: Paper[] = [
  {
    title: "Rapamycin extends lifespan in mice",
    journal: "Nature",
    year: 2009,
    evidence: "RCT",
    grade: "A+",
    finding: "Median lifespan increased 14% in males, 9% in females",
    effectSize: 85,
    abstract:
      "Rapamycin, an inhibitor of the mTOR pathway, was administered to genetically heterogeneous mice beginning at 600 days of age. Both male and female mice showed significant lifespan extension, with median survival increasing by 14% in males and 9% in females. This was the first robust pharmacological intervention shown to extend mammalian lifespan across both sexes and multiple genetic backgrounds, providing strong evidence for mTOR as a central regulator of aging.",
  },
  {
    title: "NMN supplementation improves vascular function",
    journal: "Cell Metabolism",
    year: 2022,
    evidence: "RCT",
    grade: "A",
    finding: "NAD+ levels increased 38% after 12 weeks",
    effectSize: 72,
    abstract:
      "In this double-blind, placebo-controlled trial, healthy middle-aged adults received 250mg NMN daily for 12 weeks. Results showed a significant 38% increase in blood NAD+ levels, accompanied by improvements in arterial stiffness and endothelial function. The NMN group also demonstrated enhanced walking speed and grip strength compared to placebo, suggesting broad benefits for age-related vascular decline.",
  },
  {
    title: "Metformin and aging outcomes in diabetics",
    journal: "Diabetes Care",
    year: 2014,
    evidence: "Observational",
    grade: "B+",
    finding: "All-cause mortality reduced 6% vs non-diabetic controls",
    effectSize: 55,
    abstract:
      "This large retrospective cohort study compared survival outcomes of diabetic patients on metformin versus matched non-diabetic controls. Surprisingly, metformin-treated diabetics showed a 6% reduction in all-cause mortality compared to non-diabetic individuals, suggesting metformin may confer longevity benefits beyond glucose control. The study analyzed over 180,000 patients with a median follow-up of 2.8 years.",
  },
  {
    title: "Resveratrol activates SIRT1 in human cells",
    journal: "Nature",
    year: 2006,
    evidence: "In Vitro",
    grade: "A",
    finding: "SIRT1 activity increased 13-fold at 100\u03bcM",
    effectSize: 90,
    abstract:
      "Using fluorescent-labeled acetylated substrates, researchers demonstrated that resveratrol directly activates SIRT1 deacetylase activity by up to 13-fold at concentrations of 100\u03bcM. This activation was shown to lower the Km of SIRT1 for both NAD+ and its acetylated substrate, providing mechanistic insight into how resveratrol mimics caloric restriction at the molecular level in human cell lines.",
  },
  {
    title: "Caloric restriction improves cardiac aging markers",
    journal: "JAMA",
    year: 2023,
    evidence: "RCT",
    grade: "A+",
    finding: "Biological age reduced by 2.4 years over 2 years",
    effectSize: 78,
    abstract:
      "The CALERIE Phase 2 trial enrolled 220 healthy, non-obese adults randomized to 25% caloric restriction or ad libitum diet for 2 years. The CR group achieved a 2.4-year reduction in biological age as measured by the DunedinPACE epigenetic clock, alongside significant improvements in cardiometabolic risk factors including reduced LDL, lower blood pressure, and improved insulin sensitivity.",
  },
  {
    title: "Omega-3 and telomere length preservation",
    journal: "Brain Behav Immun",
    year: 2012,
    evidence: "RCT",
    grade: "B+",
    finding: "Higher omega-3 associated with reduced telomere shortening",
    effectSize: 48,
    abstract:
      "In a randomized controlled trial of 106 overweight, sedentary adults, 4 months of omega-3 supplementation (2.5g/day) led to significantly reduced telomere shortening compared to placebo. The omega-3 group also showed a 15% decrease in F2-isoprostanes (oxidative stress marker) and a favorable shift in the omega-6 to omega-3 ratio, suggesting protective effects against cellular aging.",
  },
  {
    title: "Senolytics clear senescent cells in humans",
    journal: "EBioMedicine",
    year: 2019,
    evidence: "RCT",
    grade: "A",
    finding: "Senescent cell burden reduced 30% in 3 days",
    effectSize: 82,
    abstract:
      "This first-in-human pilot study administered a senolytic cocktail (dasatinib 100mg + quercetin 1000mg) to patients with idiopathic pulmonary fibrosis over 3 intermittent doses. Results showed a 30% reduction in p16-expressing senescent cells in adipose tissue, improved 6-minute walk distance, and reduced frailty indices. No serious adverse events were reported, establishing proof-of-concept for senolytic therapy in humans.",
  },
  {
    title: "Exercise and VO2 max decline with aging",
    journal: "Circulation",
    year: 2018,
    evidence: "Observational",
    grade: "A",
    finding: "High-fitness adults show 50% less age-related decline",
    effectSize: 70,
    abstract:
      "A cross-sectional analysis of over 120,000 patients who underwent maximal exercise stress testing revealed that individuals in the top quartile of cardiorespiratory fitness exhibited approximately 50% less age-related decline in VO2 max compared to sedentary peers. Critically, low fitness was associated with mortality risk comparable to smoking, diabetes, and coronary artery disease, positioning exercise as the most potent longevity intervention.",
  },
];

const filterOptions: Array<{ label: string; value: string }> = [
  { label: "All", value: "All" },
  { label: "RCT", value: "RCT" },
  { label: "Observational", value: "Observational" },
  { label: "Animal", value: "Animal Model" },
  { label: "In Vitro", value: "In Vitro" },
];

export default function ResearchPage() {
  const [filter, setFilter] = useState("All");
  const [hoveredPaper, setHoveredPaper] = useState<number | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  const filteredPapers =
    filter === "All"
      ? papers
      : papers.filter((p) => p.evidence === filter);

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
          01
        </span>
        <h1
          className="text-3xl font-bold text-helix-black relative z-10"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Research Library
        </h1>
        <p className="text-helix-silver text-sm mt-1 relative z-10">
          Curated longevity studies with evidence ratings
        </p>
      </motion.div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex gap-2 mb-8"
      >
        {filterOptions.map((opt) => (
          <Button
            key={opt.value}
            variant={filter === opt.value ? "solid" : "outline"}
            shape="pill"
            size="sm"
            onClick={() => setFilter(opt.value)}
          >
            {opt.label}
          </Button>
        ))}
      </motion.div>

      {/* Papers Grid */}
      <div className="grid grid-cols-2 gap-5">
        {filteredPapers.map((paper, i) => (
          <motion.div
            key={paper.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * i }}
            className="bg-white rounded-2xl border border-helix-border p-6 card-shadow hover:border-helix-green/30 transition-all duration-300 cursor-pointer relative group"
            onMouseEnter={() => setHoveredPaper(i)}
            onMouseLeave={() => setHoveredPaper(null)}
          >
            <div className="flex items-start justify-between mb-3">
              <EvidenceBadge type={paper.evidence} />
              <span
                className="text-sm font-bold text-helix-green"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {paper.grade}
              </span>
            </div>

            <h3 className="text-base font-semibold text-helix-black mb-1 leading-snug">
              {paper.title}
            </h3>
            <p
              className="text-xs text-helix-silver mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {paper.journal} &middot; {paper.year}
            </p>

            <p className="text-sm text-helix-black/70 mb-4">{paper.finding}</p>

            {/* Effect Size Bar */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-helix-silver uppercase tracking-wider">
                  Effect Size
                </span>
                <span
                  className="text-[10px] text-helix-silver"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {paper.effectSize}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-helix-bg rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-helix-green rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${paper.effectSize}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                />
              </div>
            </div>

            {/* Hover Abstract */}
            {hoveredPaper === i && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center z-10 border border-helix-green/20"
              >
                <p className="text-xs text-helix-silver uppercase tracking-wider mb-2">
                  Abstract
                </p>
                <p className="text-sm text-helix-black/80 leading-relaxed">
                  {paper.abstract}
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
