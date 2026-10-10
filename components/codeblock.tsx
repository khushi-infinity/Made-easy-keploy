"use client";

import { useRef, useState } from "react";

function getLanguage(node: React.ReactNode): string {
  if (node && typeof node === "object" && "props" in node) {
    const props = (node as { props?: { className?: string } }).props;
    const cls = props?.className ?? "";
    const m = /language-([\w-]+)/.exec(cls);
    if (m) return m[1];
  }
  return "text";
}

const LANG_LABEL: Record<string, string> = {
  bash: "terminal",
  sh: "terminal",
  shell: "terminal",
  yaml: "yaml",
  json: "json",
  go: "go",
};

export function CodeBlock({
  children,
  ...rest
}: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const lang = getLanguage(children);
  const label = LANG_LABEL[lang] ?? lang;

  async function copy() {
    const text = preRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="codeblock">
      <div className="codeblock-head">
        <span className="codeblock-lang">{label}</span>
        <button
          type="button"
          onClick={copy}
          className={`copy-btn${copied ? " copied" : ""}`}
          aria-label="Copy code to clipboard"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre ref={preRef} {...rest}>
        {children}
      </pre>
    </div>
  );
}
