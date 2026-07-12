// components/hero/Hero.tsx
import { HeroBackground } from "@/components/hero/HeroBackground";
import { FaGithub } from "react-icons/fa";
import { Logo } from "@/components/theme/Logo";
import { Button } from "@/components/ui/Button";
import { CopyBlock } from "@/components/ui/CopyBlock";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="flex items-center gap-2">
          <Logo className="h-16 w-16" />
          <span className="font-display text-2xl font-bold text-text">
          </span>
        </div>

        <p className="mt-6 max-w-xl text-base text-text-muted sm:text-lg">
          A self-hosted LLM proxy that saves you money.
        </p>

        <CopyBlock lines={["cargo install groat"]} className="mt-4 ml-2 w-full max-w-md rounded-xl bg-bg-elevated px-5 py-4 text-text-muted"/>

        <div className="mt-6 flex flex-row items-center gap-2 mr-2">
          <Button variant="solid" size="sm" asChild>
            <a href="/docs">Read the Docs</a>
            </Button>
          <Button variant="solid" size="sm" asChild>
            <a href="https://github.com/bhavv04/groat" target="_blank"><FaGithub /> Github</a>
            </Button>
        </div>
      </div>
    </section>
  );
}