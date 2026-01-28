// ══════════════════════════════════════════════════════════════════════════════
// TRACK ONE [T1] — Agents Component
// ══════════════════════════════════════════════════════════════════════════════

'use client';

const agents = [
  { icon: '🔬', name: 'Research Agent', desc: 'Market analysis, competitor intelligence, location data', color: '#10b981' },
  { icon: '📊', name: 'Financial Agent', desc: 'Projections, scenarios, unit economics, validation', color: '#6366f1' },
  { icon: '🎯', name: 'Strategy Agent', desc: 'Positioning, canvases, roadmaps, competitive analysis', color: '#f59e0b' },
  { icon: '📄', name: 'Document Agent', desc: 'Plans, decks, summaries, data rooms — any format', color: '#f43f5e' },
];

export function Agents() {
  return (
    <section 
      id="agents" 
      className="section"
      style={{ 
        background: 'linear-gradient(180deg, transparent, var(--bg-secondary) 20%, var(--bg-secondary) 80%, transparent)' 
      }}
    >
      <div className="container">
        <div className="hero-grid" style={{ gap: '60px' }}>
          {/* Orbital Visualization */}
          <div style={{ position: 'relative', height: '450px' }}>
            {/* Orbital rings */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '180px',
              height: '180px',
              border: '1px dashed var(--border-subtle)',
              borderRadius: '50%',
              animation: 'spin 25s linear infinite'
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '280px',
              height: '280px',
              border: '1px dashed var(--border-subtle)',
              borderRadius: '50%',
              animation: 'spin 35s linear infinite reverse'
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '380px',
              height: '380px',
              border: '1px dashed var(--border-subtle)',
              borderRadius: '50%',
              animation: 'spin 45s linear infinite'
            }} />
            
            {/* Agent nodes */}
            {[
              { top: '20%', left: '15%', emoji: '🔍', color: '#10b981' },
              { top: '10%', right: '25%', emoji: '📊', color: '#6366f1' },
              { bottom: '25%', right: '10%', emoji: '🎯', color: '#f59e0b' },
              { bottom: '10%', left: '30%', emoji: '📄', color: '#f43f5e' },
              { top: '45%', left: '5%', emoji: '🤝', color: '#0ea5e9' },
              { bottom: '30%', right: '25%', emoji: '⚙️', color: '#8b5cf6' },
            ].map((node, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  ...node,
                  width: '48px',
                  height: '48px',
                  background: 'var(--bg-tertiary)',
                  border: `2px solid ${node.color}`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  boxShadow: `0 0 20px -4px ${node.color}`
                }}
              >
                {node.emoji}
              </div>
            ))}
            
            {/* Center conductor */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '72px',
              height: '72px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              boxShadow: '0 0 60px -12px rgba(245, 158, 11, 0.5)',
              zIndex: 10
            }}>
              🧠
            </div>
            
            <style jsx>{`
              @keyframes spin {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg); }
              }
            `}</style>
          </div>
          
          {/* Content */}
          <div>
            <span className="section-label">◈ Multi-Agent System</span>
            <h2 style={{ marginBottom: '24px' }}>
              Your Personal<br />Agent Swarm
            </h2>
            <p style={{ 
              fontSize: '1.0625rem', 
              color: 'var(--text-secondary)', 
              marginBottom: '32px',
              lineHeight: '1.7'
            }}>
              Six specialized AI agents work in parallel, orchestrated by a 
              central Conductor. They research, analyze, model, and generate 
              — while you focus on the vision.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {agents.map((agent, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 20px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    transition: 'all 0.25s'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    background: `${agent.color}15`
                  }}>
                    {agent.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', marginBottom: '4px' }}>{agent.name}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{agent.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
