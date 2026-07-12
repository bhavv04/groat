// components/features/TechnicalDeepDive.tsx
import { Fingerprint, Waypoints, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Panel = {
  icon: LucideIcon;
  label: string;
  heading: string;
  points: string[];
};

const panels: Panel[] = [
  {
    icon: Fingerprint,
    label: "semantic cache",
    heading: "Vector similarity, not string matching",
    points: [
      "requests embedded locally via candle — nothing leaves the machine",
      "matched against prior requests in LanceDB by cosine similarity",
      "eviction policy: LRU — coldest entries drop first, hot paths stay cached",
      "similarity threshold is tunable per route",
    ],
  },
  {
    icon: Waypoints,
    label: "intent router",
    heading: "Three signals, one routing decision",
    points: [
      "heuristic scoring on prompt length and structural complexity",
      "a lightweight local classifier estimates task difficulty",
      "your explicit routing rules always take priority when they match",
      "downgrades only fire once confidence clears your threshold",
    ],
  },
  {
    icon: Layers,
    label: "cache injection",
    heading: "Built for provider-side caching",
    points: [
      "static content (system prompts, few-shot examples) reordered to a stable prefix",
      "that's what OpenAI and Anthropic prompt caching actually looks for",
      "done automatically — no manual prompt restructuring on your end",
    ],
  },
];

export function TechnicalDeepDive() {
  return (
    <div className="grid gap-8 sm:grid-cols-3 lg:gap-10">
      {panels.map(({ icon: Icon, label, heading, points }) => (
        <div key={label} className="group">
          <Icon
            size={22}
            strokeWidth={1.75}
            className="text-text-muted transition-all duration-200 group-hover:scale-110 group-hover:text-verdigris"
          />

          <p className="mt-4  text-xs uppercase tracking-widest text-text-muted">
            {label}
          </p>

          <h3 className="mt-2 font-display text-lg font-medium text-text">
            {heading}
          </h3>

          <ul className="mt-4 space-y-2.5">
            {points.map((point) => (
              <li
                key={point}
                className=" text-xs leading-relaxed text-text-muted"
              >
                <span className="text-bronze">// </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}