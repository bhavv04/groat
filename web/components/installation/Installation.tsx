// components/installation/Installation.tsx
import { CopyBlock } from "../ui/CopyBlock";

export function Installation() {
  return (
    <section id="install" className="mx-auto max-w-6xl px-6 py-20">
      <div className="  ">
        <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
          Get started in two commands
        </h2>
        <p className="mt-3 max-w-lg text-sm text-text-muted sm:mx-0 sm:text-base">
          No Docker, no config file, no signup. Install the binary, start it,
          and point your existing SDK at it.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        <div className="flex items-start gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bg-elevated text-xs text-text-muted">
            1
          </span>
          <div className="flex-1 min-w-0">
            <p className="mb-1.5 text-xs text-text-muted">
              install &amp; run
            </p>
            <CopyBlock lines={["cargo install groat", "groat up"]}
             className="bg-bg-elevated p-4 rounded-xl"/>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bg-elevated text-xs text-text-muted">
            2
          </span>
          <div className="flex-1 min-w-0">
            <p className="mb-1.5 text-xs text-text-muted">
              change one line
            </p>
            <CopyBlock
              lines={['client = OpenAI(base_url="http://localhost:8787")']}
              className="bg-bg-elevated p-4 rounded-xl"
            />
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-text-muted sm:text-left">
        That&apos;s it, everything else in your code stays exactly the same.
      </p>
    </section>
  );
}