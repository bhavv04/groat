// components/hero/TerminalPanel.tsx
"use client";
import { useRef, useState } from "react";

export function TerminalPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 6, y: -12 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: 6 - (py - 0.5) * 16,
      y: -12 + (px - 0.5) * 16,
    });
  }

  function handleMouseLeave() {
    setTilt({ x: 6, y: -12 });
  }

  return (
    <div className="hidden lg:block" style={{ perspective: "1400px" }}>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-[620px] rounded-xl transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          backgroundColor: "var(--color-bg-elevated)",
          boxShadow:
            "0 30px 60px -15px rgba(0,0,0,0.5), 0 10px 20px -8px rgba(0,0,0,0.4)",
        }}
      >
        {/* window chrome */}
        <div className="flex items-center gap-1.5 border-b-2 border-border px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-2 text-xs font-display" style={{ color: "var(--color-text-muted)" }}>
            groat — zsh
          </span>
        </div>

        <div className="space-y-1.5 p-6 font-display text-sm">
          <p>
            <span style={{ color: "var(--color-verdigris)" }}>$</span>{" "}
            <span style={{ color: "var(--color-bronze)" }}>cargo</span>{" "}
            <span style={{ color: "var(--color-bronze)" }}>install</span>{" "}
            <span style={{ color: "#b89968" }}>groat</span>
          </p>
          <p style={{ color: "var(--color-text-muted)" }}>
            &nbsp;&nbsp; Compiling groat{" "}
            <span style={{ color: "#b89968" }}>v0.3.2</span>
          </p>
          <p style={{ color: "var(--color-text-muted)" }}>
            &nbsp;&nbsp; Finished{" "}
            <span style={{ color: "#7a9683" }}>release [optimized]</span> target(s)
            in <span style={{ color: "#b89968" }}>4.12s</span>
          </p>
          <p>
            <span style={{ color: "var(--color-verdigris)" }}>$</span>{" "}
            <span style={{ color: "var(--color-bronze)" }}>groat</span>{" "}
            <span style={{ color: "var(--color-bronze)" }}>serve</span>{" "}
            <span style={{ color: "var(--color-text-muted)" }}>--port</span>{" "}
            <span style={{ color: "#b89968" }}>8080</span>
          </p>
          <p style={{ color: "var(--color-text-muted)" }}>
            &nbsp;&nbsp; listening on{" "}
            <span style={{ color: "#7a9683" }}>0.0.0.0:8080</span>
          </p>
          <p style={{ color: "var(--color-text-muted)" }}>
            &nbsp;&nbsp; routing →{" "}
            <span style={{ color: "var(--color-bronze)" }}>openai</span> ·{" "}
            <span style={{ color: "var(--color-bronze)" }}>anthropic</span> ·{" "}
            <span style={{ color: "var(--color-bronze)" }}>local</span>
          </p>
          <p style={{ color: "var(--color-text-muted)" }}>
            &nbsp;&nbsp; cache backend: redis (
            <span style={{ color: "#7a9683" }}>connected</span>)
          </p>
          <p>
            <span style={{ color: "var(--color-verdigris)" }}>$</span>{" "}
            <span style={{ color: "var(--color-bronze)" }}>curl</span>{" "}
            <span style={{ color: "#b89968" }}>
              localhost:8080/v1/chat/completions
            </span>
          </p>
          <p style={{ color: "var(--color-text-muted)" }}>
            &nbsp;&nbsp; <span style={{ color: "#7a9683" }}>200 OK</span> · 128
            tokens · <span style={{ color: "#7a9683" }}>cache hit</span>
          </p>
          <p style={{ color: "var(--color-text-muted)" }}>
            &nbsp;&nbsp; cache_hit_rate:{" "}
            <span style={{ color: "#b89968" }}>68.4%</span> | requests_today:{" "}
            <span style={{ color: "#b89968" }}>4,213</span>
          </p>
          <p>
            <span style={{ color: "var(--color-verdigris)" }}>$</span>{" "}
            <span
              className="animate-pulse"
              style={{ color: "var(--color-verdigris)" }}
            >
              _
            </span>
          </p>
        </div>

        {/* fake extruded edge, to sell "thickness" */}
        <div
          className="absolute inset-x-0 -bottom-2 h-2 rounded-b-xl bg-black/40"
          style={{ transform: "translateZ(-8px) rotateX(90deg)", transformOrigin: "top" }}
        />
      </div>
    </div>
  );
}