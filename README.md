# ATLAS 3.0 — Autonomous Business Intelligence Platform

**From Idea to Empire. Autonomously.**

ATLAS is a next-generation business planning platform that integrates AI-powered conversation, production-grade financial modeling, market research, strategic analysis, and document generation into a unified system. Built with React, TypeScript, and Tailwind CSS.

## Live Demo

[**→ Launch ATLAS**](https://unless-atlas-platform.netlify.app)

## Platform Modules

| Module | Description |
|--------|------------|
| **Dashboard** | Business health scoring, KPI overview, module navigation |
| **AI Chat** | Claude-powered business planning conversations with full project context |
| **Context** | Upload/paste existing business documents, notes, and prior plans |
| **Financials** | Full production cost modeling — recipe costing, facility comparison, revenue streams, P&L with 12-month projections |
| **Research** | AI-powered market analysis, competitor intel, and location research with live web data |
| **Strategy** | SWOT analysis and Business Model Canvas with AI generation |
| **Documents** | Generate investor-ready business plan sections informed by all platform data |
| **Settings** | Project configuration, data export, and reset |

## Architecture

- **Frontend**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS (dark theme, amber accents)
- **State**: Zustand with localStorage persistence
- **AI**: Claude API (Sonnet) with web search integration
- **Routing**: React Router v6 with SPA configuration
- **Deploy**: Netlify with automatic builds

### Key Design Pattern

The **FinancialSnapshot** interface serves as the integration backbone. Every change in the financial model emits a snapshot that flows to:
- Dashboard health scores and KPI cards
- Sidebar financial pulse widget
- AI Chat system prompt (financial context)
- Document generation (data-driven sections)
- Strategy analysis (AI-generated SWOT/BMC)

## Quick Start

```bash
npm install
npm run dev
```

## Deploy

### Netlify (recommended)
Connect this repo → Netlify auto-detects `netlify.toml`:
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- SPA redirects configured automatically

### Vercel
Connect this repo → `vercel.json` handles SPA routing.

### Manual
```bash
npm install
npm run build
# Serve dist/ with any static host
```

## Stack

```
src/
├── App.tsx                    # Route definitions
├── main.tsx                   # Entry point (BrowserRouter)
├── index.css                  # Tailwind + dark theme base
├── stores/
│   └── useStore.ts            # Zustand store (project, financials, context, chat)
├── components/
│   ├── Layout.tsx             # Sidebar navigation + financial pulse
│   └── ui/                    # shadcn/ui component library
└── pages/
    ├── Home.tsx               # Landing page
    ├── Dashboard.tsx          # Overview + health score
    ├── Chat.tsx               # AI conversation interface
    ├── Context.tsx            # Document upload/paste/notes
    ├── Financials.tsx         # Production financial model (integrated)
    ├── Research.tsx           # AI market research
    ├── Strategy.tsx           # SWOT + Business Model Canvas
    ├── Documents.tsx          # Business plan generator
    └── Settings.tsx           # Project configuration
```

---

Built by **UNLESS** · Autonomous Business Intelligence
