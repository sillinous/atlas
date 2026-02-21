import { useState, useRef } from 'react'
import { useStore, type ContextItem } from '../stores/useStore'
import { Upload, ClipboardPaste, Plus, X, FileText, Eye, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

const CATEGORIES = ['Business Plan', 'Financial Data', 'Market Research', 'Legal / Compliance', 'Marketing', 'Operations', 'Notes / Ideas', 'Other']

export default function Context() {
  const { contextItems, addContextItem, removeContextItem } = useStore()
  const [mode, setMode] = useState<'none' | 'paste' | 'note'>('none')
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Notes / Ideas')
  const [expanded, setExpanded] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleAdd = () => {
    if (!content.trim()) return
    addContextItem({
      id: Date.now().toString(),
      type: mode === 'paste' ? 'paste' : 'note',
      name: name || (mode === 'paste' ? 'Pasted Content' : 'Quick Note'),
      content: content.trim(),
      category,
      createdAt: new Date().toISOString(),
    })
    setName(''); setContent(''); setMode('none')
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    for (const file of Array.from(files)) {
      const text = await file.text()
      addContextItem({
        id: Date.now().toString() + Math.random(),
        type: 'file',
        name: file.name,
        content: text.slice(0, 50000),
        category: 'Other',
        createdAt: new Date().toISOString(),
      })
    }
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white/90 tracking-tight flex items-center gap-2">
          <span className="text-amber-400">📁</span> Business Context
        </h1>
        <p className="text-sm text-white/40 mt-1">Import existing documents, notes, and prior plans to inform your business model</p>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.05] border border-white/[0.1] rounded-xl text-sm text-white/60 hover:border-amber-500/30 hover:text-amber-300 transition">
          <Upload size={15} /> Upload File
        </button>
        <button onClick={() => setMode(mode === 'paste' ? 'none' : 'paste')}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm transition ${mode === 'paste' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-white/[0.05] border-white/[0.1] text-white/60 hover:border-amber-500/30 hover:text-amber-300'}`}>
          <ClipboardPaste size={15} /> Paste Content
        </button>
        <button onClick={() => setMode(mode === 'note' ? 'none' : 'note')}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm transition ${mode === 'note' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-white/[0.05] border-white/[0.1] text-white/60 hover:border-amber-500/30 hover:text-amber-300'}`}>
          <Plus size={15} /> Add Note
        </button>
        <input ref={fileRef} type="file" multiple accept=".txt,.md,.csv,.json,.html" className="hidden" onChange={handleFile} />
      </div>

      {mode !== 'none' && (
        <div className="mb-8 p-5 rounded-xl border border-amber-500/20 bg-amber-500/[0.04]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-amber-300">{mode === 'paste' ? 'Paste Content' : 'Add Note'}</h3>
            <button onClick={() => setMode('none')} className="text-white/30 hover:text-white/60"><X size={16} /></button>
          </div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Title (optional)"
            className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-amber-500/40 mb-3" />
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white/60 outline-none focus:border-amber-500/40 mb-3">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={8}
            placeholder={mode === 'paste' ? 'Paste your existing business content here...' : 'Type your notes, ideas, or observations...'}
            className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-amber-500/40 resize-y mb-3 font-mono" />
          <button onClick={handleAdd} disabled={!content.trim()}
            className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm rounded-lg hover:brightness-110 transition disabled:opacity-30">
            Add to Context
          </button>
        </div>
      )}

      {contextItems.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/[0.08] rounded-xl">
          <FileText size={32} className="mx-auto text-white/10 mb-3" />
          <p className="text-sm text-white/30 mb-1">No context materials yet</p>
          <p className="text-xs text-white/20">Upload files, paste content, or add notes to give ATLAS context about your business</p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">{contextItems.length} item{contextItems.length > 1 ? 's' : ''}</div>
          {contextItems.map(item => (
            <div key={item.id} className="border border-white/[0.06] rounded-xl bg-white/[0.02] overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition" onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
                <FileText size={15} className="text-amber-400/50 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white/70 truncate">{item.name}</div>
                  <div className="text-[10px] text-white/30">{item.category} · {item.type} · {new Date(item.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="text-[10px] text-white/20 font-mono">{(item.content.length / 1000).toFixed(1)}K chars</div>
                <button onClick={e => { e.stopPropagation(); removeContextItem(item.id) }} className="text-white/20 hover:text-rose-400 transition p-1"><Trash2 size={13} /></button>
                {expanded === item.id ? <ChevronUp size={14} className="text-white/20" /> : <ChevronDown size={14} className="text-white/20" />}
              </div>
              {expanded === item.id && (
                <div className="px-4 py-3 border-t border-white/[0.06] bg-white/[0.01]">
                  <pre className="text-xs text-white/50 font-mono whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed">{item.content}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
