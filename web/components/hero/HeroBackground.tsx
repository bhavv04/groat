// components/hero/HeroBackground.tsx
export function HeroBackground() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.16] dark:opacity-[0.22]"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <marker
          id="hero-arrow-bronze"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path
            d="M1,1 L8,5 L1,9"
            fill="none"
            stroke="var(--color-bronze)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
        <marker
          id="hero-arrow-verdigris"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path
            d="M1,1 L8,5 L1,9"
            fill="none"
            stroke="var(--color-verdigris)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      {/* Primary trace — top-left to mid-right, weaving through one component pad */}
      <path
        d="M-40,120 L184,120 L200,136 L200,244 L216,260 L444,260 L460,244 L460,116 L476,100 L684,100 L700,116 L700,204 L716,220 L924,220 L940,236 L940,324 L956,340 L1080,340"
        stroke="var(--color-bronze)"
        strokeWidth="1.4"
        fill="none"
        markerEnd="url(#hero-arrow-bronze)"
      />

      {/* Primary trace — bottom-right to mid-left, weaving through one component pad */}
      <path
        d="M1250,500 L1016,500 L1000,484 L1000,396 L984,380 L776,380 L760,396 L760,464 L744,480 L556,480 L540,496 L540,544 L524,560 L336,560 L320,544 L320,456 L304,440 L120,440"
        stroke="var(--color-verdigris)"
        strokeWidth="1.4"
        fill="none"
        markerEnd="url(#hero-arrow-verdigris)"
      />

      {/* Secondary trace — top-right corner */}
      <path
        d="M1250,80 L1056,80 L1040,96 L1040,164 L1024,180 L900,180"
        stroke="var(--color-bronze)"
        strokeWidth="1"
        opacity="0.75"
        fill="none"
        markerEnd="url(#hero-arrow-bronze)"
      />

      {/* Secondary trace — bottom-left corner */}
      <path
        d="M-40,560 L124,560 L140,544 L140,496 L156,480 L280,480"
        stroke="var(--color-verdigris)"
        strokeWidth="1"
        opacity="0.75"
        fill="none"
        markerEnd="url(#hero-arrow-verdigris)"
      />

      {/* New trace — upper-left, weaving down into a fourth pad */}
      <path
        d="M-40,40 L100,40 L116,56 L116,148 L132,164 L260,164 L276,148 L276,72 L292,56 L420,56"
        stroke="var(--color-verdigris)"
        strokeWidth="1"
        opacity="0.7"
        fill="none"
        markerEnd="url(#hero-arrow-verdigris)"
      />

      {/* New trace — right edge, mid height, feeding into the top-right pad */}
      <path
        d="M1250,240 L1120,240 L1104,256 L1104,320 L1088,336 L980,336 L964,320 L964,260 L948,244 L860,244"
        stroke="var(--color-bronze)"
        strokeWidth="1"
        opacity="0.7"
        fill="none"
        markerEnd="url(#hero-arrow-bronze)"
      />

      {/* New trace — lower-left, short run into a fifth pad */}
      <path
        d="M-40,340 L96,340 L112,356 L112,420 L128,436 L220,436"
        stroke="var(--color-bronze)"
        strokeWidth="1"
        opacity="0.65"
        fill="none"
        markerEnd="url(#hero-arrow-bronze)"
      />

      {/* New trace — bottom edge, long horizontal run */}
      <path
        d="M1250,560 L900,560 L884,544 L884,480 L868,464 L620,464"
        stroke="var(--color-verdigris)"
        strokeWidth="1"
        opacity="0.65"
        fill="none"
        markerEnd="url(#hero-arrow-verdigris)"
      />

      {/* Dead-end stub traces — texture only, no arrowhead */}
      <path d="M560,40 L560,90" stroke="var(--color-text-muted)" strokeWidth="1" fill="none" />
      <path
        d="M1120,560 L1120,516 L1136,500 L1180,500"
        stroke="var(--color-text-muted)"
        strokeWidth="1"
        fill="none"
      />
      <path d="M40,300 L40,360" stroke="var(--color-text-muted)" strokeWidth="1" fill="none" />
      <path d="M1160,180 L1160,120" stroke="var(--color-text-muted)" strokeWidth="1" fill="none" />
      <path d="M640,560 L640,600" stroke="var(--color-text-muted)" strokeWidth="1" fill="none" />

      {/* Component pads at trace junctions */}
      <g stroke="var(--color-bronze)" strokeWidth="1" fill="none" opacity="0.7">
        <rect x="438" y="238" width="44" height="44" rx="3" />
        <line x1="460" y1="228" x2="460" y2="238" />
        <line x1="460" y1="282" x2="460" y2="292" />
      </g>
      <g stroke="var(--color-verdigris)" strokeWidth="1" fill="none" opacity="0.7">
        <rect x="738" y="458" width="44" height="44" rx="3" />
        <line x1="738" y1="480" x2="728" y2="480" />
        <line x1="782" y1="480" x2="792" y2="480" />
      </g>
      <rect
        x="1018"
        y="58"
        width="44"
        height="44"
        rx="3"
        stroke="var(--color-bronze)"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <rect
        x="238"
        y="142"
        width="38"
        height="38"
        rx="3"
        stroke="var(--color-verdigris)"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <rect
        x="942"
        y="314"
        width="38"
        height="38"
        rx="3"
        stroke="var(--color-bronze)"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />

      {/* Via points at every bend */}
      <g fill="var(--color-bronze)" opacity="0.7">
        <circle cx="200" cy="120" r="3" />
        <circle cx="200" cy="260" r="3" />
        <circle cx="700" cy="100" r="3" />
        <circle cx="700" cy="220" r="3" />
        <circle cx="940" cy="220" r="3" />
        <circle cx="940" cy="340" r="3" />
        <circle cx="1040" cy="180" r="3" />
        <circle cx="1104" cy="256" r="3" />
        <circle cx="1088" cy="336" r="3" />
        <circle cx="112" cy="356" r="3" />
      </g>
      <g fill="var(--color-verdigris)" opacity="0.7">
        <circle cx="1000" cy="500" r="3" />
        <circle cx="1000" cy="380" r="3" />
        <circle cx="760" cy="380" r="3" />
        <circle cx="540" cy="480" r="3" />
        <circle cx="540" cy="560" r="3" />
        <circle cx="320" cy="560" r="3" />
        <circle cx="320" cy="440" r="3" />
        <circle cx="140" cy="480" r="3" />
        <circle cx="116" cy="148" r="3" />
        <circle cx="276" cy="148" r="3" />
        <circle cx="884" cy="480" r="3" />
      </g>
      <circle cx="560" cy="90" r="2.5" fill="var(--color-text-muted)" opacity="0.6" />
      <circle cx="1120" cy="500" r="2.5" fill="var(--color-text-muted)" opacity="0.6" />
      <circle cx="40" cy="330" r="2.5" fill="var(--color-text-muted)" opacity="0.6" />
      <circle cx="1160" cy="150" r="2.5" fill="var(--color-text-muted)" opacity="0.6" />

      {/* Ambient signal pulses — hidden for reduced-motion users */}
      <g className="motion-reduce:hidden">
        <circle r="3.5" fill="var(--color-bronze)">
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            path="M-40,120 L184,120 L200,136 L200,244 L216,260 L444,260 L460,244 L460,116 L476,100 L684,100 L700,116 L700,204 L716,220 L924,220 L940,236 L940,324 L956,340 L1080,340"
          />
        </circle>
        <circle r="3.5" fill="var(--color-verdigris)">
          <animateMotion
            dur="10s"
            begin="1s"
            repeatCount="indefinite"
            path="M1250,500 L1016,500 L1000,484 L1000,396 L984,380 L776,380 L760,396 L760,464 L744,480 L556,480 L540,496 L540,544 L524,560 L336,560 L320,544 L320,456 L304,440 L120,440"
          />
        </circle>
        <circle r="3" fill="var(--color-bronze)" opacity="0.8">
          <animateMotion
            dur="9s"
            begin="2.5s"
            repeatCount="indefinite"
            path="M1250,240 L1120,240 L1104,256 L1104,320 L1088,336 L980,336 L964,320 L964,260 L948,244 L860,244"
          />
        </circle>
        <circle r="3" fill="var(--color-verdigris)" opacity="0.8">
          <animateMotion
            dur="11s"
            begin="0.5s"
            repeatCount="indefinite"
            path="M-40,40 L100,40 L116,56 L116,148 L132,164 L260,164 L276,148 L276,72 L292,56 L420,56"
          />
        </circle>
      </g>
    </svg>
  );
}