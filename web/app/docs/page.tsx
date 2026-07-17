// app/docs/page.tsx
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Nav } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Button } from "@/components/ui/Button";

export default function DocsPage() {
  return (
    <>
      <Nav />

      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
        <p className="text-xs text-verdigris">
          docs
        </p>

        <h1 className="mt-4 font-display text-4xl font-bold text-text sm:text-5xl">
          Coming soon
        </h1>

        <p className="mt-4 max-w-md text-text-muted">
          Full docs are in progress. In the meantime, the README on GitHub
          covers install, config, and how routing works.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button variant="solid" size="sm" asChild>
            <a
              href="https://github.com/bhavv04/groat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="h-4 w-4" />
              View on GitHub
            </a>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </>
  );
}