"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: 2 | 3 };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function Toc() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".mdx-content h2, .mdx-content h3")
    );

    const items: Heading[] = nodes.map((node) => {
      const level = node.tagName === "H2" ? 2 : 3;
      const text = (node.textContent ?? "").trim();
      let id = node.id;
      if (!id) {
        id = slugify(text);
        node.id = id;
      }
      return { id, text, level };
    });

    setHeadings(items);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    function onScroll() {
      const offset = 120;
      let current = "";
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = h.id;
        }
      }
      setActiveId(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-[var(--muted)]">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider">
        On this page
      </p>
      <div>
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`toc-link${h.level === 3 ? " toc-h3" : ""}${
              activeId === h.id ? " active" : ""
            }`}
          >
            {h.text}
          </a>
        ))}
      </div>
    </nav>
  );
}
