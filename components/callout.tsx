const PILL =
  "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider";

const PILLER: Record<string, string> = {
  info: `${PILL} bg-[#eaf3ff] text-[#1d4ed8] dark:bg-[#171f2e] dark:text-[#7fb1ff]`,
  tip: `${PILL} bg-[#e8f8ee] text-[#15803d] dark:bg-[#14261b] dark:text-[#6fd692]`,
  warning: `${PILL} bg-[var(--accent-soft)] text-[var(--accent-hover)] dark:bg-[#241610] dark:text-[#ff9a63]`,
  note: `${PILL} bg-[var(--card)] text-[var(--muted)]`,
  aha: `${PILL} bg-[#f5edff] text-[#7e22ce] dark:bg-[#211730] dark:text-[#c084fc]`,
};

const ICON: Record<string, string> = {
  info: "i",
  tip: "→",
  warning: "!",
  note: "n",
  aha: "★",
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
  const label = title ?? type;
  return (
    <aside className="my-6 rounded-xl border border-[var(--border)] bg-[var(--card)]/80 p-5">
      <p className={`mb-2.5 ${PILLER[type] ?? PILLER.note}`}>
        <span
          aria-hidden="true"
          className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-current text-[10px] font-black leading-none"
        >
          {ICON[type] ?? ICON.info}
        </span>
        <span className="normal-case tracking-normal text-[13px] font-semibold">{label}</span>
      </p>
      <div className="text-[0.95rem] leading-relaxed text-[var(--fg)]">{children}</div>
    </aside>
  );
}
