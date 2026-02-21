import { Outlet, NavLink, Link } from 'react-router-dom'
import { useStore } from '../stores/useStore'
import {
  LayoutDashboard, MessageSquare, FolderInput, BarChart3,
  Search, Target, FileText, Settings, ArrowLeft
} from 'lucide-react'

const nav = [
  { path: '/app', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/app/chat', icon: MessageSquare, label: 'AI Chat' },
  { path: '/app/context', icon: FolderInput, label: 'Context' },
  { path: '/app/financials', icon: BarChart3, label: 'Financials' },
  { path: '/app/research', icon: Search, label: 'Research' },
  { path: '/app/strategy', icon: Target, label: 'Strategy' },
  { path: '/app/documents', icon: FileText, label: 'Documents' },
  { path: '/app/settings', icon: Settings, label: 'Settings' },
]

export default function Layout() {
  const { project, financialSnapshot: fs } = useStore()

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <aside className="w-56 shrink-0 border-r border-white/[0.06] bg-[#0c0c14] flex flex-col">
        <Link to="/" className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.06] hover:bg-white/[0.02] transition">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-sm font-black text-black">A</div>
          <span className="text-base font-bold tracking-tight">ATLAS</span>
        </Link>

        <div className="px-4 py-3 border-b border-white/[0.06]">
          <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Project</div>
          <div className="text-sm font-semibold text-white/80 truncate">{project.name}</div>
          <div className="text-[10px] text-white/30 mt-0.5">{project.location || 'No location set'}</div>
        </div>

        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {nav.map(({ path, icon: Icon, label, end }) => (
            <NavLink key={path} to={path} end={end}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition ${isActive ? 'bg-white/[0.08] text-amber-300' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'}`}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {fs && (
          <div className="px-4 py-3 border-t border-white/[0.06] bg-white/[0.02]">
            <div className="text-[9px] text-white/30 uppercase tracking-widest mb-2">Financial Pulse</div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div>
                <div className="text-white/30">Monthly Rev</div>
                <div className="font-bold font-mono text-white/70">${(fs.monthlyRevenue/1000).toFixed(1)}K</div>
              </div>
              <div>
                <div className="text-white/30">Net Income</div>
                <div className={`font-bold font-mono ${fs.monthlyNetIncome >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ${(Math.abs(fs.monthlyNetIncome)/1000).toFixed(1)}K
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 py-3 border-t border-white/[0.06]">
          <Link to="/" className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition">
            <ArrowLeft size={12} /> Back to Home
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
