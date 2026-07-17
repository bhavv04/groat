// components/hero/Hero.tsx
import { HeroBackground } from "@/components/hero/HeroBackground";
import { FaGithub } from "react-icons/fa";
import { Logo } from "@/components/theme/Logo";
import { Button } from "@/components/ui/Button";
import { CopyBlock } from "@/components/ui/CopyBlock";
import { TerminalPanel } from "@/components/hero/TerminalPanel";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-16 px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col items-center text-center">
          <div className="flex gap-2">
            <Logo className="h-16 w-16" />
          </div>

          <p className="mt-6 max-w-xl text-base text-text-muted sm:text-lg">
            A self-hosted LLM proxy that saves you money.
          </p>

          <p className="italic text-xs text-text-muted/80">
            Vectors in, savings out, semantically cached, intelligently routed,
            never a token wasted.
            </p>

          <CopyBlock
            lines={["cargo install groat"]}
            className="mt-4 w-full max-w-md rounded-xl bg-bg-elevated px-5 py-4 text-text-muted"
          />

          <div className="mt-6 flex flex-row items-center gap-2">
            <Button variant="solid" size="sm" asChild>
              <a href="/docs">Read the Docs</a>
            </Button>
            <Button variant="solid" size="sm" asChild>
              <a href="https://github.com/bhavv04/groat" target="_blank">
                <FaGithub /> Github
              </a>
            </Button>
          </div>
        </div>

        <TerminalPanel />
      </div>
    </section>
  );
}