import type { Severity } from "@/lib/types";

/** Tailwind class sets per severity, shared by every component. */
export const SEVERITY_STYLES: Record<
  Severity,
  { chip: string; dot: string; border: string; mark: string; bar: string }
> = {
  high: {
    chip: "bg-high-soft text-high",
    dot: "bg-high",
    border: "border-l-high",
    mark: "mark-high",
    bar: "bg-high",
  },
  medium: {
    chip: "bg-medium-soft text-medium",
    dot: "bg-medium",
    border: "border-l-medium",
    mark: "mark-medium",
    bar: "bg-medium",
  },
  low: {
    chip: "bg-low-soft text-low",
    dot: "bg-low",
    border: "border-l-low",
    mark: "mark-low",
    bar: "bg-low",
  },
};

export const SEVERITY_ORDER: Severity[] = ["high", "medium", "low"];
