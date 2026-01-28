// ══════════════════════════════════════════════════════════════════════════════
// TRACK ONE [T1] — Features Component
// ══════════════════════════════════════════════════════════════════════════════

'use client';

interface FeaturesProps {
  onOpenDemo: () => void;
}

const features = [
  {
    icon: '💬',
    title: 'Conversational Planning',
    description: 'Build your entire business plan through natural conversation. No forms, no templates — just talk about your vision.',
    tag: 'Voice Enabled',
    color: '#f59e0b'
  },
  {
    icon: '🔬',
    title: 'Autonomous Research',
    description: 'AI agents research your market, competitors, and location while you work on other sections. Real data, real sources.',
    tag: '24/7 Active',
    color: '#10b981'
  },
  {
    icon: '📊',
    title: 'Intelligent Financials',
    description: 'Natural language financial modeling. Describe your business, get professional projections — validated against industry benchmarks.',
    tag: 'Auto-Calculated',
    color: '#6366f1'
  },
  {
    icon: '🎯',
    title: 'Strategy Studio',
    description: 'Visual strategy tools including Business Model Canvas, Lean Canvas, and competitive positioning — all AI-populated.',
    tag: 'Visual Builder',
    color: '#f43f5e'
  },
  {
    icon: '🤝',
    title: 'Stakeholder Connect',
    description: 'Find matching investors, lenders, and partners based on your business profile. Warm introductions, not cold outreach.',
    tag: 'Smart Matching',
    color: '#0ea5e9'
  },
  {
    icon: '📄',
    title: 'Dynamic Documents',
    description: 'Generate business plans, pitch decks, executive summaries — all from a single source of truth, always in sync.',
    tag: 'Multi-Format',
    color: '#8b5cf6'
  }
];

export function Features({ onOpenDemo }: FeaturesProps) {
  return (
    <section id="features" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">✦ Core Capabilities</span>
          <h2>Everything You Need,<br />Nothing You Don't</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
            Built on decades of business planning best practices, 
            supercharged with autonomous AI agents.
          </p>
        </div>
        
        <div className="grid grid-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card"
              style={{ 
                '--card-accent': feature.color,
                '--card-accent-glow': `${feature.color}20`
              } as React.CSSProperties}
            >
              <div 
                className="card-icon" 
                style={{ background: `${feature.color}15` }}
              >
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span 
                className="card-tag"
                style={{ color: feature.color }}
              >
                {feature.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
