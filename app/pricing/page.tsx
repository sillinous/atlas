// ══════════════════════════════════════════════════════════════════════════════
// TRACK ONE [T1] — Pricing Page
// ══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { DemoModal } from '@/components/DemoModal';

const tiers = [
  {
    name: 'Explorer',
    price: { monthly: 0, annual: 0 },
    description: 'Perfect for testing ideas',
    features: [
      '1 project',
      '50 AI conversations/month',
      '5 research queries/month',
      '3 document exports/month',
      'Basic templates',
      'Community support'
    ],
    cta: 'Start Free',
    featured: false
  },
  {
    name: 'Builder',
    price: { monthly: 29, annual: 24 },
    description: 'For serious founders',
    features: [
      '3 projects',
      '500 AI conversations/month',
      '50 research queries/month',
      'Unlimited exports',
      '2 collaborators',
      'Voice planning',
      '10 simulations/month',
      'Email support'
    ],
    cta: 'Start Building →',
    featured: false
  },
  {
    name: 'Pro',
    price: { monthly: 79, annual: 66 },
    description: 'For funded startups',
    features: [
      '10 projects',
      '2,000 AI conversations/month',
      '200 research queries/month',
      'Unlimited exports',
      '5 collaborators',
      'Voice planning',
      '50 simulations/month',
      'AR Visualizer',
      'Full Regulatory Autopilot',
      'Launch Sequence',
      'Priority support'
    ],
    cta: 'Start Pro Trial →',
    featured: true,
    badge: 'Most Popular'
  },
  {
    name: 'Enterprise',
    price: { monthly: null, annual: null },
    description: 'For teams and organizations',
    features: [
      'Unlimited projects',
      'Unlimited AI conversations',
      'Unlimited research',
      'Unlimited collaborators',
      'API access',
      'SSO/SAML',
      'Data residency options',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee'
    ],
    cta: 'Contact Sales',
    featured: false
  }
];

export default function PricingPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  
  return (
    <>
      <Navigation onOpenDemo={() => setDemoOpen(true)} />
      
      <section className="section" style={{ paddingTop: '160px' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">💎 Simple Pricing</span>
            <h1>Plans That Grow<br />With Your Business</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
              Start free. Upgrade when you're ready. Cancel anytime.
            </p>
          </div>
          
          {/* Toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px', 
              padding: '6px',
              background: 'var(--bg-tertiary)',
              borderRadius: '100px'
            }}>
              <button
                className={`btn ${!isAnnual ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '10px 20px' }}
                onClick={() => setIsAnnual(false)}
              >
                Monthly
              </button>
              <button
                className={`btn ${isAnnual ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '10px 20px' }}
                onClick={() => setIsAnnual(true)}
              >
                Annual <span style={{ 
                  color: isAnnual ? 'var(--bg-deep)' : 'var(--accent-secondary)', 
                  fontSize: '11px',
                  marginLeft: '4px'
                }}>Save 20%</span>
              </button>
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {tiers.map((tier, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-card)',
                  border: tier.featured 
                    ? '2px solid var(--accent-primary)' 
                    : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '32px 24px',
                  transform: tier.featured ? 'scale(1.02)' : 'none',
                  boxShadow: tier.featured ? 'var(--shadow-glow)' : 'none',
                  position: 'relative'
                }}
              >
                {tier.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '6px 16px',
                    background: 'var(--accent-primary)',
                    color: 'var(--bg-deep)',
                    borderRadius: '100px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {tier.badge}
                  </span>
                )}
                
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{tier.name}</h3>
                
                <div style={{ marginBottom: '8px' }}>
                  {tier.price.monthly !== null ? (
                    <span style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                      ${isAnnual ? tier.price.annual : tier.price.monthly}
                      <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-muted)' }}>
                        {tier.price.monthly > 0 ? '/mo' : ''}
                      </span>
                    </span>
                  ) : (
                    <span style={{ fontSize: '2rem', fontWeight: 700 }}>Custom</span>
                  )}
                </div>
                
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                  {tier.description}
                </p>
                
                <ul style={{ listStyle: 'none', marginBottom: '24px' }}>
                  {tier.features.map((feature, j) => (
                    <li key={j} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      padding: '8px 0'
                    }}>
                      <span style={{ color: 'var(--accent-secondary)' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`btn ${tier.featured ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%' }}
                  onClick={() => tier.name !== 'Enterprise' && setDemoOpen(true)}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">❓ FAQ</span>
            <h2>Common Questions</h2>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '16px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {[
              { q: 'Can I change plans anytime?', a: 'Yes! Upgrade or downgrade at any time. Changes take effect immediately, with prorated billing.' },
              { q: 'Is there a free trial?', a: 'The Explorer plan is free forever. Pro and Builder plans include a 14-day free trial with full features.' },
              { q: 'What payment methods do you accept?', a: 'All major credit cards, PayPal, and wire transfer for Enterprise plans.' },
              { q: 'Can I export my data?', a: 'Absolutely. You own your data. Export to PDF, DOCX, XLSX, or JSON at any time.' }
            ].map((faq, i) => (
              <div key={i} style={{ 
                padding: '24px', 
                background: 'var(--bg-tertiary)', 
                borderRadius: '16px' 
              }}>
                <h4 style={{ marginBottom: '12px' }}>{faq.q}</h4>
                <p style={{ fontSize: '14px', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
      
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      
      <style jsx>{`
        @media (max-width: 1024px) {
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
