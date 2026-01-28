// ══════════════════════════════════════════════════════════════════════════════
// TRACK ONE [T1] — Navigation Component
// ══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavigationProps {
  onOpenDemo: () => void;
}

export function Navigation({ onOpenDemo }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <div className="logo-mark">A</div>
            <span className="logo-text">ATLAS</span>
            <span className="logo-version">2.0</span>
          </Link>
          
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#agents">AI Agents</a></li>
            <li><a href="#compare">Compare</a></li>
            <li><a href="#innovation">Innovation</a></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
          
          <div className="nav-cta">
            <button className="btn btn-ghost" onClick={onOpenDemo}>
              Try Demo
            </button>
            <button className="btn btn-primary" onClick={onOpenDemo}>
              Start Free →
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
