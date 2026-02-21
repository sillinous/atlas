import { useStore } from '../stores/useStore'
import { Save } from 'lucide-react'

export default function Settings() {
  const { project, setProject } = useStore()

  const fields = [
    { key: 'name', label: 'Business Name', placeholder: 'The Cheesecake Atelier' },
    { key: 'industry', label: 'Industry', placeholder: 'Bakery, Restaurant, SaaS...' },
    { key: 'location', label: 'Location', placeholder: 'Newton, IL' },
  ] as const

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white/90 tracking-tight flex items-center gap-2">
          <span className="text-amber-400">⚙️</span> Settings
        </h1>
        <p className="text-sm text-white/40 mt-1">Configure your business project</p>
      </div>

      <div className="space-y-5">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">{label}</label>
            <input value={project[key]} onChange={e => setProject({ [key]: e.target.value })} placeholder={placeholder}
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-amber-500/40 transition" />
          </div>
        ))}
        <div>
          <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Description</label>
          <textarea value={project.description} onChange={e => setProject({ description: e.target.value })}
            placeholder="Describe your business concept..." rows={4}
            className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-amber-500/40 transition resize-y" />
        </div>
      </div>

      <div className="mt-8 p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <div className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Data Management</div>
        <div className="flex gap-3">
          <button onClick={() => {
            const data = JSON.stringify(useStore.getState(), null, 2)
            const blob = new Blob([data], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a'); a.href = url; a.download = `atlas-${project.name.toLowerCase().replace(/\s+/g, '-')}.json`; a.click()
          }} className="px-4 py-2 text-xs font-semibold border border-white/[0.1] rounded-lg text-white/50 hover:text-amber-300 hover:border-amber-500/30 transition">
            Export Project Data
          </button>
          <button onClick={() => {
            if (confirm('Reset all project data? This cannot be undone.')) {
              localStorage.removeItem('atlas-storage')
              window.location.reload()
            }
          }} className="px-4 py-2 text-xs font-semibold border border-rose-500/20 rounded-lg text-rose-400/50 hover:text-rose-400 hover:border-rose-500/40 transition">
            Reset Project
          </button>
        </div>
      </div>
    </div>
  )
}
