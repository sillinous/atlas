// ══════════════════════════════════════════════════════════════════════════════
// TRACK ONE [T1] — Homepage
// ══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Agents } from '@/components/Agents';
import { Comparison } from '@/components/Comparison';
import { Innovation } from '@/components/Innovation';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { DemoModal } from '@/components/DemoModal';

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);
  
  return (
    <>
      <Navigation onOpenDemo={() => setDemoOpen(true)} />
      <Hero onOpenDemo={() => setDemoOpen(true)} />
      <Features onOpenDemo={() => setDemoOpen(true)} />
      <Agents />
      <Comparison />
      <Innovation />
      <CTA onOpenDemo={() => setDemoOpen(true)} />
      <Footer />
      
      <DemoModal 
        isOpen={demoOpen} 
        onClose={() => setDemoOpen(false)} 
      />
    </>
  );
}
