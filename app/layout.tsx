import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toc } from "@/components/toc";
import { Hero } from "@/components/hero";
import { ThemeInit } from "@/components/theme-init";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Test a Go App with Keploy — A Beginner-Friendly Tutorial",
  description:
    "A hands-on, beginner-friendly guide to recording and replaying API tests with Keploy using the Gin + MongoDB URL shortener quickstart.",
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored || (prefersDark ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)] font-sans antialiased">
        <ThemeInit />
        <header className="site-header sticky top-0 z-50">
          <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <a
                href="https://keploy.io"
                target="_blank"
                rel="noopener noreferrer"
                className="keploy-mark text-lg"
              >
                keploy
              </a>
              <span
                aria-hidden="true"
                className="h-4 w-px bg-[var(--border)]"
              />
              <span className="text-sm text-[var(--muted)]">
                Go Tutorial
              </span>
            </div>
            <nav className="flex items-center gap-4">
              <a
                href="https://github.com/keploy/keploy"
                target="_blank"
                rel="noopener noreferrer"
                className="header-link hidden sm:inline"
              >
                GitHub
              </a>
              <a
                href="https://keploy.io/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="header-link"
              >
                Docs
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6">
          <Hero />
          <div className="flex w-full gap-10">
            <main className="mdx-content min-w-0 flex-1 py-4 md:py-6">
              {children}
            </main>
            <aside className="sticky top-24 hidden h-[calc(100vh-8rem)] w-56 shrink-0 self-start overflow-y-auto py-6 xl:block">
              <Toc />
            </aside>
          </div>
        </div>
        <footer className="site-footer border-t border-[var(--border)] py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 text-sm text-[var(--muted)] sm:flex-row sm:px-6">
            <p>
              Built with Next.js and MDX. Part of a Keploy DevRel candidate
              assignment.
            </p>
            <p className="flex items-center gap-4">
              <a
                href="https://keploy.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)]"
              >
                keploy.io
              </a>
              <a
                href="https://github.com/khushi-infinity/Made-easy-keploy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)]"
              >
                Source
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
