// components/ui/CopyBlock.tsx
"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyBlockProps {
  lines: string[];
  className?: string;
}

export function CopyBlock({ lines, className }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className={cn("relative text-left  text-sm", className)}>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy to clipboard"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
      >
        {copied ? <Check size={14} className="text-verdigris" /> : <Copy size={14} />}
      </button>

      <div className="overflow-x-auto pr-6">
        {lines.map((line) => (
          <div key={line} className="whitespace-nowrap">
            <span className="select-none text-bronze">$ </span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}