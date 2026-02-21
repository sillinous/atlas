import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface FinancialSnapshot {
  cogsPerUnit: number
  monthlyRevenue: number
  monthlyCOGS: number
  monthlyOverhead: number
  monthlyLabor: number
  monthlyDepreciation: number
  monthlyNetIncome: number
  grossMargin: number
  netMargin: number
  equipmentTotal: number
  breakEvenMonths: number
  facilityMode: string
}

export interface ContextItem {
  id: string
  type: 'file' | 'paste' | 'note'
  name: string
  content: string
  category: string
  createdAt: string
}

interface Project {
  name: string
  industry: string
  description: string
  location: string
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  agent?: string
}

interface Store {
  project: Project
  messages: ChatMessage[]
  contextItems: ContextItem[]
  financialSnapshot: FinancialSnapshot | null
  setProject: (p: Partial<Project>) => void
  addMessage: (m: Omit<ChatMessage, 'id'>) => void
  clearMessages: () => void
  addContextItem: (item: ContextItem) => void
  removeContextItem: (id: string) => void
  setFinancialSnapshot: (s: FinancialSnapshot) => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      project: {
        name: 'The Cheesecake Atelier',
        industry: 'Bakery',
        description: 'Artisan cheesecake bakery specializing in premium handcrafted cheesecakes',
        location: 'Newton, IL',
      },
      messages: [],
      contextItems: [],
      financialSnapshot: null,
      setProject: (p) => set((s) => ({ project: { ...s.project, ...p } })),
      addMessage: (m) => set((s) => ({ messages: [...s.messages, { ...m, id: Date.now().toString() }] })),
      clearMessages: () => set({ messages: [] }),
      addContextItem: (item) => set((s) => ({ contextItems: [...s.contextItems, item] })),
      removeContextItem: (id) => set((s) => ({ contextItems: s.contextItems.filter(i => i.id !== id) })),
      setFinancialSnapshot: (fs) => set({ financialSnapshot: fs }),
    }),
    {
      name: 'atlas-storage',
      partialize: (state) => ({
        project: state.project,
        contextItems: state.contextItems,
        financialSnapshot: state.financialSnapshot,
      }),
    }
  )
)
