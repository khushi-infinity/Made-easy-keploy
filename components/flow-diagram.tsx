const box =
  "rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-center text-xs sm:text-sm font-medium";
const arrow = "text-[var(--muted)]";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

export function FlowDiagram() {
  return (
    <figure className="my-6 rounded-xl border border-[var(--border)] bg-[var(--card)]/60 p-4 sm:p-6">
      <Row label="keploy record">
        <span className={box}>Your Gin app</span>
        <span className={arrow}>→</span>
        <span className={box}>Keploy (intercepts)</span>
        <span className={arrow}>→</span>
        <span className={box}>MongoDB</span>
        <span className={arrow}>⇒</span>
        <span className={box + " border-dashed border-[var(--accent)]"}>
          test-1.yml + mocks.yml
        </span>
      </Row>
      <Row label="keploy test">
        <span className={box}>test-1.yml + mocks.yml</span>
        <span className={arrow}>→</span>
        <span className={box}>Replayed calls</span>
        <span className={arrow}>→</span>
        <span className={box}>Assertions</span>
        <span className={arrow}>⇒</span>
        <span className={box + " border-dashed border-[var(--accent)]"}>
          ✓ Pass / ✗ Diff report
        </span>
      </Row>
      <figcaption className="mt-2 text-xs text-[var(--muted)]">
        Record mode learns from real traffic. Test mode replays the same calls
        against recorded mocks — no live database needed.
      </figcaption>
    </figure>
  );
}
