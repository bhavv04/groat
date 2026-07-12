// components/features/TechStackStrip.tsx
import { Cog, Waypoints, Database, Boxes, Cpu, Zap, Table } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const stack: { name: string; icon: LucideIcon }[] = [
  { name: "Rust", icon: Cog },
  { name: "Axum", icon: Waypoints },
  { name: "Tokio", icon: Zap },
  { name: "SQLite", icon: Database },
  { name: "sqlx", icon: Table },
  { name: "LanceDB", icon: Boxes },
  { name: "candle", icon: Cpu },
];

export function TechStackStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-border pt-8 text-sm text-text-muted">
      <span className="text-sm text-text-muted/70">
        built with
      </span>
      {stack.map(({ name, icon: Icon }) => (
        <span key={name} className="flex items-center gap-1.5 text-text-muted">
          <Icon size={14} className="text-bronze" />
          <span className="text-text">{name}</span>
        </span>
      ))}
    </div>
  );
}