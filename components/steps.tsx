export function Steps({ children }: { children: React.ReactNode }) {
  return <div className="mb-6">{children}</div>;
}

export function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative grid grid-cols-[auto_1fr] gap-x-4 pb-5">
      {/* connector line */}
      <div
        className="pointer-events-none absolute left-[15px] top-10 bottom-0 w-px bg-[var(--border)]"
        aria-hidden="true"
      />
      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--accent)]/50 bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)]">
        {number}
      </div>
      <div>
        <h3 className="mb-1.5 text-[15px] font-semibold">{title}</h3>
        <div className="text-sm text-[var(--fg)] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
