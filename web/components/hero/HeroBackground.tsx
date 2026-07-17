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

        {/* PCB via grid — faint dot pattern reads as the board surface */}
        <pattern id="hero-pcb-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="1" fill="var(--color-text-muted)" opacity="0.35" />
        </pattern>
      </defs>

      {/* Board surface grid */}
      <rect x="0" y="0" width="1200" height="600" fill="url(#hero-pcb-grid)" />

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

      {/* Trace — upper-left, weaving down into a fourth pad */}
      <path
        d="M-40,40 L100,40 L116,56 L116,148 L132,164 L260,164 L276,148 L276,72 L292,56 L420,56"
        stroke="var(--color-verdigris)"
        strokeWidth="1"
        opacity="0.7"
        fill="none"
        markerEnd="url(#hero-arrow-verdigris)"
      />

      {/* Trace — right edge, mid height, feeding into the top-right pad */}
      <path
        d="M1250,240 L1120,240 L1104,256 L1104,320 L1088,336 L980,336 L964,320 L964,260 L948,244 L860,244"
        stroke="var(--color-bronze)"
        strokeWidth="1"
        opacity="0.7"
        fill="none"
        markerEnd="url(#hero-arrow-bronze)"
      />

      {/* Trace — lower-left, short run into a fifth pad */}
      <path
        d="M-40,340 L96,340 L112,356 L112,420 L128,436 L220,436"
        stroke="var(--color-bronze)"
        strokeWidth="1"
        opacity="0.65"
        fill="none"
        markerEnd="url(#hero-arrow-bronze)"
      />

      {/* Trace — bottom edge, long horizontal run */}
      <path
        d="M1250,560 L900,560 L884,544 L884,480 L868,464 L620,464"
        stroke="var(--color-verdigris)"
        strokeWidth="1"
        opacity="0.65"
        fill="none"
        markerEnd="url(#hero-arrow-verdigris)"
      />

      {/* Trace — upper-mid, short diagonal run into center */}
      <path
        d="M420,-40 L420,100 L436,116 L436,180 L452,196 L580,196"
        stroke="var(--color-bronze)"
        strokeWidth="1"
        opacity="0.6"
        fill="none"
        markerEnd="url(#hero-arrow-bronze)"
      />

      {/* Trace — left edge, mid-low height */}
      <path
        d="M-40,420 L60,420 L76,436 L76,500 L92,516 L200,516"
        stroke="var(--color-verdigris)"
        strokeWidth="1"
        opacity="0.6"
        fill="none"
        markerEnd="url(#hero-arrow-verdigris)"
      />

      {/* Trace — top edge, feeding down into IC1 */}
      <path
        d="M300,-40 L300,20 L316,36 L316,180 L332,196 L420,196"
        stroke="var(--color-verdigris)"
        strokeWidth="1"
        opacity="0.55"
        fill="none"
        markerEnd="url(#hero-arrow-verdigris)"
      />

      {/* Trace — right side, feeding into IC3 */}
      <path
        d="M1250,140 L1150,140 L1134,156 L1134,60 L1118,44 L1062,44"
        stroke="var(--color-verdigris)"
        strokeWidth="1"
        opacity="0.55"
        fill="none"
        markerEnd="url(#hero-arrow-verdigris)"
      />

      {/* Trace — center-crossing diagonal run */}
      <path
        d="M600,600 L600,540 L616,524 L616,400 L632,384 L740,384"
        stroke="var(--color-bronze)"
        strokeWidth="1"
        opacity="0.6"
        fill="none"
        markerEnd="url(#hero-arrow-bronze)"
      />

      {/* Trace — lower-right, short run into IC2 */}
      <path
        d="M1250,420 L1150,420 L1134,404 L1134,340 L1118,324 L900,324 L884,340 L884,458"
        stroke="var(--color-bronze)"
        strokeWidth="1"
        opacity="0.55"
        fill="none"
        markerEnd="url(#hero-arrow-bronze)"
      />

      {/* Trace — bottom-left, feeding up to resistor pad */}
      <path
        d="M60,600 L60,540 L76,524 L76,460 L92,444 L238,444"
        stroke="var(--color-verdigris)"
        strokeWidth="1"
        opacity="0.55"
        fill="none"
        markerEnd="url(#hero-arrow-verdigris)"
      />

      {/* Trace — upper-right, short diagonal into corner pad */}
      <path
        d="M900,-40 L900,20 L916,36 L916,58"
        stroke="var(--color-bronze)"
        strokeWidth="1"
        opacity="0.55"
        fill="none"
        markerEnd="url(#hero-arrow-bronze)"
      />

      {/* Trace — long low horizontal run across the lower third */}
      <path
        d="M-40,240 L20,240 L36,256 L36,300 L52,316 L200,316 L216,300 L216,260"
        stroke="var(--color-bronze)"
        strokeWidth="1"
        opacity="0.5"
        fill="none"
        markerEnd="url(#hero-arrow-bronze)"
      />

      {/* Dead-end stub traces, now terminated with SMD solder pads */}
      <g stroke="var(--color-text-muted)" strokeWidth="1" fill="none">
        <path d="M560,40 L560,90" />
        <path d="M1120,560 L1120,516 L1136,500 L1180,500" />
        <path d="M40,300 L40,360" />
        <path d="M1160,180 L1160,120" />
        <path d="M640,560 L640,600" />
        <path d="M780,196 L780,140" />
        <path d="M100,240 L156,240" />
      </g>
      <g fill="none" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.6">
        <rect x="554" y="84" width="12" height="7" rx="1.5" />
        <rect x="1174" y="494" width="12" height="7" rx="1.5" />
        <rect x="34" y="354" width="12" height="7" rx="1.5" />
        <rect x="1154" y="114" width="12" height="7" rx="1.5" />
        <rect x="634" y="594" width="12" height="7" rx="1.5" />
        <rect x="774" y="134" width="12" height="7" rx="1.5" />
        <rect x="150" y="234" width="12" height="7" rx="1.5" />
      </g>

      {/* IC-style component pads — body plus pin rows on both sides */}
      <g stroke="var(--color-bronze)" strokeWidth="1" fill="none" opacity="0.75">
        <rect x="438" y="238" width="44" height="44" rx="2" />
        {[0, 1, 2].map((i) => (
          <line key={`ic1-t-${i}`} x1={450 + i * 12} y1="228" x2={450 + i * 12} y2="238" />
        ))}
        {[0, 1, 2].map((i) => (
          <line key={`ic1-b-${i}`} x1={450 + i * 12} y1="282" x2={450 + i * 12} y2="292" />
        ))}
        <circle cx="446" cy="246" r="1.4" fill="var(--color-bronze)" stroke="none" />
      </g>

      <g stroke="var(--color-verdigris)" strokeWidth="1" fill="none" opacity="0.75">
        <rect x="738" y="458" width="44" height="44" rx="2" />
        {[0, 1, 2].map((i) => (
          <line key={`ic2-l-${i}`} x1="728" y1={468 + i * 12} x2="738" y2={468 + i * 12} />
        ))}
        {[0, 1, 2].map((i) => (
          <line key={`ic2-r-${i}`} x1="782" y1={468 + i * 12} x2="792" y2={468 + i * 12} />
        ))}
        <circle cx="746" cy="466" r="1.4" fill="var(--color-verdigris)" stroke="none" />
      </g>

      <g stroke="var(--color-bronze)" strokeWidth="1" fill="none" opacity="0.6">
        <rect x="1018" y="58" width="44" height="44" rx="2" />
        {[0, 1, 2].map((i) => (
          <line key={`ic3-t-${i}`} x1={1030 + i * 12} y1="48" x2={1030 + i * 12} y2="58" />
        ))}
        {[0, 1, 2].map((i) => (
          <line key={`ic3-b-${i}`} x1={1030 + i * 12} y1="102" x2={1030 + i * 12} y2="112" />
        ))}
      </g>

      {/* Smaller two-pin pads (resistor-style) */}
      <g fill="none" opacity="0.6">
        <rect x="238" y="142" width="38" height="38" rx="2" stroke="var(--color-verdigris)" strokeWidth="1" />
        <line x1="257" y1="132" x2="257" y2="142" stroke="var(--color-verdigris)" strokeWidth="1" />
        <line x1="257" y1="180" x2="257" y2="190" stroke="var(--color-verdigris)" strokeWidth="1" />

        <rect x="942" y="314" width="38" height="38" rx="2" stroke="var(--color-bronze)" strokeWidth="1" />
        <line x1="961" y1="304" x2="961" y2="314" stroke="var(--color-bronze)" strokeWidth="1" />
        <line x1="961" y1="352" x2="961" y2="362" stroke="var(--color-bronze)" strokeWidth="1" />

        <rect x="598" y="378" width="38" height="38" rx="2" stroke="var(--color-bronze)" strokeWidth="1" />
        <line x1="617" y1="368" x2="617" y2="378" stroke="var(--color-bronze)" strokeWidth="1" />
        <line x1="617" y1="416" x2="617" y2="426" stroke="var(--color-bronze)" strokeWidth="1" />
      </g>

      {/* Plated vias — ring with drilled hole, at every trace bend */}
      <g fill="none" stroke="var(--color-bronze)" strokeWidth="1" opacity="0.75">
        {[
          [200, 120], [200, 260], [700, 100], [700, 220], [940, 220], [940, 340],
          [1040, 180], [1104, 256], [1088, 336], [112, 356],
          [436, 100], [1134, 156], [616, 524], [1134, 340], [900, 20],
        ].map(([cx, cy], i) => (
          <circle key={`via-b-${i}`} cx={cx} cy={cy} r="3.4" />
        ))}
      </g>
      <g fill="var(--color-bronze)" opacity="0.9">
        {[
          [200, 120], [200, 260], [700, 100], [700, 220], [940, 220], [940, 340],
          [1040, 180], [1104, 256], [1088, 336], [112, 356],
          [436, 100], [1134, 156], [616, 524], [1134, 340], [900, 20],
        ].map(([cx, cy], i) => (
          <circle key={`via-b-hole-${i}`} cx={cx} cy={cy} r="1.1" />
        ))}
      </g>

      <g fill="none" stroke="var(--color-verdigris)" strokeWidth="1" opacity="0.75">
        {[
          [1000, 500], [1000, 380], [760, 380], [540, 480], [540, 560], [320, 560],
          [320, 440], [140, 480], [116, 148], [276, 148], [884, 480],
          [76, 436], [316, 36], [76, 524],
        ].map(([cx, cy], i) => (
          <circle key={`via-v-${i}`} cx={cx} cy={cy} r="3.4" />
        ))}
      </g>
      <g fill="var(--color-verdigris)" opacity="0.9">
        {[
          [1000, 500], [1000, 380], [760, 380], [540, 480], [540, 560], [320, 560],
          [320, 440], [140, 480], [116, 148], [276, 148], [884, 480],
          [76, 436], [316, 36], [76, 524],
        ].map(([cx, cy], i) => (
          <circle key={`via-v-hole-${i}`} cx={cx} cy={cy} r="1.1" />
        ))}
      </g>

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
        <circle r="3" fill="var(--color-bronze)" opacity="0.75">
          <animateMotion
            dur="12s"
            begin="3.5s"
            repeatCount="indefinite"
            path="M600,600 L600,540 L616,524 L616,400 L632,384 L740,384"
          />
        </circle>
        <circle r="3" fill="var(--color-verdigris)" opacity="0.75">
          <animateMotion
            dur="9.5s"
            begin="4.5s"
            repeatCount="indefinite"
            path="M-40,420 L60,420 L76,436 L76,500 L92,516 L200,516"
          />
        </circle>
      </g>
    </svg>
  );
}