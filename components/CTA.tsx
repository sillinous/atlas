// ══════════════════════════════════════════════════════════════════════════════
// TRACK ONE [T1] — CTA Component
// ══════════════════════════════════════════════════════════════════════════════

'use client';

interface CTAProps {
  onOpenDemo: () => void;
}

export function CTA({ onOpenDemo }: CTAProps) {
  return (
    <section className="section" style={{ textAlign: 'center', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(ellipse, var(--accent-primary-glow), transparent 70%)',
        pointerEvents: 'none'
      }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: 'clamp(40px, 5vw, 56px)', marginBottom: '20px' }}>
          Ready to Build Your<br />
          <span className="gradient-text">Empire?</span>
        </h2>
        
        <p style={{
          fontSize: '18px',
          color: 'var(--text-secondary)',
          marginBottom: '40px',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Join thousands of entrepreneurs using ATLAS to turn ideas 
          into thriving businesses — autonomously.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-large" onClick={onOpenDemo}>
            Try Interactive Demo →
          </button>
          <button className="btn btn-outline btn-large">
            Schedule Demo Call
          </button>
        </div>
      </div>
    </section>
  );
}
