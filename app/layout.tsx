import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";

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
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)] font-sans antialiased transition-colors">
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur">
          <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4 sm:px-6">
            <a href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="text-[var(--accent)]">▮</span>
              Keploy <span className="text-[var(--muted)] font-normal">Go Tutorial</span>
            </a>
            <div className="flex items-center gap-3 text-sm">
              <a
                href="https://keploy.io/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
              >
                Official Docs ↗
              </a>
              <ThemeToggle />
            </div>
          </div>
        </header>
        {children}
        <footer className="border-t border-[var(--border)] py-8 text-center text-sm text-[var(--muted)]">
          Built with Next.js + MDX ·{" "}
          <a
            href="https://keploy.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted underline-offset-4 hover:text-[var(--fg)]"
          >
            Keploy
          </a>{" "}
          ·{" "}
          <a
            href="https://github.com/keploy/samples-go/tree/main/gin-mongo"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted underline-offset-4 hover:text-[var(--fg)]"
          >
            Sample app
          </a>
        </footer>
      </body>
    </html>
  );
}
