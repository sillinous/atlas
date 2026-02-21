import { Link } from 'react-router-dom'
import { useStore } from '../stores/useStore'
import { BarChart3, MessageSquare, FileText, FolderInput, Target, Search, ArrowRight } from 'lucide-react'

export default function Dashboard() {
  const { project, financialSnapshot: fs, contextItems, messages } = useStore()

  const healthScore = (() => {
    let s = 10
    if (project.name && project.name !== 'My Business') s += 10
    if (project.industry) s += 10
    if (project.description) s += 10
    if (project.location) s += 10
    if (contextItems.length > 0) s += 10
    if (messages.length > 3) s += 10
    if (fs) { s += 15; if (fs.monthlyNetIncome > 0) s += 15 }
    return Math.min(s, 100)
  })()

  const modules = [
    { path: '/app/chat', icon: MessageSquare, label: 'AI Chat', desc: 'Continue building your plan through conversation', stat: `${messages.length} messages` },
    { path: '/app/context', icon: FolderInput, label: 'Context', desc: 'Upload existing docs and materials', stat: `${contextItems.length} items` },
    { path: '/app/financials', icon: BarChart3, label: 'Financials', desc: 'Production cost modeling and P&L', stat: fs ? `${(fs.netMargin * 100).toFixed(0)}% net margin` : 'Not started' },
    { path: '/app/research', icon: Search, label: 'Research', desc: 'Market analysis and competitor intel', stat: 'Ready' },
    { path: '/app/strategy', icon: Target, label: 'Strategy', desc: 'SWOT analysis and business model canvas', stat: 'Ready' },
    { path: '/app/documents', icon: FileText, label: 'Documents', desc: 'Generate investor-ready plans', stat: 'Ready' },
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white/90 tracking-tight">{project.name}</h1>
        <p className="text-sm text-white/40 mt-1">{project.description || 'Start by setting up your project details'}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="col-span-1 p-5 rounded-xl bg-gradient-to-br from-amber-600/20 to-orange-700/10 border border-amber-500/20">
          <div className="text-[10px] font-bold text-amber-400/60 uppercase tracking-widest mb-2">Business Health</div>
          <div className="text-4xl font-black font-mono text-amber-300">{healthScore}</div>
          <div className="text-[10px] text-white/30 mt-1">/ 100 readiness score</div>
          <div className="mt-3 h-2 bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all" style={{ width: `${healthScore}%` }} />
          </div>
        </div>

        {fs ? (
          <>
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Monthly Revenue</div>
              <div className="text-2xl font-black font-mono text-white/80">${(fs.monthlyRevenue / 1000).toFixed(1)}K</div>
              <div className="text-[10px] text-white/30 mt-1">${(fs.monthlyRevenue * 12 / 1000).toFixed(0)}K annualized</div>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Net Income</div>
              <div className={`text-2xl font-black font-mono ${fs.monthlyNetIncome >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                ${(Math.abs(fs.monthlyNetIncome) / 1000).toFixed(1)}K
              </div>
              <div className="text-[10px] text-white/30 mt-1">{(fs.netMargin * 100).toFixed(1)}% net margin</div>
            </div>
          </>
        ) : (
          <div className="col-span-2 p-5 rounded-xl border border-dashed border-white/[0.1] flex items-center justify-center">
            <Link to="/app/financials" className="text-sm text-amber-400/60 hover:text-amber-300 transition flex items-center gap-2">
              Set up financial model to see projections <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>

      <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Modules</div>
      <div className="grid grid-cols-2 gap-3">
        {modules.map(({ path, icon: Icon, label, desc, stat }) => (
          <Link key={path} to={path} className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-amber-500/20 hover:bg-white/[0.04] transition group">
            <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-amber-500/10 transition">
              <Icon size={18} className="text-white/40 group-hover:text-amber-400 transition" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white/80">{label}</div>
              <div className="text-[11px] text-white/30 mt-0.5">{desc}</div>
              <div className="text-[10px] text-amber-400/50 font-semibold mt-1.5">{stat}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
