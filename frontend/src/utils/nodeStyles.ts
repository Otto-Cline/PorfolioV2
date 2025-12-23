import type { NodeType } from "../types/index.ts";

// Size configuration by category
const SIZE_CONFIG: Record<NodeType, string> = {
  insig: "w-5 h-5 bg-gray-600",
  root: "w-10 h-10 bg-yellow-500",
  job: "w-9 h-9",
  project: "w-6 h-6",
  education: "w-8 h-8",
};

export const getSizeClass = (category: NodeType): string => {
  return SIZE_CONFIG[category] || "w-10 h-10";
};

// Shape configuration by category
const SHAPE_CONFIG: Record<NodeType, string> = {
  job: "[clip-path:polygon(75%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]",
  project: "rounded-md rotate-45",
  education: "rounded-full",
  insig: "rounded-full",
  root: "rounded-full",
};

export const getShapeClass = (category: NodeType): string => {
  return SHAPE_CONFIG[category] || "rounded-full";
};

// Color warmth based on recency (0-1)
const COLOR_THRESHOLDS = [
  { threshold: 0.8, color: "bg-amber-800" },
  { threshold: 0.5, color: "bg-amber-600" },
  { threshold: 0.3, color: "bg-amber-400" },
];

export const getColorWarmth = (recency: number): string => {
  for (const { threshold, color } of COLOR_THRESHOLDS) {
    if (recency > threshold) return color;
  }
  return "bg-gray-600";
};

// Title visibility by category
export const getTitleOpacity = (category: NodeType): string => {
  return category === "insig" ? "opacity-0" : "opacity-80";
};

// Calculate recency score (0-1) based on dates
export const calculateRecency = (start: Date, end?: Date): number => {
  if (!end) return 1;  // Active = most recent
  if (!start) return 0;

  const now = new Date();
  const baselineDate = new Date("2020-01-01");
  
  const totalTime = now.getTime() - baselineDate.getTime();
  const nodeAge = now.getTime() - end.getTime();
  
  return Math.max(0, 1 - nodeAge / totalTime);
};