// components/methodology/Methodology.tsx
import { RequestFlowDiagram } from "./RequestFlowDiagram";

const steps = [
  {
    n: "01",
    title: "Point your app at Groat",
    body: "Swap the base URL in your OpenAI SDK. Keep your prompts, your code, your framework exactly as they are.",
  },
  {
    n: "02",
    title: "Groat decides",
    body: "Every request is checked against the semantic cache and scored for routing — before it ever leaves your machine.",
  },
  {
    n: "03",
    title: "Watch what you saved",
    body: "The dashboard shows every cache hit, every downgraded request, and exactly how much smaller your bill got.",
  },
];

export function Methodology() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-display text-3xl font-bold text-text">How it works</h2>

      <div className="mt-10 rounded-xl bg-bg-elevated">
        <RequestFlowDiagram />
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {steps.map((step) => (
          <div key={step.n}>
            <span className="text-sm text-bronze">{step.n}</span>
            <h3 className="mt-2 font-display text-lg font-medium text-text">{step.title}</h3>
            <p className="mt-2 text-sm text-text-muted">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}