"use client";

import { useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    // The inline <script> in layout.tsx sets data-theme before hydration,
    // so it's safe to read synchronously on the client.
    if (typeof document === "undefined") return "light";
    return (document.documentElement.dataset.theme as Theme) || "light";
  });

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark / light mode"
      className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] text-xs transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
