// components/nav/Nav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Logo } from "@/components/theme/Logo";
import { FaGithub } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { Button } from "@/components/ui/Button";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-elevated">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-medium text-text"
        >
          <Logo className="h-7 w-7" />
          groat
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-text-muted sm:flex">
          <Link href="/docs" className="hover:text-text">
            Documentation
          </Link>
          <Link href="#install" className="hover:text-text">
            Install
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/bhavv04/groat"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-sm text-white transition-colors hover:bg-gray-700 dark:bg-gray-100 dark:text-muted dark:hover:bg-gray-300 sm:inline-flex"
          >
            <FaGithub className="inline-block h-4 w-4" />
            GitHub
          </Link>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="inline-flex items-center justify-center rounded-lg p-2 text-text sm:hidden"
          >
            {open ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-3 text-sm text-text-muted sm:hidden">
          <Link
            href="/docs"
            onClick={() => setOpen(false)}
            className="rounded-lg px-2 py-2.5 hover:bg-bg hover:text-text"
          >
            Documentation
          </Link>
          <Link
            href="#install"
            onClick={() => setOpen(false)}
            className="rounded-lg px-2 py-2.5 hover:bg-bg hover:text-text"
          >
            Install
          </Link>

        <Button variant="github" size="sm" asChild className="w-full justify-start sm:w-auto sm:justify-center">
        <Link
            href="https://github.com/bhavv04/groat"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
        >
            <FaGithub className="h-4 w-4" />
            GitHub
        </Link>
        </Button>
        
        </nav>
      )}
    </header>
  );
}