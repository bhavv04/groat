// components/features/FeatureGrid.tsx
import {
  Plug,
  Repeat,
  Fingerprint,
  Layers,
  BarChart3,
  Package,
  type LucideIcon,
} from "lucide-react";

const features: { label: string; title: string; body: string; icon: LucideIcon }[] = [
  {
    label: "drop-in",
    title: "Drop-in compatibility",
    body: "One line change. Point your existing OpenAI SDK at Groat instead of the provider — everything else in your codebase stays untouched.",
    icon: Plug,
  },
  {
    label: "cache",
    title: "Semantic cache",
    body: "Not exact-match. Groat understands when two requests mean the same thing, even if the wording differs, and serves the cached response.",
    icon: Repeat,
  },
  {
    label: "embeddings",
    title: "Local embeddings",
    body: "Cache matching runs on-device with candle. No request data leaves your machine to compute a similarity score.",
    icon: Fingerprint,
  },
  {
    label: "routing",
    title: "Prompt cache injection",
    body: "Groat automatically structures requests to qualify for provider-side prompt caching discounts — no manual prompt engineering required.",
    icon: Layers,
  },
  {
    label: "dashboard",
    title: "Cost dashboard",
    body: "See exactly what you're spending, what Groat saved, and which requests could have used a cheaper model.",
    icon: BarChart3,
  },
  {
    label: "binary",
    title: "Single binary",
    body: "cargo install groat && groat up. No Docker, no dependencies, no config file required to get started.",
    icon: Package,
  },
];

export function FeatureGrid() {
  return (
    <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {features.map(({ label, title, body, icon: Icon }) => (
        <div key={label} className="group">
          <div className="inline-flex rounded border border-border p-2.5 transition-colors group-hover:border-bronze">
            <Icon
              size={18}
              className="text-verdigris transition-transform duration-200 group-hover:scale-110 group-hover:text-bronze"
            />
          </div>

          <h3 className="mt-4 font-display text-lg font-medium text-text">
            {title}
          </h3>
          <p className="mt-2 text-sm text-text-muted">{body}</p>
        </div>
      ))}
    </div>
  );
}