// components/theme/Logo.tsx
"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "mr-2 inline-block h-9 w-9" }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Reserve the same box before we know the theme, so nothing shifts on mount
  if (!mounted) {
    return <div className={className} />;
  }

  const src = resolvedTheme === "dark" ? "/groat.png" : "/groat.png";

  return (
    <Image
      src={src}
      alt="Groat logo"
      width={36}
      height={36}
      className={className}
    />
  );
}