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
    <div className="relative grid grid-cols-[auto_1fr] gap-x-4 pb-6">
      {/* connector line */}
      <div className="pointer-events-none absolute left-[17px] top-10 bottom-0 w-px bg-[var(--border)]" aria-hidden="true" />
      <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--card)] text-sm font-bold text-[var(--accent)]">
        {number}
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold leading-9">{title}</h3>
        <div className="text-[var(--fg)]">{children}</div>
      </div>
    </div>
  );
}
