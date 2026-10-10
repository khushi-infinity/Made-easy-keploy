"use client";

import { useEffect } from "react";

/**
 * React hydration removes the data-theme attribute that the inline
 * <script> in <head> sets (React 19 patches unknown attributes on
 * <html>). Re-apply it after hydration so dark mode actually sticks.
 * The inline script still covers the pre-hydration first paint.
 */
export function ThemeInit() {
  useEffect(() => {
    function apply() {
      try {
        const stored = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        document.documentElement.dataset.theme =
          stored || (prefersDark ? "dark" : "light");
      } catch {
        /* ignore */
      }
    }

    apply();

    // Defensively re-apply if anything strips the attribute again.
    const observer = new MutationObserver(() => {
      if (!document.documentElement.dataset.theme) apply();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
