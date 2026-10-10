export function Hero() {
  return (
    <div className="hero">
      <div className="hero-inner">
        <div>
          <p className="hero-eyebrow">Keploy quickstart tutorial</p>
          <h1 className="hero-title">
            Record and replay tests for a Go app
          </h1>
          <p className="hero-sub">
            Turn real API traffic into a replayable test suite for a Gin and
            MongoDB URL shortener. No hand-written test code anywhere in this
            tutorial.
          </p>
          <div className="hero-chips">
            <span className="hero-chip">Go 1.20+</span>
            <span className="hero-chip">Gin</span>
            <span className="hero-chip">MongoDB</span>
            <span className="hero-chip">Docker</span>
            <span className="hero-chip hero-chip-accent">0 lines of test code</span>
          </div>
        </div>
        <div className="hero-terminal" aria-hidden="true">
          <div className="hero-terminal-bar">
            <span className="hero-dot hero-dot-red" />
            <span className="hero-dot hero-dot-yellow" />
            <span className="hero-dot hero-dot-green" />
            <span className="hero-terminal-title">terminal</span>
          </div>
          <pre className="hero-terminal-body">
            <code>
              <span className="tl-prompt">$</span> keploy record -c{" "}
              <span className="tl-str">&quot;go run main.go&quot;</span>
              {"\n"}
              <span className="tl-ok">✓</span> 2 test cases captured
              {"\n"}
              <span className="tl-ok">✓</span> 2 database mocks created
              {"\n"}
              <span className="tl-prompt">$</span> keploy test
              {"\n"}
              <span className="tl-ok">✓</span> test-1 passed
              {"\n"}
              <span className="tl-ok">✓</span> test-2 passed
              {"\n"}
              <span className="tl-dim">
                {"\n"}tests run with the database turned off
              </span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
