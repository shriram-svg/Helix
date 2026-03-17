"use client";

type EvidenceType = "RCT" | "Observational" | "Animal Model" | "In Vitro";

interface EvidenceBadgeProps {
  type: EvidenceType;
}

const badgeStyles: Record<EvidenceType, string> = {
  RCT: "bg-green-50 text-green-700 border-green-200",
  Observational: "bg-blue-50 text-blue-700 border-blue-200",
  "Animal Model": "bg-amber-50 text-amber-700 border-amber-200",
  "In Vitro": "bg-purple-50 text-purple-700 border-purple-200",
};

export function EvidenceBadge({ type }: EvidenceBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyles[type]}`}
    >
      {type}
    </span>
  );
}
