// app/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Groat — Every token counts",
  description:
    "A drop-in OpenAI-compatible proxy that cuts your LLM API bill without changing your code.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body className="min-h-screen bg-bg text-text antialiased font-body">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}