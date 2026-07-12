// components/footer/Footer.tsx
import { Logo } from "@/components/theme/Logo";
import { FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-display text-sm font-medium text-text">
            <Logo />
                groat
            <p className="mt-1 max-w-sm text-sm text-text-muted">
              Named after the medieval English coin — small denomination, but
              the unit everything was actually accounted in.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-text-muted">
            <a href="https://github.com/bhavv04/groat" className="inline-flex items-center gap-1 hover:text-text">
              <FaGithub className="inline-block" />
              GitHub
            </a>
            <span>Apache 2.0</span>
          </div>
        </div>

        <p className="mt-8 text-xs text-text-muted">
          © {new Date().getFullYear()} Groat. Self-hosted, open source, forever.
        </p>
      </div>
    </footer>
  );
}