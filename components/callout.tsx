const styles: Record<
  string,
  { icon: string; title: string; border: string; bg: string; text: string }
> = {
  info: {
    icon: "ℹ️",
    title: "Info",
    border: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    text: "#1d4ed8",
  },
  tip: {
    icon: "💡",
    title: "Tip",
    border: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    text: "#047857",
  },
  warning: {
    icon: "⚠️",
    title: "Warning",
    border: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
    text: "#b45309",
  },
  note: {
    icon: "📝",
    title: "Note",
    border: "#a1a1aa",
    bg: "rgba(161,161,170,0.10)",
    text: "#52525b",
  },
  aha: {
    icon: "✨",
    title: "A-ha! Moment",
    border: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
    text: "#7e22ce",
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "tip" | "warning" | "note" | "aha";
  title?: string;
  children: React.ReactNode;
}) {
  const s = styles[type] ?? styles.info;
  return (
    <aside
      className="not-prose my-4 rounded-lg border-l-4 p-4 text-sm leading-relaxed"
      style={{
        borderColor: s.border,
        background: s.bg,
        borderLeftWidth: 4,
        borderLeftStyle: "solid",
        borderWidth: 1,
      }}
    >
      <p className="mb-1 font-semibold" style={{ color: s.text }}>
        <span aria-hidden="true">{s.icon}</span>{" "}
        {title ? `${title} · ${s.title}` : s.title}
      </p>
      <div className="text-[var(--fg)] [&_a]:underline [&_code]:before:content-none [&_code]:after:content-none">
        {children}
      </div>
    </aside>
  );
}
