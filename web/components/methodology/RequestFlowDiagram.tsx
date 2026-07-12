// components/methodology/RequestFlowDiagram.tsx
export function RequestFlowDiagram() {
  return (
    <div className="w-full overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
      <svg
        viewBox="0 0 900 340"
        className="mx-auto max-w-5xl"
        role="img"
        aria-label="Diagram: your app sends a request to Groat, which either returns a cached response instantly or routes the request to the cheapest capable provider"
      >
        <defs>
          <marker id="arrow-bronze" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--color-bronze)" />
          </marker>
          <marker id="arrow-verdigris" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--color-verdigris)" />
          </marker>
          <marker id="arrow-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--color-text-muted)" />
          </marker>
        </defs>

        {/* App box */}
        <rect x="30" y="140" width="150" height="60" rx="6" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
        <text x="105" y="175" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="13" fontWeight="500" fill="var(--color-text)">your app</text>

        {/* Groat box */}
        <rect x="340" y="90" width="180" height="160" rx="6" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
        <text x="430" y="112" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="13" fontWeight="500" fill="var(--color-text)">groat</text>
        <line x1="352" y1="170" x2="508" y2="170" stroke="var(--color-border)" />
        <text x="430" y="138" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fill="var(--color-text-muted)">semantic cache</text>
        <text x="430" y="153" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill="var(--color-text-muted)">local embeddings</text>
        <text x="430" y="200" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fill="var(--color-text-muted)">intent router</text>
        <text x="430" y="215" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill="var(--color-text-muted)">picks cheapest model</text>

        {/* Provider box */}
        <rect x="690" y="140" width="150" height="60" rx="6" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
        <text x="765" y="175" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="13" fontWeight="500" fill="var(--color-text)">provider</text>

        {/* request in */}
        <path d="M180,168 L336,168" stroke="var(--color-text-muted)" fill="none" markerEnd="url(#arrow-muted)" />
        <text x="258" y="158" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill="var(--color-text-muted)">request</text>

        {/* cache miss -> provider */}
        <path d="M524,168 L686,168" stroke="var(--color-bronze)" fill="none" markerEnd="url(#arrow-bronze)" />
        <text x="605" y="158" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill="var(--color-bronze)">cache miss → routed</text>

        {/* full price response back */}
        <path d="M765,203 C765,290 105,290 105,203" stroke="var(--color-text-muted)" fill="none" strokeDasharray="4 3" markerEnd="url(#arrow-muted)" />
        <text x="430" y="308" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill="var(--color-text-muted)">response, full provider cost</text>

        {/* cache hit shortcut */}
        <path d="M430,87 C430,32 105,32 105,136" stroke="var(--color-verdigris)" fill="none" markerEnd="url(#arrow-verdigris)" />
        <text x="267" y="47" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill="var(--color-verdigris)">cache hit → instant, $0, provider never called</text>
      </svg>
    </div>
  );
}