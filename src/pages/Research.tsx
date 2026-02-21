import { useState } from 'react'
import { useStore } from '../stores/useStore'
import { Search, TrendingUp, Users, MapPin, Sparkles, Loader2 } from 'lucide-react'

export default function Research() {
  const { project } = useStore()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'market'|'competitors'|'location'>('market')

  const runResearch = async (prompt: string) => {
    setLoading(true); setResults('')
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 1000,
          system: `You are a business research analyst. Provide structured, data-driven analysis. Be specific with numbers, trends, and actionable insights. Business: ${project.name} in ${project.industry || 'unknown industry'}, located in ${project.location || 'unknown location'}.`,
          messages: [{ role: 'user', content: prompt }],
          tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        }),
      })
      const data = await res.json()
      setResults(data.content?.map((b: any) => b.text || '').filter(Boolean).join('\n') || 'No results')
    } catch (e: any) { setResults('Research failed: ' + e.message) }
    finally { setLoading(false) }
  }

  const presets: Record<string, { label: string; prompts: string[] }[]> = {
    market: [
      { label: 'Market Size & Growth', prompts: [`What is the current market size and growth trajectory for the ${project.industry || 'bakery'} industry in ${project.location || 'central Illinois'}? Include TAM, SAM, and SOM estimates.`] },
      { label: 'Industry Trends', prompts: [`What are the top 5 trends shaping the ${project.industry || 'bakery'} industry in 2025-2026? Include consumer behavior shifts and technology adoption.`] },
      { label: 'Customer Demographics', prompts: [`Profile the ideal customer segments for a ${project.industry || 'bakery'} business in ${project.location || 'rural Illinois'}. Include demographics, psychographics, and spending patterns.`] },
    ],
    competitors: [
      { label: 'Direct Competitors', prompts: [`Identify direct competitors for a ${project.description || 'bakery'} in ${project.location || 'Newton, IL'} and surrounding area. Analyze their strengths, weaknesses, pricing, and market position.`] },
      { label: 'Competitive Advantages', prompts: [`What unique competitive advantages could a new ${project.industry || 'bakery'} business develop in ${project.location || 'rural Illinois'}? Consider underserved niches and differentiation strategies.`] },
    ],
    location: [
      { label: 'Location Analysis', prompts: [`Analyze ${project.location || 'Newton, IL'} as a business location for a ${project.industry || 'bakery'}. Cover foot traffic, demographics, zoning, rent costs, and accessibility.`] },
      { label: 'Regulatory Environment', prompts: [`What permits, licenses, and health regulations apply to operating a ${project.industry || 'food service'} business in ${project.location || 'Illinois'}? Include state and local requirements.`] },
    ],
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white/90 tracking-tight flex items-center gap-2">
          <span className="text-amber-400">🔍</span> Market Research
        </h1>
        <p className="text-sm text-white/40 mt-1">AI-powered research with live web data for {project.name}</p>
      </div>

      <div className="flex gap-1 mb-6 bg-white/[0.03] rounded-xl p-1 border border-white/[0.06]">
        {([['market', '📊', 'Market Analysis'], ['competitors', '🎯', 'Competitors'], ['location', '📍', 'Location']] as const).map(([k, icon, l]) => (
          <button key={k} onClick={() => setActiveTab(k)} className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold transition ${activeTab === k ? 'bg-white/[0.1] text-amber-300' : 'text-white/40 hover:text-white/60'}`}>
            {icon} {l}
          </button>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        {presets[activeTab]?.map(p => (
          <button key={p.label} onClick={() => runResearch(p.prompts[0])} disabled={loading}
            className="w-full text-left p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-amber-500/20 hover:bg-white/[0.04] transition group disabled:opacity-40">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white/80 group-hover:text-amber-300 transition">{p.label}</div>
                <div className="text-xs text-white/30 mt-0.5 truncate max-w-lg">{p.prompts[0].slice(0, 100)}...</div>
              </div>
              <Sparkles size={16} className="text-white/20 group-hover:text-amber-400 transition" />
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && query.trim() && runResearch(query)}
          placeholder="Custom research query..."
          className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-amber-500/40" />
        <button onClick={() => query.trim() && runResearch(query)} disabled={loading || !query.trim()}
          className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm rounded-xl hover:brightness-110 transition disabled:opacity-30">
          <Search size={16} />
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={24} className="text-amber-400 animate-spin mr-3" />
          <span className="text-sm text-white/50">Researching...</span>
        </div>
      )}

      {results && !loading && (
        <div className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.02]">
          <div className="text-xs font-bold text-amber-400/60 uppercase tracking-wider mb-3">Research Results</div>
          <div className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{results}</div>
        </div>
      )}
    </div>
  )
}
