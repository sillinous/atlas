// ══════════════════════════════════════════════════════════════════════════════
// TRACK ONE [T1] — Comparison Component
// ══════════════════════════════════════════════════════════════════════════════

'use client';

const comparisons = [
  { feature: 'Autonomous Research Agents', liveplan: false, upmetrics: false, bizplan: false, atlas: true },
  { feature: 'Real-time Market Intelligence', liveplan: false, upmetrics: false, bizplan: false, atlas: true },
  { feature: 'Multi-Agent Orchestration', liveplan: false, upmetrics: false, bizplan: false, atlas: true },
  { feature: 'Business Simulation Engine', liveplan: false, upmetrics: false, bizplan: false, atlas: true },
  { feature: 'Voice-First Planning', liveplan: false, upmetrics: false, bizplan: false, atlas: true },
  { feature: 'Investor/Lender Matching', liveplan: false, upmetrics: false, bizplan: false, atlas: true },
  { feature: 'Regulatory Compliance Engine', liveplan: false, upmetrics: false, bizplan: false, atlas: true },
  { feature: 'Standard Templates', liveplan: true, upmetrics: true, bizplan: true, atlas: true },
  { feature: 'Financial Forecasting', liveplan: true, upmetrics: true, bizplan: true, atlas: true },
];

export function Comparison() {
  return (
    <section id="compare" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">⚡ Comparison</span>
          <h2>Beyond Traditional<br />Planning Software</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
            See how ATLAS 2.0 compares to legacy business planning tools.
          </p>
        </div>
        
        <div className="comparison-table">
          <div className="comparison-header">
            <div className="comparison-header-cell">Capability</div>
            <div className="comparison-header-cell">LivePlan</div>
            <div className="comparison-header-cell">Upmetrics</div>
            <div className="comparison-header-cell">Bizplan</div>
            <div className="comparison-header-cell highlight">ATLAS 2.0</div>
          </div>
          
          {comparisons.map((row, index) => (
            <div key={index} className="comparison-row">
              <div className="comparison-cell">{row.feature}</div>
              <div className="comparison-cell">
                {row.liveplan ? <span className="check">✓</span> : <span className="cross">—</span>}
              </div>
              <div className="comparison-cell">
                {row.upmetrics ? <span className="check">✓</span> : <span className="cross">—</span>}
              </div>
              <div className="comparison-cell">
                {row.bizplan ? <span className="check">✓</span> : <span className="cross">—</span>}
              </div>
              <div className="comparison-cell highlight">
                {row.atlas ? <span className="check">✓</span> : <span className="cross">—</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
