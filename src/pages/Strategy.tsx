import { useState } from 'react'
import { useStore } from '../stores/useStore'
import { Sparkles, Loader2 } from 'lucide-react'

const SWOT_INIT = { strengths: ['', '', ''], weaknesses: ['', '', ''], opportunities: ['', '', ''], threats: ['', '', ''] }
const BMC_KEYS = ['Key Partners', 'Key Activities', 'Key Resources', 'Value Propositions', 'Customer Relationships', 'Channels', 'Customer Segments', 'Cost Structure', 'Revenue Streams'] as const
type BmcData = Record<string, string>

export default function Strategy() {
  const { project, financialSnapshot } = useStore()
  const [view, setView] = useState<'swot' | 'bmc'>('swot')
  const [swot, setSwot] = useState(SWOT_INIT)
  const [bmc, setBmc] = useState<BmcData>(Object.fromEntries(BMC_KEYS.map(k => [k, ''])))
  const [loading, setLoading] = useState(false)

  const aiGenerate = async (type: 'swot' | 'bmc') => {
    setLoading(true)
    const finContext = financialSnapshot ? `Financial snapshot: Revenue $${financialSnapshot.monthlyRevenue.toFixed(0)}/mo, Net margin ${(financialSnapshot.netMargin * 100).toFixed(1)}%, Equipment $${financialSnapshot.equipmentTotal}, Facility: ${financialSnapshot.facilityMode}` : ''
    const prompt = type === 'swot'
      ? `Generate a SWOT analysis for: ${project.name} — ${project.description} in ${project.location}. ${finContext}\n\nRespond ONLY with JSON: {"strengths":["...","...","..."],"weaknesses":["...","...","..."],"opportunities":["...","...","..."],"threats":["...","...","..."]}`
      : `Generate a Business Model Canvas for: ${project.name} — ${project.description} in ${project.location}. ${finContext}\n\nRespond ONLY with JSON: {${BMC_KEYS.map(k => `"${k}":"..."`).join(',')}}`
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages: [{ role: 'user', content: prompt }] }),
      })
      const data = await res.json()
      const text = data.content?.map((b: any) => b.text || '').join('') || ''
      const clean = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)
      if (type === 'swot') setSwot(parsed)
      else setBmc(parsed)
    } catch { /* keep current values */ }
    finally { setLoading(false) }
  }

  const swotColors: Record<string, { bg: string; border: string; text: string; label: string }> = {
    strengths: { bg: 'bg-emerald-500/[0.08]', border: 'border-emerald-500/20', text: 'text-emerald-300', label: '💪 Strengths' },
    weaknesses: { bg: 'bg-rose-500/[0.08]', border: 'border-rose-500/20', text: 'text-rose-300', label: '⚠️ Weaknesses' },
    opportunities: { bg: 'bg-blue-500/[0.08]', border: 'border-blue-500/20', text: 'text-blue-300', label: '🚀 Opportunities' },
    threats: { bg: 'bg-amber-500/[0.08]', border: 'border-amber-500/20', text: 'text-amber-300', label: '🔥 Threats' },
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white/90 tracking-tight flex items-center gap-2">
            <span className="text-amber-400">🎯</span> Strategy
          </h1>
          <p className="text-sm text-white/40 mt-1">SWOT Analysis & Business Model Canvas</p>
        </div>
        <button onClick={() => aiGenerate(view)} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm rounded-lg hover:brightness-110 transition disabled:opacity-40">
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />} AI Generate
        </button>
      </div>

      <div className="flex gap-1 mb-6 bg-white/[0.03] rounded-xl p-1 border border-white/[0.06]">
        {([['swot', '📋 SWOT Analysis'], ['bmc', '🧩 Business Model Canvas']] as const).map(([k, l]) => (
          <button key={k} onClick={() => setView(k)} className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition ${view === k ? 'bg-white/[0.1] text-amber-300' : 'text-white/40 hover:text-white/60'}`}>
            {l}
          </button>
        ))}
      </div>

      {view === 'swot' && (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(swotColors).map(([key, style]) => (
            <div key={key} className={`p-5 rounded-xl ${style.bg} border ${style.border}`}>
              <div className={`text-sm font-bold ${style.text} mb-3`}>{style.label}</div>
              <div className="space-y-2">
                {(swot as any)[key].map((item: string, i: number) => (
                  <input key={i} value={item} onChange={e => {
                    const arr = [...(swot as any)[key]]; arr[i] = e.target.value
                    setSwot({ ...swot, [key]: arr })
                  }} placeholder={`Add ${key.slice(0, -1)}...`}
                    className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-amber-500/40" />
                ))}
                <button onClick={() => setSwot({ ...swot, [key]: [...(swot as any)[key], ''] })}
                  className="w-full py-1.5 border border-dashed border-white/[0.1] rounded-lg text-white/30 text-xs hover:text-white/50 transition">+ Add</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'bmc' && (
        <div className="grid grid-cols-5 gap-3">
          {BMC_KEYS.map((key, i) => {
            const spans: Record<number, string> = { 7: 'col-span-2 row-span-1', 8: 'col-span-3 row-span-1' }
            return (
              <div key={key} className={`p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] ${spans[i] || ''}`}>
                <div className="text-[10px] font-bold text-amber-400/60 uppercase tracking-wider mb-2">{key}</div>
                <textarea value={bmc[key]} onChange={e => setBmc({ ...bmc, [key]: e.target.value })}
                  placeholder={`Describe ${key.toLowerCase()}...`} rows={4}
                  className="w-full bg-transparent text-sm text-white/70 placeholder:text-white/15 outline-none resize-none leading-relaxed" />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
