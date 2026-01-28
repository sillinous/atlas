// ══════════════════════════════════════════════════════════════════════════════
// TRACK ONE [T1] — Footer Component
// ══════════════════════════════════════════════════════════════════════════════

'use client';

import Link from 'next/link';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'AI Agents', href: '#agents' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Integrations', href: '#' },
    { label: 'API', href: '#' }
  ],
  resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Sample Plans', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Guides', href: '#' },
    { label: 'Community', href: '#' }
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' }
  ]
};

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <div className="logo-mark">A</div>
              <span className="logo-text">ATLAS</span>
              <span className="logo-version">2.0</span>
            </Link>
            <p>
              The world's first agentic business planning platform. 
              From idea to empire — autonomously.
            </p>
          </div>
          
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              {footerLinks.product.map((link, i) => (
                <li key={i}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              {footerLinks.resources.map((link, i) => (
                <li key={i}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 ATLAS. Built for builders.</p>
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-dim)' }}>
            v2.0.0
          </p>
        </div>
      </div>
    </footer>
  );
}
