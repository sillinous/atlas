// ══════════════════════════════════════════════════════════════════════════════
// TRACK ONE [T1] — Hero Component
// ══════════════════════════════════════════════════════════════════════════════

'use client';

interface HeroProps {
  onOpenDemo: () => void;
}

export function Hero({ onOpenDemo }: HeroProps) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              <span>Next-Generation Business Planning</span>
            </div>
            
            <h1>
              From Idea to<br />
              <span className="gradient-text">Empire</span> —<br />
              Autonomously
            </h1>
            
            <p className="hero-subtitle">
              ATLAS 2.0 is the world's first agentic business planning platform. 
              AI agents research, analyze, model, and build your business plan 
              while you focus on your vision.
            </p>
            
            <div className="hero-ctas">
              <button className="btn btn-primary btn-large" onClick={onOpenDemo}>
                Try Interactive Demo →
              </button>
              <button className="btn btn-outline btn-large">
                Watch Video
              </button>
            </div>
            
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-value">10x</div>
                <div className="hero-stat-label">Faster than traditional</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">6</div>
                <div className="hero-stat-label">AI agents working for you</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">72%</div>
                <div className="hero-stat-label">Higher funding success</div>
              </div>
            </div>
          </div>
          
          <div className="hero-preview">
            <div className="preview-window">
              <div className="preview-header">
                <span className="preview-dot red" />
                <span className="preview-dot yellow" />
                <span className="preview-dot green" />
                <span className="preview-title">ATLAS — Conversation</span>
              </div>
              <div className="preview-content">
                <div className="chat-messages">
                  <div className="chat-message">
                    <div className="chat-avatar atlas">A</div>
                    <div className="chat-bubble">
                      Hello! I'm ATLAS, your business planning partner. 
                      Tell me about the business you're dreaming of — 
                      I'll help bring it to life.
                    </div>
                  </div>
                  <div className="chat-message user">
                    <div className="chat-avatar user">U</div>
                    <div className="chat-bubble">
                      I want to open a specialty cheesecake bakery 
                      in a small town.
                    </div>
                  </div>
                  <div className="chat-message">
                    <div className="chat-avatar atlas">A</div>
                    <div className="chat-bubble">
                      Love it! A specialty bakery in a small town — 
                      there's real opportunity there. I've already 
                      dispatched my research agents to analyze the 
                      market. While they work, tell me more...
                      <div className="chat-actions">
                        <span className="chat-action" onClick={onOpenDemo}>
                          Try full demo →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
