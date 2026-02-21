import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, MessageSquare, FileText, Target, Search, FolderInput, Sparkles, Shield } from 'lucide-react'

const features = [
  { icon: MessageSquare, title: 'AI Business Chat', desc: 'Build your plan through natural conversation' },
  { icon: BarChart3, title: 'Production Financials', desc: 'Full cost modeling with facility comparison and P&L' },
  { icon: Target, title: 'Strategy Canvas', desc: 'SWOT analysis and business model canvas' },
  { icon: Search, title: 'Market Research', desc: 'Competitive landscape and market sizing' },
  { icon: FolderInput, title: 'Context Import', desc: 'Upload existing docs, notes, and prior plans' },
  { icon: FileText, title: 'Document Generation', desc: 'Export investor-ready business plans' },
  { icon: Shield, title: 'Validation Scoring', desc: 'Track business viability across key dimensions' },
  { icon: Sparkles, title: 'Agentic Intelligence', desc: 'AI agents work autonomously on research and analysis' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#08080d] text-white">
      <header className="border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-sm font-black text-black">A</div>
            <span className="text-xl font-bold tracking-tight">ATLAS</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold tracking-wider">3.0</span>
          </div>
          <Link to="/app" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm rounded-lg hover:brightness-110 transition">
            Launch Platform <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-3xl">
          <div className="text-[11px] font-bold tracking-[0.2em] text-amber-400/80 uppercase mb-4">Next-Generation Business Planning</div>
          <h1 className="text-5xl font-black tracking-tight leading-[1.1] mb-6">
            From Idea to Empire.
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Autonomously.</span>
          </h1>
          <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-xl">
            ATLAS isn't another template tool. It's an autonomous business intelligence system
            with AI agents that research, model, validate, and generate — while you focus on your vision.
          </p>
          <div className="flex gap-4">
            <Link to="/app" className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-lg hover:brightness-110 transition text-sm">
              Start Building →
            </Link>
            <Link to="/app/financials" className="px-8 py-3 border border-white/[0.15] text-white/70 font-semibold rounded-lg hover:border-amber-500/40 hover:text-amber-300 transition text-sm">
              Try Financial Model
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-xs font-bold tracking-[0.15em] text-white/30 uppercase mb-8">Platform Capabilities</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-amber-500/20 hover:bg-white/[0.04] transition group">
              <Icon size={20} className="text-amber-400/60 mb-3 group-hover:text-amber-400 transition" />
              <div className="text-sm font-bold text-white/80 mb-1">{title}</div>
              <div className="text-xs text-white/35 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/[0.06] mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-xs text-white/20">
          ATLAS 3.0 — Built by UNLESS · Autonomous Business Intelligence
        </div>
      </footer>
    </div>
  )
}
