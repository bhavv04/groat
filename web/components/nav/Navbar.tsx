// components/nav/Nav.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Logo } from "@/components/theme/Logo";
import { FaGithub } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#install", label: "Install" },
  { href: "/docs", label: "Docs" },
];

const GITHUB_URL = "https://github.com/bhavv04/groat";

// Shared link treatment for desktop + mobile. Active state is carried by
// weight and a small leading marker, not by color — everything stays
// monochrome, in keeping with the rest of the UI.
function NavLink({
  href,
  label,
  active,
  onClick,
  className = "",
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative flex items-center gap-1.5 transition-colors ${
        active ? "font-medium text-text" : "text-text-muted hover:text-text"
      } ${className}`}
    >
      <span
        className={` ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
        }`}
      />
      {label}
    </Link>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which in-page section (#features, #install, ...) is actually
  // visible right now, so only one hash link lights up at a time instead
  // of both matching "/" simultaneously.
  useEffect(() => {
    const hashLinks = NAV_LINKS.filter((l) => l.href.includes("#"));
    const sections = hashLinks
      .map((l) => document.getElementById(l.href.split("#")[1]))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHash(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => {
    const [path, hash] = href.split("#");
    const routePath = path || "/";

    if (hash) {
      // In-page anchor: only active on "/" and only when its section
      // is the one currently in view.
      return pathname === "/" && activeHash === `#${hash}`;
    }
    return pathname.startsWith(routePath);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "h-16" : "h-16"
        }`}
      >
        <div className="flex items-center gap-3">
          <Link href="/#hero" className="flex items-center" aria-label="groat home">
            <Logo className="h-6 w-6" />
          </Link>

          <nav className="hidden items-center gap-2 text-sm sm:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActive(link.href)}
              />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="github"
            size="sm"
            asChild
            className="hidden sm:inline-flex"
          >
            <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <FaGithub className="h-4 w-4" />
              GitHub
            </Link>
          </Button>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="inline-flex items-center justify-center rounded-lg p-2 text-text sm:hidden"
          >
            <span
              className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
            >
              {open ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu: animates height via CSS grid-rows, no JS measuring needed */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out sm:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            className={`flex flex-col gap-1 border-t border-border px-6 py-3 text-sm transition-opacity duration-200 ${
              open ? "opacity-100 delay-100" : "opacity-0"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActive(link.href)}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 hover:bg-bg"
              />
            ))}

            <Button
              variant="github"
              size="sm"
              asChild
              className="mt-1 w-full justify-start sm:w-auto sm:justify-center"
            >
              <Link
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <FaGithub className="h-4 w-4" />
                GitHub
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}