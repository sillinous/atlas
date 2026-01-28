// ══════════════════════════════════════════════════════════════════════════════
// TRACK ONE [T1] — Root Layout
// ══════════════════════════════════════════════════════════════════════════════

import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ATLAS 2.0 | From Idea to Empire — Autonomously',
  description: 'The world\'s first agentic business planning platform. AI agents research, analyze, model, and build your business plan autonomously.',
  keywords: 'business plan, AI, startup, entrepreneur, business planning software',
  openGraph: {
    title: 'ATLAS 2.0 | From Idea to Empire — Autonomously',
    description: 'The world\'s first agentic business planning platform.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
        <link 
          rel="icon" 
          type="image/svg+xml" 
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23f59e0b' rx='20' width='100' height='100'/><text x='50' y='70' font-size='60' text-anchor='middle' fill='%230c0a09' font-family='system-ui' font-weight='bold'>A</text></svg>" 
        />
      </head>
      <body>
        <div className="atmosphere" />
        {children}
      </body>
    </html>
  )
}
