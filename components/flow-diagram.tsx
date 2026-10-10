const box =
  "rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-center text-xs sm:text-sm font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
const arrow = "text-[var(--muted)] select-none";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 last:mb-2">
      <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)]">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-lg border border-dashed border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-2 text-center text-xs font-semibold sm:text-sm">
      {children}
    </span>
  );
}

export function FlowDiagram() {
  return (
    <figure className="my-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-7">
      <Row label="keploy record">
        <span className={box}>Your Gin app</span>
        <span className={arrow}>→</span>
        <span className={box}>
          Keploy
          <span className="ml-1.5 text-[10px] font-normal text-[var(--muted)]">
            intercepts
          </span>
        </span>
        <span className={arrow}>→</span>
        <span className={box}>MongoDB</span>
        <span className={arrow}>⇒</span>
        <HighlightBox>test-1.yml + mocks.yml</HighlightBox>
      </Row>
      <Row label="keploy test">
        <HighlightBox>test-1.yml + mocks.yml</HighlightBox>
        <span className={arrow}>→</span>
        <span className={box}>Replayed calls</span>
        <span className={arrow}>→</span>
        <span className={box}>
          Keploy
          <span className="ml-1.5 text-[10px] font-normal text-[var(--muted)]">
            compares
          </span>
        </span>
        <span className={arrow}>⇒</span>
        <span className={box}>
          <span className="text-[#15803d] dark:text-[#6fd692]">✓ Pass</span>
          <span className="mx-1 text-[var(--muted)]">/</span>
          <span className="text-[var(--accent)]">✗ Diff report</span>
        </span>
      </Row>
      <figcaption className="mt-3 text-xs text-[var(--muted)]">
        Record mode learns from real traffic. Test mode replays the same calls
        against recorded mocks, with no live database needed.
      </figcaption>
    </figure>
  );
}
