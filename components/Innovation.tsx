// ══════════════════════════════════════════════════════════════════════════════
// TRACK ONE [T1] — Innovation Component
// ══════════════════════════════════════════════════════════════════════════════

'use client';

const innovations = [
  {
    number: '01',
    badge: 'Flagship',
    badgeColor: '#f59e0b',
    title: 'THE ORACLE — Predictive Simulation',
    description: 'Run your entire business virtually before spending a dollar. Monte Carlo simulations across 10,000 scenarios give you a success probability score and identify exactly where risks lie.',
    tags: ['Cash flow stress testing', 'Competitive response modeling', 'Seasonal impact analysis', 'Failure mode identification'],
    featured: true
  },
  {
    number: '02',
    badge: 'Memory',
    badgeColor: '#10b981',
    title: 'THE BRAIN — Institutional Memory',
    description: 'ATLAS remembers everything about your business journey. It learns your preferences, tracks your decisions, and proactively surfaces relevant information.',
    featured: false
  },
  {
    number: '03',
    badge: 'Compliance',
    badgeColor: '#6366f1',
    title: 'REGULATORY AUTOPILOT',
    description: 'Automatically identifies every license, permit, and regulation for your specific business and location. Tracks deadlines, pre-fills applications, and ensures compliance.',
    featured: false
  },
  {
    number: '04',
    badge: 'Execution',
    badgeColor: '#f43f5e',
    title: 'LAUNCH SEQUENCE',
    description: "Your business plan doesn't end at the document. ATLAS orchestrates your entire launch — coordinating tasks, vendors, and milestones to opening day.",
    featured: false
  },
  {
    number: '05',
    badge: 'Voice',
    badgeColor: '#0ea5e9',
    title: 'VOICE-FIRST PLANNING',
    description: 'Build your business plan by having a conversation — talk through your ideas while walking, driving, or thinking. Hands-free entrepreneurship.',
    featured: false
  }
];

export function Innovation() {
  return (
    <section id="innovation" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">🚀 New-to-World</span>
          <h2>Features No One<br />Has Seen Before</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
            Innovations that define a new category in business planning.
          </p>
        </div>
        
        <div className="grid grid-2">
          {innovations.map((item, index) => (
            <div
              key={index}
              className="card"
              style={{
                gridColumn: item.featured ? 'span 2' : 'span 1',
                background: item.featured 
                  ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(16, 185, 129, 0.05))'
                  : undefined
              }}
            >
              <div style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                fontSize: item.featured ? '64px' : '48px',
                fontWeight: 800,
                color: 'var(--bg-tertiary)',
                lineHeight: 1
              }}>
                {item.number}
              </div>
              
              <span style={{
                display: 'inline-block',
                padding: '6px 12px',
                background: item.badgeColor,
                color: item.badgeColor === '#6366f1' || item.badgeColor === '#f43f5e' ? 'white' : 'var(--bg-deep)',
                borderRadius: '100px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '20px'
              }}>
                {item.badge}
              </span>
              
              <h3 style={{ fontSize: item.featured ? '28px' : '1.25rem', marginBottom: '16px' }}>
                {item.title}
              </h3>
              
              <p style={{ marginBottom: item.tags ? '24px' : 0 }}>
                {item.description}
              </p>
              
              {item.tags && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '8px 14px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '100px',
                        fontSize: '12px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
