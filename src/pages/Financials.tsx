import { useState, useMemo, useCallback, useEffect } from 'react'
import { useStore, type FinancialSnapshot } from '../stores/useStore'

// ── Types ────────────────────────────────────────────────────
interface Ingredient { id: string; name: string; qty: number; unit: string; costPer: number; category: string }
interface PkgItem { id: string; name: string; costPer: number; qty: number }
interface EquipItem { id: string; name: string; cost: number; life: number }
interface OhItem { id: string; label: string; monthly: number }
interface LaborItem { id: string; role: string; hoursPerWeek: number; hourlyRate: number; salary: boolean; annualSalary: number }
interface RevStream { id: string; name: string; icon: string; qtyLabel: string; qtyVal: number; priceLabel: string; priceVal: number; period: 'week'|'month'|'daily'; daysPerWeek?: number }

const mk = () => Math.random().toString(36).slice(2, 8)
const W = 4.33
const $ = (n: number, d = 2) => '$' + n.toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const $k = (n: number) => n >= 1000 ? '$' + (n / 1000).toFixed(1) + 'K' : $(n, 0)
const pf = (n: number) => (n * 100).toFixed(1) + '%'

function sM(s: RevStream) {
  if (s.period === 'week') return s.qtyVal * s.priceVal * W
  if (s.period === 'daily') return s.qtyVal * (s.daysPerWeek || 6) * W
  return s.qtyVal * s.priceVal
}

// ── Defaults ─────────────────────────────────────────────────
const INGS: Ingredient[] = [
  { id: mk(), name: 'Cream Cheese (8oz pkg)', qty: 2, unit: 'pkg', costPer: 3.29, category: 'dairy' },
  { id: mk(), name: 'Eggs (large)', qty: 6, unit: 'ea', costPer: 0.42, category: 'dairy' },
  { id: mk(), name: 'Granulated Sugar', qty: 0.75, unit: 'cup', costPer: 0.18, category: 'dry' },
  { id: mk(), name: 'Vanilla Extract', qty: 2, unit: 'tbsp', costPer: 1.15, category: 'flavoring' },
  { id: mk(), name: 'Sour Cream', qty: 1, unit: 'cup', costPer: 1.49, category: 'dairy' },
  { id: mk(), name: 'Heavy Cream', qty: 0.5, unit: 'cup', costPer: 1.25, category: 'dairy' },
  { id: mk(), name: 'All-Purpose Flour', qty: 3, unit: 'tbsp', costPer: 0.05, category: 'dry' },
  { id: mk(), name: 'Salt', qty: 0.25, unit: 'tsp', costPer: 0.01, category: 'dry' },
  { id: mk(), name: 'Graham Crackers (crust)', qty: 1.5, unit: 'cup', costPer: 0.89, category: 'crust' },
  { id: mk(), name: 'Butter (crust)', qty: 5, unit: 'tbsp', costPer: 0.22, category: 'crust' },
  { id: mk(), name: 'Sugar (crust)', qty: 0.25, unit: 'cup', costPer: 0.06, category: 'crust' },
  { id: mk(), name: 'Topping (avg fruit/sauce)', qty: 1, unit: 'portion', costPer: 2.50, category: 'topping' },
]
const PKGS: PkgItem[] = [
  { id: mk(), name: 'Cake Box (10 inch)', costPer: 1.85, qty: 1 },
  { id: mk(), name: 'Cake Board/Circle', costPer: 0.65, qty: 1 },
  { id: mk(), name: 'Branded Sticker/Label', costPer: 0.18, qty: 1 },
  { id: mk(), name: 'Tissue/Liner Paper', costPer: 0.12, qty: 1 },
  { id: mk(), name: 'Info Card', costPer: 0.08, qty: 1 },
  { id: mk(), name: 'Carry Bag (branded)', costPer: 0.45, qty: 1 },
  { id: mk(), name: 'Slice Container', costPer: 0.32, qty: 0 },
  { id: mk(), name: 'Fork/Napkin Pack', costPer: 0.10, qty: 0 },
]
const EQ_D: EquipItem[] = [
  { id: mk(), name: 'Commercial Convection Oven (double)', cost: 4500, life: 10 },
  { id: mk(), name: 'Commercial Refrigerator (2-door)', cost: 2800, life: 10 },
  { id: mk(), name: 'Walk-in Cooler (small)', cost: 5500, life: 15 },
  { id: mk(), name: 'Stand Mixer (commercial, 20qt)', cost: 1800, life: 8 },
  { id: mk(), name: 'Food Processor', cost: 450, life: 6 },
  { id: mk(), name: 'Prep Tables (stainless, x2)', cost: 1200, life: 12 },
  { id: mk(), name: 'Display Case (refrigerated)', cost: 3200, life: 10 },
  { id: mk(), name: 'Baking Pans & Springforms', cost: 600, life: 5 },
  { id: mk(), name: 'Smallwares & Utensils', cost: 800, life: 3 },
  { id: mk(), name: 'POS System & Tablet', cost: 650, life: 4 },
  { id: mk(), name: 'Shelving & Storage Racks', cost: 500, life: 10 },
  { id: mk(), name: 'Water Bath / Bain-Marie', cost: 350, life: 8 },
]
const EQ_S: EquipItem[] = [
  { id: mk(), name: 'Baking Pans & Springforms', cost: 600, life: 5 },
  { id: mk(), name: 'Smallwares & Utensils', cost: 800, life: 3 },
  { id: mk(), name: 'POS System & Tablet', cost: 650, life: 4 },
  { id: mk(), name: 'Water Bath / Bain-Marie', cost: 350, life: 8 },
  { id: mk(), name: 'Portable Storage Containers', cost: 280, life: 5 },
  { id: mk(), name: 'Transport Cooler / Insulated Bags', cost: 350, life: 4 },
]
const OH_D: OhItem[] = [
  { id: mk(), label: 'Lease / Rent', monthly: 1200 },
  { id: mk(), label: 'Utilities', monthly: 380 },
  { id: mk(), label: 'Business Insurance', monthly: 250 },
  { id: mk(), label: 'Permits & Licenses (amort.)', monthly: 42 },
  { id: mk(), label: 'Maintenance & Repairs', monthly: 150 },
  { id: mk(), label: 'Cleaning Supplies', monthly: 120 },
  { id: mk(), label: 'Internet / Phone / POS', monthly: 85 },
  { id: mk(), label: 'Software & Subs', monthly: 65 },
  { id: mk(), label: 'Marketing & Ads', monthly: 300 },
  { id: mk(), label: 'Misc / Contingency', monthly: 200 },
]
const OH_S: OhItem[] = [
  { id: mk(), label: 'Cold/Dry Storage Locker', monthly: 150 },
  { id: mk(), label: 'Membership / Base Access', monthly: 200 },
  { id: mk(), label: 'Liability Insurance', monthly: 180 },
  { id: mk(), label: 'Permits & Licenses (amort.)', monthly: 42 },
  { id: mk(), label: 'Shared Equipment Fee', monthly: 75 },
  { id: mk(), label: 'Software & Subs', monthly: 65 },
  { id: mk(), label: 'Marketing & Ads', monthly: 300 },
  { id: mk(), label: 'Transport & Mobile Storage', monthly: 120 },
  { id: mk(), label: 'Misc / Contingency', monthly: 100 },
]
const LABOR: LaborItem[] = [
  { id: mk(), role: 'Head Baker (you)', hoursPerWeek: 45, hourlyRate: 0, salary: true, annualSalary: 42000 },
  { id: mk(), role: 'Assistant Baker (PT)', hoursPerWeek: 25, hourlyRate: 14.50, salary: false, annualSalary: 0 },
  { id: mk(), role: 'Front-of-House (PT)', hoursPerWeek: 20, hourlyRate: 13.00, salary: false, annualSalary: 0 },
]
const REVS: RevStream[] = [
  { id: mk(), name: 'Whole Cakes', icon: '🎂', qtyLabel: 'Cakes / week', qtyVal: 25, priceLabel: 'Price each', priceVal: 48, period: 'week' },
  { id: mk(), name: 'By-the-Slice', icon: '🍰', qtyLabel: 'Slices / week', qtyVal: 80, priceLabel: 'Price each', priceVal: 6.50, period: 'week' },
  { id: mk(), name: 'Specialty / Custom', icon: '✨', qtyLabel: 'Orders / month', qtyVal: 8, priceLabel: 'Avg price', priceVal: 68, period: 'month' },
  { id: mk(), name: 'Classes / Events', icon: '🎓', qtyLabel: 'Classes / month', qtyVal: 2, priceLabel: 'Price x cap', priceVal: 520, period: 'month' },
  { id: mk(), name: 'Wholesale / B2B', icon: '🏪', qtyLabel: 'Orders / month', qtyVal: 4, priceLabel: 'Avg order', priceVal: 185, period: 'month' },
  { id: mk(), name: 'Beverages', icon: '☕', qtyLabel: 'Daily avg sales', qtyVal: 45, priceLabel: '', priceVal: 0, period: 'daily', daysPerWeek: 6 },
]

// ── Sub-components ───────────────────────────────────────────
const ic = 'bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-1.5 text-sm text-white/90 text-right outline-none focus:border-amber-500/50 font-mono w-20'
const tc = 'bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-1.5 text-sm text-white/80 outline-none focus:border-amber-500/50'

function NI({ value, onChange, prefix, suffix, step = 1 }: { value: number; onChange: (v: number) => void; prefix?: string; suffix?: string; step?: number }) {
  return <div className="flex items-center gap-1.5">
    {prefix && <span className="text-amber-400/80 text-xs font-semibold">{prefix}</span>}
    <input type="number" value={value} onChange={e => onChange(parseFloat(e.target.value) || 0)} step={step} className={ic} />
    {suffix && <span className="text-white/40 text-xs">{suffix}</span>}
  </div>
}
function TI({ value, onChange, w = 'w-44' }: { value: string; onChange: (v: string) => void; w?: string }) {
  return <input type="text" value={value} onChange={e => onChange(e.target.value)} className={`${tc} ${w}`} />
}
function M({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return <div className={`rounded-xl p-4 flex-1 min-w-[140px] ${accent ? 'bg-gradient-to-br from-amber-600/30 to-amber-800/20 border border-amber-500/30' : 'bg-white/[0.04] border border-white/[0.08]'}`}>
    <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-1.5">{label}</div>
    <div className={`text-xl font-extrabold font-mono ${accent ? 'text-amber-300' : 'text-white/90'}`}>{value}</div>
    {sub && <div className="text-[10px] text-white/30 mt-1">{sub}</div>}
  </div>
}
function AB({ label, onClick }: { label: string; onClick: () => void }) {
  return <button onClick={onClick} className="mt-2 w-full py-2 border border-dashed border-white/[0.15] rounded-lg text-white/40 text-xs font-medium hover:border-amber-500/40 hover:text-amber-400/60 transition flex items-center justify-center gap-2">
    <span className="text-base leading-none">+</span> {label}
  </button>
}
function DB({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick} className="text-red-400/40 hover:text-red-400 text-xs px-1 transition" title="Remove">✕</button>
}

const TABS = ['Recipe Costs', 'Facility', 'Revenue', 'P&L Summary']

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function Financials() {
  const { project, setFinancialSnapshot } = useStore()
  const [tab, setTab] = useState(0)
  const [ings, setIngs] = useState(INGS)
  const [pkgs, setPkgs] = useState(PKGS)
  const [fm, setFm] = useState<'dedicated'|'shared'>('dedicated')
  const [ohD, setOhD] = useState(OH_D)
  const [ohS, setOhS] = useState(OH_S)
  const [eqD, setEqD] = useState(EQ_D)
  const [eqS, setEqS] = useState(EQ_S)
  const [sk, setSk] = useState({ hourlyRate: 20, hoursPerWeek: 30 })
  const [labor, setLabor] = useState(LABOR)
  const [streams, setStreams] = useState(REVS)

  const cogs = ings.reduce((s, i) => s + i.qty * i.costPer, 0) * 1.05 + pkgs.reduce((s, p) => s + p.qty * p.costPer, 0)
  const eq = fm === 'dedicated' ? eqD : eqS
  const oh = fm === 'dedicated' ? ohD : ohS
  const setEq = fm === 'dedicated' ? setEqD : setEqS
  const setOh = fm === 'dedicated' ? setOhD : setOhS
  const eqTot = eq.reduce((s, e) => s + e.cost, 0)
  const eqDep = eq.reduce((s, e) => s + (e.life > 0 ? e.cost / (e.life * 12) : 0), 0)
  const kitRent = fm === 'shared' ? sk.hourlyRate * sk.hoursPerWeek * W : 0
  const ohTot = oh.reduce((s, o) => s + o.monthly, 0) + kitRent
  const mLab = labor.reduce((s, l) => l.salary ? s + l.annualSalary / 12 : s + l.hoursPerWeek * l.hourlyRate * W, 0)
  const lBurd = mLab * 0.12
  const tRev = streams.reduce((s, st) => s + sM(st), 0)
  const tCOGS = cogs * (tRev > 0 ? tRev * 0.7 / 48 : 0)
  const gross = tRev - tCOGS
  const tOpEx = ohTot + mLab + lBurd + eqDep
  const net = gross - tOpEx

  const upd = <T,>(arr: T[], set: (a: T[]) => void, i: number, p: Partial<T>) => { const n = [...arr]; n[i] = { ...n[i], ...p }; set(n) }

  // Push snapshot to ATLAS store
  const snap = useMemo<FinancialSnapshot>(() => ({
    cogsPerUnit: cogs, monthlyRevenue: tRev, monthlyCOGS: tCOGS, monthlyOverhead: ohTot,
    monthlyLabor: mLab + lBurd, monthlyDepreciation: eqDep, monthlyNetIncome: net,
    grossMargin: tRev > 0 ? gross / tRev : 0, netMargin: tRev > 0 ? net / tRev : 0,
    equipmentTotal: eqTot, breakEvenMonths: net > 0 ? Math.ceil(eqTot / net) : Infinity, facilityMode: fm,
  }), [cogs, tRev, tCOGS, ohTot, mLab, lBurd, eqDep, net, gross, eqTot, fm])

  useEffect(() => { setFinancialSnapshot(snap) }, [snap, setFinancialSnapshot])

  // Alternate mode comparison
  const altEq = fm === 'dedicated' ? eqS : eqD
  const altOh = fm === 'dedicated' ? ohS : ohD
  const altKR = fm === 'dedicated' ? sk.hourlyRate * sk.hoursPerWeek * W : 0
  const altOhTot = altOh.reduce((s, o) => s + o.monthly, 0) + altKR
  const altEqDep = altEq.reduce((s, e) => s + (e.life > 0 ? e.cost / (e.life * 12) : 0), 0)
  const altOpEx = altOhTot + mLab + lBurd + altEqDep
  const altNet = gross - altOpEx

  return (
    <div className="p-6 max-w-[1100px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white/90 tracking-tight">{project.name}</h1>
          <p className="text-xs text-white/40 mt-0.5">Production Financial Model — {project.location}</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-white/30 uppercase tracking-wider">COGS / Unit</div>
          <div className="text-2xl font-extrabold font-mono text-amber-400">{$(cogs)}</div>
          <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${fm === 'dedicated' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
            {fm === 'dedicated' ? '🏭 Dedicated' : '🤝 Shared'}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white/[0.03] rounded-xl p-1 border border-white/[0.06]">
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold transition ${tab === i ? 'bg-white/[0.1] text-amber-300 shadow-sm' : 'text-white/40 hover:text-white/60'}`}>
            {['🧀','🏭','💰','📊'][i]} {t}
          </button>
        ))}
      </div>

      {/* ══ TAB 0: Recipe ══ */}
      {tab === 0 && <div className="space-y-6">
        <div className="flex gap-3 flex-wrap">
          <M label="Ingredients" value={$(ings.reduce((s,i)=>s+i.qty*i.costPer,0))} sub="raw materials" />
          <M label="+ 5% Waste" value={$(ings.reduce((s,i)=>s+i.qty*i.costPer,0)*0.05)} />
          <M label="Packaging" value={$(pkgs.reduce((s,p)=>s+p.qty*p.costPer,0))} />
          <M label="Total COGS" value={$(cogs)} accent sub={`${$(cogs/12)} per slice`} />
        </div>
        <div className="text-sm font-bold text-white/70 flex items-center gap-2"><span>🧀</span> Ingredients</div>
        <div className="rounded-xl border border-white/[0.08] overflow-x-auto">
          <table className="w-full text-sm"><thead><tr className="border-b border-white/[0.1] text-white/50 text-[10px] uppercase tracking-wider">
            <th className="w-7 p-2"></th><th className="text-left p-2">Ingredient</th><th className="text-right p-2">Qty</th><th className="p-2">Unit</th><th className="text-right p-2">$/Unit</th><th className="text-right p-2">Total</th>
          </tr></thead><tbody>
            {ings.map((ing, i) => <tr key={ing.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
              <td className="p-1 text-center"><DB onClick={()=>setIngs(ings.filter((_,j)=>j!==i))} /></td>
              <td className="p-2"><TI value={ing.name} w="w-48" onChange={v=>upd(ings,setIngs,i,{name:v})} /></td>
              <td className="p-1 text-right"><NI value={ing.qty} step={0.25} onChange={v=>upd(ings,setIngs,i,{qty:v})} /></td>
              <td className="p-1"><TI value={ing.unit} w="w-14" onChange={v=>upd(ings,setIngs,i,{unit:v})} /></td>
              <td className="p-1 text-right"><NI value={ing.costPer} prefix="$" step={0.01} onChange={v=>upd(ings,setIngs,i,{costPer:v})} /></td>
              <td className="p-2 text-right font-mono font-semibold text-white/80">{$(ing.qty*ing.costPer)}</td>
            </tr>)}
          </tbody></table>
        </div>
        <AB label="Add Ingredient" onClick={()=>setIngs([...ings,{id:mk(),name:'New Ingredient',qty:1,unit:'ea',costPer:0,category:'other'}])} />

        <div className="text-sm font-bold text-white/70 flex items-center gap-2 mt-6"><span>📦</span> Packaging</div>
        <div className="rounded-xl border border-white/[0.08] overflow-x-auto">
          <table className="w-full text-sm"><thead><tr className="border-b border-white/[0.1] text-white/50 text-[10px] uppercase tracking-wider">
            <th className="w-7 p-2"></th><th className="text-left p-2">Item</th><th className="text-right p-2">Qty</th><th className="text-right p-2">$/Unit</th><th className="text-right p-2">Total</th>
          </tr></thead><tbody>
            {pkgs.map((p, i) => <tr key={p.id} className={`border-b border-white/[0.04] ${p.qty===0?'opacity-30':''}`}>
              <td className="p-1 text-center"><DB onClick={()=>setPkgs(pkgs.filter((_,j)=>j!==i))} /></td>
              <td className="p-2"><TI value={p.name} w="w-48" onChange={v=>upd(pkgs,setPkgs,i,{name:v})} /></td>
              <td className="p-1 text-right"><NI value={p.qty} step={1} onChange={v=>upd(pkgs,setPkgs,i,{qty:v})} /></td>
              <td className="p-1 text-right"><NI value={p.costPer} prefix="$" step={0.01} onChange={v=>upd(pkgs,setPkgs,i,{costPer:v})} /></td>
              <td className="p-2 text-right font-mono font-semibold text-white/80">{$(p.qty*p.costPer)}</td>
            </tr>)}
          </tbody></table>
        </div>
        <AB label="Add Packaging" onClick={()=>setPkgs([...pkgs,{id:mk(),name:'New Item',costPer:0,qty:1}])} />
      </div>}

      {/* ══ TAB 1: Facility ══ */}
      {tab === 1 && <div className="space-y-6">
        <div className="flex gap-3">
          {([['dedicated','🏭','Dedicated Facility','Your own leased space'],['shared','🤝','Shared / Commissary','Rent time in a licensed kitchen']] as const).map(([k,icon,l,d]) => (
            <button key={k} onClick={()=>setFm(k)} className={`flex-1 p-4 rounded-xl text-left transition border ${fm===k?'border-amber-500/40 bg-amber-500/[0.08]':'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]'}`}>
              <span className="text-lg">{icon}</span>
              <div className="font-bold text-sm text-white/90 mt-1">{l}</div>
              <div className="text-[10px] text-white/40 mt-0.5">{d}</div>
            </button>
          ))}
        </div>
        <div className="flex gap-3 flex-wrap">
          <M label="Monthly Overhead" value={$(ohTot,0)} />
          <M label="Monthly Labor" value={$(mLab+lBurd,0)} sub={`incl. ${$(lBurd,0)} burden`} />
          <M label="Equipment" value={$(eqTot,0)} sub={`${$(eqDep,0)}/mo depr.`} />
          <M label="Total Fixed/Mo" value={$(ohTot+eqDep+mLab+lBurd,0)} accent />
        </div>
        {fm === 'shared' && <div className="p-4 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-xl">
          <div className="text-xs font-bold text-emerald-300 mb-2">Kitchen Rental</div>
          <div className="flex items-center gap-3 flex-wrap">
            <NI value={sk.hourlyRate} prefix="$" suffix="/hr" onChange={v=>setSk({...sk,hourlyRate:v})} />
            <span className="text-white/30">×</span>
            <NI value={sk.hoursPerWeek} suffix="/wk" onChange={v=>setSk({...sk,hoursPerWeek:v})} />
            <span className="text-white/30">× 4.33 =</span>
            <span className="text-lg font-extrabold font-mono text-emerald-300">{$(sk.hourlyRate*sk.hoursPerWeek*W,0)}/mo</span>
          </div>
        </div>}

        <div className="text-sm font-bold text-white/70">Monthly Costs</div>
        <div className="grid grid-cols-2 gap-2">
          {oh.map((item,i)=><div key={item.id} className="flex items-center justify-between p-2.5 bg-white/[0.03] rounded-lg border border-white/[0.06]">
            <div className="flex items-center gap-1"><DB onClick={()=>setOh(oh.filter((_,j)=>j!==i))} /><TI value={item.label} w="w-40" onChange={v=>upd(oh,setOh,i,{label:v})} /></div>
            <NI value={item.monthly} prefix="$" suffix="/mo" onChange={v=>upd(oh,setOh,i,{monthly:v})} />
          </div>)}
        </div>
        <AB label="Add Cost" onClick={()=>setOh([...oh,{id:mk(),label:'New Cost',monthly:0}])} />

        <div className="text-sm font-bold text-white/70 mt-4">Equipment</div>
        <div className="rounded-xl border border-white/[0.08] overflow-x-auto">
          <table className="w-full text-sm"><thead><tr className="border-b border-white/[0.1] text-white/50 text-[10px] uppercase">
            <th className="w-7 p-2"></th><th className="text-left p-2">Equipment</th><th className="text-right p-2">Cost</th><th className="text-right p-2">Life</th><th className="text-right p-2">Mo. Depr.</th>
          </tr></thead><tbody>
            {eq.map((e,i)=><tr key={e.id} className="border-b border-white/[0.04]">
              <td className="p-1 text-center"><DB onClick={()=>setEq(eq.filter((_,j)=>j!==i))} /></td>
              <td className="p-2"><TI value={e.name} w="w-56" onChange={v=>upd(eq,setEq,i,{name:v})} /></td>
              <td className="p-1 text-right"><NI value={e.cost} prefix="$" step={50} onChange={v=>upd(eq,setEq,i,{cost:v})} /></td>
              <td className="p-1 text-right"><NI value={e.life} suffix="yr" onChange={v=>upd(eq,setEq,i,{life:v})} /></td>
              <td className="p-2 text-right font-mono text-white/60">{$(e.life>0?e.cost/(e.life*12):0)}</td>
            </tr>)}
          </tbody></table>
        </div>
        <AB label="Add Equipment" onClick={()=>setEq([...eq,{id:mk(),name:'New Equipment',cost:0,life:5}])} />

        <div className="text-sm font-bold text-white/70 mt-4">Labor <span className="text-white/30 font-normal text-xs">(12% burden)</span></div>
        <div className="rounded-xl border border-white/[0.08] overflow-x-auto">
          <table className="w-full text-sm"><thead><tr className="border-b border-white/[0.1] text-white/50 text-[10px] uppercase">
            <th className="w-7 p-2"></th><th className="text-left p-2">Role</th><th className="text-right p-2">Hrs/Wk</th><th className="text-right p-2">Rate</th><th className="text-right p-2">Monthly</th>
          </tr></thead><tbody>
            {labor.map((l,i)=><tr key={l.id} className="border-b border-white/[0.04]">
              <td className="p-1 text-center"><DB onClick={()=>setLabor(labor.filter((_,j)=>j!==i))} /></td>
              <td className="p-2"><TI value={l.role} w="w-44" onChange={v=>upd(labor,setLabor,i,{role:v})} /></td>
              <td className="p-1 text-right"><NI value={l.hoursPerWeek} onChange={v=>upd(labor,setLabor,i,{hoursPerWeek:v})} /></td>
              <td className="p-1 text-right">{l.salary?<NI value={l.annualSalary} prefix="$" suffix="/yr" step={1000} onChange={v=>upd(labor,setLabor,i,{annualSalary:v})} />:<NI value={l.hourlyRate} prefix="$" suffix="/hr" step={0.5} onChange={v=>upd(labor,setLabor,i,{hourlyRate:v})} />}</td>
              <td className="p-2 text-right font-mono font-semibold text-white/80">{$(l.salary?l.annualSalary/12:l.hoursPerWeek*l.hourlyRate*W,0)}</td>
            </tr>)}
          </tbody></table>
        </div>
        <div className="flex gap-2">
          <AB label="Add Salaried" onClick={()=>setLabor([...labor,{id:mk(),role:'New Role',hoursPerWeek:40,hourlyRate:0,salary:true,annualSalary:35000}])} />
          <AB label="Add Hourly" onClick={()=>setLabor([...labor,{id:mk(),role:'New Role',hoursPerWeek:20,hourlyRate:13,salary:false,annualSalary:0}])} />
        </div>
      </div>}

      {/* ══ TAB 2: Revenue ══ */}
      {tab === 2 && <div className="space-y-6">
        <div className="flex gap-3 flex-wrap">
          <M label="Monthly Revenue" value={$(tRev,0)} accent sub={`${$(tRev*12,0)} annual`} />
          <M label="Streams" value={String(streams.length)} />
          <M label="Daily Avg" value={$(tRev/(6*W),0)} sub="6 days/wk" />
        </div>
        {tRev > 0 && <div className="flex rounded-lg overflow-hidden h-7">
          {streams.filter(s=>sM(s)>0).map((s,i)=>{
            const c=['bg-amber-500','bg-rose-500','bg-orange-700','bg-yellow-600','bg-stone-500','bg-emerald-600','bg-violet-500']
            return <div key={s.id} className={`${c[i%c.length]} flex items-center justify-center text-[9px] font-bold text-white`} style={{width:`${sM(s)/tRev*100}%`,minWidth:28}}>
              {((sM(s)/tRev)*100).toFixed(0)}%
            </div>
          })}
        </div>}
        <div className="grid grid-cols-2 gap-4">
          {streams.map((s,i)=><div key={s.id} className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl relative">
            <div className="absolute top-2 right-2"><DB onClick={()=>setStreams(streams.filter((_,j)=>j!==i))} /></div>
            <div className="flex items-center gap-2 mb-3">
              <TI value={s.icon} w="w-10" onChange={v=>upd(streams,setStreams,i,{icon:v})} />
              <TI value={s.name} w="w-36" onChange={v=>upd(streams,setStreams,i,{name:v})} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center"><TI value={s.qtyLabel} w="w-28" onChange={v=>upd(streams,setStreams,i,{qtyLabel:v})} /><NI value={s.qtyVal} onChange={v=>upd(streams,setStreams,i,{qtyVal:v})} /></div>
              {s.priceLabel!==''&&<div className="flex justify-between items-center"><TI value={s.priceLabel} w="w-28" onChange={v=>upd(streams,setStreams,i,{priceLabel:v})} /><NI value={s.priceVal} prefix="$" step={0.5} onChange={v=>upd(streams,setStreams,i,{priceVal:v})} /></div>}
              {s.period==='daily'&&<div className="flex justify-between items-center"><span className="text-xs text-white/40">Days/wk</span><NI value={s.daysPerWeek||6} onChange={v=>upd(streams,setStreams,i,{daysPerWeek:v})} /></div>}
              <div className="flex justify-between items-center">
                <select value={s.period} onChange={e=>upd(streams,setStreams,i,{period:e.target.value as any,daysPerWeek:e.target.value==='daily'?6:undefined})} className="bg-white/[0.06] border border-white/[0.1] rounded-lg px-2 py-1 text-xs text-white/60">
                  <option value="week">Per Week</option><option value="month">Per Month</option><option value="daily">Per Day</option>
                </select>
                <span className="font-mono font-bold text-amber-300 text-sm">{$(sM(s),0)}/mo</span>
              </div>
            </div>
          </div>)}
        </div>
        <AB label="Add Revenue Stream" onClick={()=>setStreams([...streams,{id:mk(),name:'New Stream',icon:'💵',qtyLabel:'Units / month',qtyVal:0,priceLabel:'Price',priceVal:0,period:'month'}])} />
      </div>}

      {/* ══ TAB 3: P&L ══ */}
      {tab === 3 && <div className="space-y-6">
        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${fm==='dedicated'?'bg-amber-500/20 text-amber-300':'bg-emerald-500/20 text-emerald-300'}`}>
          {fm==='dedicated'?'🏭 Dedicated':'🤝 Shared Kitchen'} Model
        </span>
        <div className="flex gap-3 flex-wrap">
          <M label="Revenue" value={$(tRev,0)} sub={`${$(tRev*12,0)} annual`} />
          <M label="Gross Margin" value={pf(tRev>0?gross/tRev:0)} sub={`${$(gross,0)} gross`} />
          <M label="Net Income" value={$(net,0)} accent sub={`${pf(tRev>0?net/tRev:0)} net`} />
          <M label="Equip Payback" value={net>0?`${Math.ceil(eqTot/net)} mo`:'N/A'} sub={`on ${$(eqTot,0)}`} />
        </div>

        {/* Alternate model comparison */}
        <div className="p-4 rounded-xl border border-dashed border-white/[0.12] bg-white/[0.02]">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">
            If using {fm==='dedicated'?'Shared Kitchen':'Dedicated Facility'} instead
          </div>
          <div className="flex gap-6 flex-wrap">
            {[['Alt Net/Mo',$(altNet,0),altNet>=0?'text-white/70':'text-rose-400'],
              ['Difference',(net>altNet?'+':'')+$(net-altNet,0),net>altNet?'text-emerald-400':'text-rose-400'],
              ['Annual Impact',(net>altNet?'+':'')+$((net-altNet)*12,0),net>altNet?'text-emerald-400':'text-rose-400'],
            ].map(([l,v,c])=><div key={l}><div className="text-[9px] text-white/30">{l}</div><div className={`text-base font-extrabold font-mono ${c}`}>{v}</div></div>)}
          </div>
        </div>

        {/* Waterfall */}
        <div className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.06]">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-3">Monthly Waterfall</div>
          <div className="flex items-end gap-1 h-28">
            {[{l:'Revenue',v:tRev,c:'bg-emerald-500'},{l:'COGS',v:-tCOGS,c:'bg-rose-500'},{l:'Gross',v:gross,c:'bg-amber-500'},{l:'OpEx',v:-tOpEx,c:'bg-rose-500'},{l:'Net',v:net,c:net>=0?'bg-emerald-500':'bg-rose-600'}]
              .map(b=><div key={b.l} className="flex-1 flex flex-col items-center justify-end">
                <div className="text-[9px] font-bold font-mono text-white/60 mb-1">{$k(Math.abs(b.v))}</div>
                <div className={`w-full rounded-t-md ${b.c} opacity-80`} style={{height:`${Math.max(tRev>0?Math.abs(b.v)/tRev*100:4,4)}%`}} />
                <div className="text-[9px] text-white/40 mt-1 font-semibold">{b.l}</div>
              </div>)}
          </div>
        </div>

        {/* P&L table */}
        <div className="rounded-xl border border-white/[0.08] overflow-hidden">
          {[
            {label:'REVENUE',items:streams.map(s=>[s.name,sM(s)] as [string,number]),sub:['Total Revenue',tRev] as [string,number]},
            {label:'COGS',items:[['Product COGS',-tCOGS]] as [string,number][],sub:['Gross Profit',gross] as [string,number]},
            {label:`OPEX (${fm==='dedicated'?'Dedicated':'Shared'})`,
              items:[
                ...(fm==='shared'?[['Kitchen Rental',-kitRent] as [string,number]]:[]),
                ...oh.map(o=>[o.label,-o.monthly] as [string,number]),
                ['Labor + 12% burden',-(mLab+lBurd)],
                ['Equipment Depreciation',-eqDep],
              ] as [string,number][],
              sub:['Total OpEx',tOpEx] as [string,number]},
          ].map((sec,si)=><div key={sec.label}>
            <div className="bg-white/[0.06] px-4 py-2.5 text-[10px] font-extrabold text-white/50 uppercase tracking-widest border-b border-white/[0.06]">{sec.label}</div>
            {sec.items.map(([name,val],idx)=><div key={idx} className={`flex justify-between px-4 pl-7 py-2 text-sm border-b border-white/[0.03] ${idx%2===0?'':'bg-white/[0.01]'}`}>
              <span className="text-white/70">{name}</span>
              <span className={`font-mono font-semibold ${val>=0?'text-white/80':'text-rose-400/80'}`}>{val<0?`(${$(Math.abs(val),0)})`:$(val,0)}</span>
            </div>)}
            <div className="flex justify-between px-4 py-2.5 bg-white/[0.05] font-bold text-sm border-b border-white/[0.08]">
              <span className="text-white/80">{sec.sub[0]}</span>
              <span className="font-mono text-amber-300">{si===2?`(${$(sec.sub[1],0)})`:$(sec.sub[1],0)}</span>
            </div>
          </div>)}
          <div className={`flex justify-between px-4 py-3 font-extrabold ${net>=0?'bg-emerald-600/30':'bg-rose-600/30'}`}>
            <span className="text-white text-base">NET INCOME</span>
            <span className="font-mono text-lg text-white">{net>=0?$(net,0):`(${$(Math.abs(net),0)})`}</span>
          </div>
        </div>

        {/* 12mo */}
        <div className="p-5 bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-xl border border-white/[0.08]">
          <div className="text-xs font-bold text-white/50 mb-3 uppercase tracking-wider">12-Month Projection</div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[['Revenue',$(tRev*12,0)],['COGS',$(tCOGS*12,0)],['OpEx',$(tOpEx*12,0)],['Net Income',$(net*12,0)],['Net Margin',pf(tRev>0?net/tRev:0)],['Owner Draw',net>0?$(Math.max(0,net*12-5000),0):'$0']]
              .map(([l,v])=><div key={l}><div className="text-[9px] text-white/30 uppercase">{l}</div><div className="text-sm font-extrabold font-mono text-white/80 mt-0.5">{v}</div></div>)}
          </div>
        </div>
      </div>}
    </div>
  )
}
