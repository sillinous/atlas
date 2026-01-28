// ══════════════════════════════════════════════════════════════════════════════
// TRACK ONE [T1] — Interactive Demo Modal Component
// ══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState, useEffect, useRef } from 'react';
import { DEMO_SCENARIOS, DemoScenario } from '@/lib/demo-scenarios';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'select' | 'conversation' | 'results';
type ResultTab = 'research' | 'financials' | 'strategy' | 'documents';

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [step, setStep] = useState<Step>('select');
  const [selectedScenario, setSelectedScenario] = useState<string>('cheesecake');
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [agentProgress, setAgentProgress] = useState<Record<string, number>>({});
  const [resultTab, setResultTab] = useState<ResultTab>('research');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scenario = DEMO_SCENARIOS[selectedScenario];
  
  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('select');
      setMessageIndex(0);
      setDisplayedMessages([]);
      setAgentProgress({});
      setResultTab('research');
    }
  }, [isOpen]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages]);
  
  // Auto-play conversation
  useEffect(() => {
    if (step !== 'conversation') return;
    if (messageIndex >= scenario.conversation.length) {
      // Conversation complete, wait then show results
      const timer = setTimeout(() => setStep('results'), 1500);
      return () => clearTimeout(timer);
    }
    
    const timer = setTimeout(() => {
      setDisplayedMessages(prev => [...prev, scenario.conversation[messageIndex]]);
      setMessageIndex(prev => prev + 1);
      
      // Start agent progress after 2nd message
      if (messageIndex === 2) {
        startAgentProgress();
      }
    }, messageIndex === 0 ? 500 : 1200);
    
    return () => clearTimeout(timer);
  }, [step, messageIndex, scenario]);
  
  const startAgentProgress = () => {
    const agents = ['research', 'financial', 'strategy'];
    agents.forEach((agent, i) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 12;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setAgentProgress(prev => ({ ...prev, [agent]: progress }));
      }, 200 + i * 150);
    });
  };
  
  const handleStartDemo = () => {
    setStep('conversation');
    setMessageIndex(0);
    setDisplayedMessages([]);
    setAgentProgress({});
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="demo-modal active">
      <div className="demo-backdrop" onClick={onClose} />
      
      <div className="demo-content">
        {/* Header */}
        <div className="demo-header">
          <div className="logo" style={{ gap: '12px' }}>
            <div className="logo-mark" style={{ width: '36px', height: '36px', fontSize: '1rem' }}>A</div>
            <span style={{ fontSize: '1rem', fontWeight: 600 }}>ATLAS Demo</span>
          </div>
          <button className="demo-close" onClick={onClose}>×</button>
        </div>
        
        {/* Step 1: Scenario Selection */}
        {step === 'select' && (
          <div className="demo-step">
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ marginBottom: '12px' }}>Experience ATLAS in 60 seconds</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Choose a business scenario to explore:</p>
            </div>
            
            <div className="scenario-cards">
              {Object.values(DEMO_SCENARIOS).map((s) => (
                <div
                  key={s.id}
                  className={`scenario-card ${selectedScenario === s.id ? 'selected' : ''}`}
                  onClick={() => setSelectedScenario(s.id)}
                >
                  <span className="emoji">{s.emoji}</span>
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                  {s.id === 'cheesecake' && <span className="badge">Recommended</span>}
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button className="btn btn-primary btn-large" onClick={handleStartDemo}>
                Start Demo →
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Conversation */}
        {step === 'conversation' && (
          <div className="demo-step" style={{ padding: '24px' }}>
            <div className="demo-layout">
              {/* Chat Area */}
              <div className="demo-chat-area">
                <div className="demo-chat-messages">
                  {displayedMessages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`chat-message ${msg.role === 'user' ? 'user' : ''}`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className={`chat-avatar ${msg.role === 'user' ? 'user' : 'atlas'}`}>
                        {msg.role === 'user' ? 'U' : 'A'}
                      </div>
                      <div className="chat-bubble">{msg.content}</div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="demo-chat-input">
                  <input 
                    type="text" 
                    className="chat-input" 
                    placeholder="Demo mode — watching conversation..." 
                    disabled 
                    style={{ flex: 1 }}
                  />
                </div>
              </div>
              
              {/* Agent Panel */}
              <div className="agent-panel">
                <h4>🤖 Agent Activity</h4>
                
                {[
                  { key: 'research', icon: '🔍', name: 'Research Agent', status: 'Analyzing market...' },
                  { key: 'financial', icon: '📊', name: 'Financial Agent', status: 'Building projections...' },
                  { key: 'strategy', icon: '🎯', name: 'Strategy Agent', status: 'Mapping competition...' }
                ].map((agent) => (
                  <div key={agent.key} className="agent-task">
                    <div className="agent-icon">{agent.icon}</div>
                    <div className="agent-info">
                      <div className="agent-name">{agent.name}</div>
                      <div className="agent-status">
                        {(agentProgress[agent.key] || 0) >= 100 ? 'Complete ✓' : agent.status}
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${agentProgress[agent.key] || 0}%`,
                            background: (agentProgress[agent.key] || 0) >= 100 
                              ? 'var(--accent-secondary)' 
                              : 'var(--accent-primary)'
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Results */}
        {step === 'results' && (
          <div className="demo-step">
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ marginBottom: '8px' }}>
                <span style={{ color: 'var(--accent-secondary)' }}>✓</span> Analysis Complete
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Here's what ATLAS discovered for <strong>{scenario.name}</strong>
              </p>
            </div>
            
            {/* Tabs */}
            <div className="results-tabs">
              {(['research', 'financials', 'strategy', 'documents'] as ResultTab[]).map((tab) => (
                <button
                  key={tab}
                  className={`results-tab ${resultTab === tab ? 'active' : ''}`}
                  onClick={() => setResultTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Results Content */}
            <div style={{ minHeight: '280px' }}>
              {resultTab === 'research' && <ResearchResults scenario={scenario} />}
              {resultTab === 'financials' && <FinancialsResults scenario={scenario} />}
              {resultTab === 'strategy' && <StrategyResults scenario={scenario} />}
              {resultTab === 'documents' && <DocumentsResults scenario={scenario} />}
            </div>
            
            {/* CTA */}
            <div className="demo-cta">
              <button className="btn btn-outline">
                Download Sample Plan (PDF)
              </button>
              <button className="btn btn-primary">
                Create Free Account →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Results Sub-components
function ResearchResults({ scenario }: { scenario: DemoScenario }) {
  return (
    <div className="results-grid">
      <div className="result-card">
        <h4>📊 Market Size</h4>
        <div className="stat-large">{scenario.research.market.tam}</div>
        <p style={{ fontSize: '13px', margin: '4px 0' }}>Total Addressable Market</p>
        <div className="stat-row">
          <span>SAM: {scenario.research.market.sam}</span>
        </div>
        <div className="stat-row">
          <span>SOM: {scenario.research.market.som}</span>
        </div>
      </div>
      
      <div className="result-card">
        <h4>🎯 Competition</h4>
        {scenario.research.competitors.slice(0, 3).map((c, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '8px 0',
            borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none',
            fontSize: '13px'
          }}>
            <span>{c.name}</span>
            <span style={{ 
              color: c.threat === 'Low' ? 'var(--accent-secondary)' : 
                     c.threat === 'High' ? 'var(--accent-rose)' : 'var(--accent-primary)',
              fontSize: '12px'
            }}>
              {c.threat} Threat
            </span>
          </div>
        ))}
      </div>
      
      <div className="result-card">
        <h4>📍 Location</h4>
        <div style={{ fontSize: '13px', lineHeight: '2' }}>
          <div>Population: <strong>{scenario.research.location.population.toLocaleString()}</strong></div>
          <div>Median Income: <strong>{scenario.research.location.median_income}</strong></div>
          <div>Foot Traffic: <strong>{scenario.research.location.foot_traffic}</strong></div>
          <div>Rent Est.: <strong>{scenario.research.location.rent_estimate}</strong></div>
        </div>
      </div>
    </div>
  );
}

function FinancialsResults({ scenario }: { scenario: DemoScenario }) {
  const { projections, break_even, assumptions, startup_costs } = scenario.financials;
  
  return (
    <div className="results-grid">
      <div className="result-card wide">
        <h4>📈 3-Year Revenue Projection</h4>
        <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
          {['year1', 'year2', 'year3'].map((year, i) => {
            const data = projections[year as keyof typeof projections];
            const maxRevenue = projections.year3.revenue;
            return (
              <div key={year} style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Year {i + 1}
                </div>
                <div style={{ 
                  height: '80px', 
                  background: 'var(--bg-secondary)', 
                  borderRadius: '8px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${(data.revenue / maxRevenue) * 100}%`,
                    background: data.net >= 0 
                      ? 'linear-gradient(180deg, var(--accent-secondary), var(--accent-secondary-glow))'
                      : 'linear-gradient(180deg, var(--accent-primary), var(--accent-primary-glow))',
                    borderRadius: '8px 8px 0 0'
                  }} />
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '8px' }}>
                  ${(data.revenue / 1000).toFixed(0)}K
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: data.net >= 0 ? 'var(--accent-secondary)' : 'var(--accent-rose)'
                }}>
                  {data.net >= 0 ? '+' : ''}${(data.net / 1000).toFixed(0)}K net
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="result-card">
        <h4>⏱️ Break-Even</h4>
        <div className="stat-large">{break_even}</div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estimated time to profitability</p>
      </div>
      
      <div className="result-card">
        <h4>💰 Startup Costs</h4>
        <div className="stat-large">${(startup_costs.total / 1000).toFixed(0)}K</div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
          Equip: ${(startup_costs.equipment / 1000).toFixed(0)}K • 
          Marketing: ${(startup_costs.marketing / 1000).toFixed(1)}K
        </div>
      </div>
    </div>
  );
}

function StrategyResults({ scenario }: { scenario: DemoScenario }) {
  return (
    <div className="results-grid">
      <div className="result-card wide">
        <h4>🎯 Competitive Positioning</h4>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginTop: '16px'
        }}>
          <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Your Position</div>
            <div style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>Premium Quality + Local Focus</div>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>
              Differentiate through artisan quality and community connection
            </p>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Key Advantage</div>
            <div style={{ fontWeight: 600, color: 'var(--accent-secondary)' }}>No Direct Competition</div>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>
              Specialty cheesecake gap identified within 25-mile radius
            </p>
          </div>
        </div>
      </div>
      
      <div className="result-card">
        <h4>📋 Key Insights</h4>
        <ul style={{ fontSize: '13px', paddingLeft: '16px', lineHeight: '1.8' }}>
          {scenario.research.market.insights.slice(0, 3).map((insight, i) => (
            <li key={i} style={{ color: 'var(--text-secondary)' }}>{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DocumentsResults({ scenario }: { scenario: DemoScenario }) {
  const documents = [
    { icon: '📋', name: 'Full Business Plan', pages: '47 pages', status: 'Ready' },
    { icon: '🎯', name: 'Pitch Deck', pages: '12 slides', status: 'Ready' },
    { icon: '📊', name: 'Executive Summary', pages: '2 pages', status: 'Ready' },
    { icon: '💰', name: 'Financial Model', pages: 'Excel', status: 'Ready' }
  ];
  
  return (
    <div className="results-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
      {documents.map((doc, i) => (
        <div key={i} className="result-card" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px',
          padding: '20px'
        }}>
          <div style={{ 
            fontSize: '32px',
            width: '56px',
            height: '56px',
            background: 'var(--accent-primary-glow)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {doc.icon}
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>{doc.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{doc.pages}</div>
            <div style={{ 
              fontSize: '11px', 
              color: 'var(--accent-secondary)',
              marginTop: '4px'
            }}>
              ✓ {doc.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
