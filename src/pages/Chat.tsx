import { useState, useRef, useEffect } from 'react'
import { useStore } from '../stores/useStore'
import { Send, Sparkles, Trash2, Bot, User } from 'lucide-react'

export default function Chat() {
  const { project, messages, addMessage, clearMessages, contextItems, financialSnapshot } = useStore()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const buildSystemPrompt = () => {
    let sys = `You are ATLAS, an expert business planning AI assistant. You help entrepreneurs build comprehensive business plans through natural conversation. Be specific, actionable, and data-driven.\n\nCurrent Project:\n- Name: ${project.name}\n- Industry: ${project.industry || 'Not set'}\n- Location: ${project.location || 'Not set'}\n- Description: ${project.description || 'Not set'}`
    if (contextItems.length > 0) {
      sys += `\n\nUser has uploaded ${contextItems.length} context document(s):\n`
      contextItems.slice(0, 5).forEach(c => { sys += `- [${c.category}] ${c.name}: ${c.content.slice(0, 500)}...\n` })
    }
    if (financialSnapshot) {
      const fs = financialSnapshot
      sys += `\n\nFinancial Model Summary:\n- Monthly Revenue: $${fs.monthlyRevenue.toFixed(0)}\n- COGS/Unit: $${fs.cogsPerUnit.toFixed(2)}\n- Gross Margin: ${(fs.grossMargin*100).toFixed(1)}%\n- Net Income/Mo: $${fs.monthlyNetIncome.toFixed(0)}\n- Net Margin: ${(fs.netMargin*100).toFixed(1)}%\n- Equipment Investment: $${fs.equipmentTotal.toFixed(0)}\n- Facility Mode: ${fs.facilityMode}\n- Break-even: ${fs.breakEvenMonths < 100 ? fs.breakEvenMonths + ' months' : 'N/A'}`
    }
    return sys
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setError('')
    addMessage({ role: 'user', content: userMsg })
    setLoading(true)
    try {
      const history = [...messages, { role: 'user' as const, content: userMsg }].slice(-20)
        .map(m => ({ role: m.role, content: m.content }))
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 1000,
          system: buildSystemPrompt(),
          messages: history,
        }),
      })
      const data = await res.json()
      const text = data.content?.map((b: any) => b.text || '').join('\n') || 'No response received.'
      addMessage({ role: 'assistant', content: text, agent: 'ATLAS' })
    } catch (e: any) {
      setError(e.message || 'Failed to get response')
    } finally { setLoading(false) }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-lg font-bold text-white/90 flex items-center gap-2"><Sparkles size={18} className="text-amber-400" /> ATLAS Chat</h1>
          <p className="text-xs text-white/30 mt-0.5">Build your business plan through conversation</p>
        </div>
        {messages.length > 0 && (
          <button onClick={clearMessages} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/30 hover:text-rose-400 border border-white/[0.08] rounded-lg hover:border-rose-500/30 transition">
            <Trash2 size={12} /> Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/10 flex items-center justify-center mb-4">
              <Sparkles size={28} className="text-amber-400/60" />
            </div>
            <h2 className="text-lg font-bold text-white/70 mb-2">Start a Conversation</h2>
            <p className="text-sm text-white/30 max-w-md mb-6">Tell ATLAS about your business idea, ask for analysis, or get help refining any aspect of your plan.</p>
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
              {['Help me refine my value proposition', 'What should my pricing strategy be?', 'Analyze my competitive landscape', 'Review my financial projections'].map(s => (
                <button key={s} onClick={() => { setInput(s) }} className="px-3 py-1.5 text-xs border border-white/[0.08] rounded-lg text-white/40 hover:text-amber-300 hover:border-amber-500/30 transition">{s}</button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-600/10 flex items-center justify-center shrink-0">
                <Bot size={14} className="text-amber-400" />
              </div>
            )}
            <div className={`max-w-[70%] px-4 py-3 rounded-xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-amber-500/15 text-white/85 border border-amber-500/20' : 'bg-white/[0.04] text-white/70 border border-white/[0.06]'}`}>
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center shrink-0">
                <User size={14} className="text-white/50" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-600/10 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-amber-400" />
            </div>
            <div className="px-4 py-3 bg-white/[0.04] border border-white/[0.06] rounded-xl">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-400/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-amber-400/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-amber-400/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        {error && <div className="text-center"><span className="text-xs text-rose-400 bg-rose-500/10 px-3 py-1 rounded-lg">{error}</span></div>}
        <div ref={bottomRef} />
      </div>

      <div className="px-6 py-4 border-t border-white/[0.06] shrink-0">
        <div className="flex gap-3 max-w-3xl mx-auto">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder={`Ask ATLAS about ${project.name}...`}
            className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-amber-500/40 transition" />
          <button onClick={sendMessage} disabled={!input.trim() || loading}
            className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm rounded-xl hover:brightness-110 transition disabled:opacity-30">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
