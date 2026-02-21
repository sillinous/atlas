import { useState } from 'react'
import { useStore } from '../stores/useStore'
import { FileText, Sparkles, Loader2, Copy, Check } from 'lucide-react'

const SECTIONS = [
  { id: 'exec', label: 'Executive Summary', icon: '📋', prompt: 'Write a compelling executive summary' },
  { id: 'company', label: 'Company Description', icon: '🏢', prompt: 'Write a detailed company description covering mission, vision, and legal structure' },
  { id: 'market', label: 'Market Analysis', icon: '📊', prompt: 'Write a market analysis section with industry overview, target market, and competitive landscape' },
  { id: 'products', label: 'Products & Services', icon: '🎂', prompt: 'Describe products and services, including pricing strategy and unique value proposition' },
  { id: 'marketing', label: 'Marketing Strategy', icon: '📢', prompt: 'Write a marketing and sales strategy covering customer acquisition, channels, and positioning' },
  { id: 'operations', label: 'Operations Plan', icon: '⚙️', prompt: 'Detail the operations plan including production, facilities, equipment, and daily workflow' },
  { id: 'financial', label: 'Financial Projections', icon: '💰', prompt: 'Write the financial projections section summarizing revenue model, cost structure, profitability, and funding needs' },
  { id: 'team', label: 'Management Team', icon: '👥', prompt: 'Describe the management team, organizational structure, and key personnel' },
]

export default function Documents() {
  const { project, financialSnapshot, contextItems } = useStore()
  const [docs, setDocs] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const generate = async (section: typeof SECTIONS[0]) => {
    setLoading(section.id)
    const finCtx = financialSnapshot
      ? `\n\nFinancial Data: Monthly revenue $${financialSnapshot.monthlyRevenue.toFixed(0)}, COGS/unit $${financialSnapshot.cogsPerUnit.toFixed(2)}, Gross margin ${(financialSnapshot.grossMargin*100).toFixed(1)}%, Net margin ${(financialSnapshot.netMargin*100).toFixed(1)}%, Net income $${financialSnapshot.monthlyNetIncome.toFixed(0)}/mo, Equipment investment $${financialSnapshot.equipmentTotal}, Facility: ${financialSnapshot.facilityMode}, Break-even: ${financialSnapshot.breakEvenMonths < 100 ? financialSnapshot.breakEvenMonths + ' months' : 'TBD'}`
      : ''
    const ctxSummary = contextItems.length > 0
      ? `\n\nUser-provided context:\n${contextItems.slice(0, 3).map(c => `[${c.category}] ${c.name}: ${c.content.slice(0, 300)}`).join('\n')}`
      : ''
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 1000,
          system: `You are a professional business plan writer. Write polished, investor-ready content. Be specific and data-driven. Use the financial data provided where relevant. Do not use markdown headers or bullet points — write in flowing prose paragraphs.`,
          messages: [{ role: 'user', content: `${section.prompt} for: ${project.name} — ${project.description}. Industry: ${project.industry}. Location: ${project.location}.${finCtx}${ctxSummary}` }],
        }),
      })
      const data = await res.json()
      const text = data.content?.map((b: any) => b.text || '').join('\n') || ''
      setDocs(prev => ({ ...prev, [section.id]: text }))
    } catch (e: any) { setDocs(prev => ({ ...prev, [section.id]: 'Generation failed: ' + e.message })) }
    finally { setLoading(null) }
  }

  const copySection = (id: string) => {
    navigator.clipboard.writeText(docs[id] || '')
    setCopied(id); setTimeout(() => setCopied(null), 2000)
  }

  const generateAll = async () => {
    for (const s of SECTIONS) {
      await generate(s)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white/90 tracking-tight flex items-center gap-2">
            <span className="text-amber-400">📄</span> Business Plan Documents
          </h1>
          <p className="text-sm text-white/40 mt-1">Generate investor-ready plan sections powered by your project data</p>
        </div>
        <button onClick={generateAll} disabled={!!loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm rounded-lg hover:brightness-110 transition disabled:opacity-40">
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />} Generate All
        </button>
      </div>

      <div className="space-y-3">
        {SECTIONS.map(section => (
          <div key={section.id} className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-lg">{section.icon}</span>
                <div>
                  <div className="text-sm font-bold text-white/80">{section.label}</div>
                  <div className="text-[10px] text-white/30 mt-0.5">{docs[section.id] ? `${docs[section.id].length} chars generated` : 'Not generated'}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {docs[section.id] && (
                  <button onClick={() => copySection(section.id)} className="flex items-center gap-1 px-3 py-1.5 text-xs border border-white/[0.08] rounded-lg text-white/40 hover:text-amber-300 transition">
                    {copied === section.id ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                  </button>
                )}
                <button onClick={() => generate(section)} disabled={loading === section.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/[0.06] border border-white/[0.1] rounded-lg text-white/60 hover:text-amber-300 hover:border-amber-500/30 transition disabled:opacity-40">
                  {loading === section.id ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                  {docs[section.id] ? 'Regenerate' : 'Generate'}
                </button>
              </div>
            </div>
            {docs[section.id] && (
              <div className="px-5 py-4 border-t border-white/[0.06] bg-white/[0.01]">
                <textarea value={docs[section.id]} onChange={e => setDocs(prev => ({ ...prev, [section.id]: e.target.value }))}
                  rows={8} className="w-full bg-transparent text-sm text-white/70 leading-relaxed outline-none resize-y" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
