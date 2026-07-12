// components/features/Features.tsx
import { FeatureGrid } from "./FeatureGrid";
import { TechnicalDeepDive } from "./TechnicalDeepDive";
import { TechStackStrip } from "./TechStackStrip";

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-display text-3xl font-bold text-text">
        Built to actually reduce your bill
      </h2>
      <p className="mt-3 max-w-xl text-text-muted">
        Not another dashboard that tells you what you already spent.
      </p>

      <div className="mt-10">
        <FeatureGrid />
      </div>

      <div className="mt-24">
        <h3 className="font-display text-xl font-medium text-text">
          Under the hood
        </h3>
        <div className="mt-6">
          <TechnicalDeepDive />
        </div>
      </div>

      <div className="mt-16">
        <TechStackStrip />
      </div>
    </section>
  );
}