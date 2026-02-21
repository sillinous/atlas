# ATLAS 3.0

## Adaptive Technology for Launch, Analysis & Strategy

A comprehensive AI-powered venture building platform for researching, planning, building, and launching new businesses. From idea to empire — autonomously.

**Live Demo:** [unless-atlas-platform.netlify.app](https://unless-atlas-platform.netlify.app)

---

## Platform Modules

| Module | Route | Description |
|--------|-------|-------------|
| **Dashboard** | `/app` | Business health scoring, KPI overview, module navigation |
| **AI Chat** | `/app/chat` | Claude-powered business planning with full project context |
| **Context** | `/app/context` | Upload existing docs, notes, and prior plans |
| **Financials** | `/app/financials` | Bakery-specific financial model — recipe costing, kitchen equipment, production labor, bakery revenue channels, and full P&L. Serves as both a usable tool for bakery startups and a working example of ATLAS financial modeling methodology |
| **Research** | `/app/research` | AI-powered market analysis, competitor intel, location research with live web data |
| **Strategy** | `/app/strategy` | SWOT analysis and Business Model Canvas with AI generation |
| **Documents** | `/app/documents` | Generate investor-ready business plan sections |
| **Settings** | `/app/settings` | Project configuration, data export, and reset |

## Financial Modeling Approach

The included financial model is **bakery-specific** — built around recipe costing, kitchen equipment depreciation, food production labor, and bakery revenue channels (wholesale, retail, farmers market, custom orders). If you're starting a bakery, it's ready to use as-is with real data.

It also demonstrates ATLAS's financial modeling methodology: **COGS breakdown → Facility analysis → Revenue modeling → P&L projection**. This same four-stage pattern applies to any production-based business. Future versions will include additional industry-specific templates.

## Architecture

### Integration Pattern

The **FinancialSnapshot** interface is the integration backbone. Every change in the financial model emits a snapshot that flows to:

- Dashboard health scores and KPI cards
- Sidebar financial pulse widget
- AI Chat system prompt (financial context for conversations)
- Document generation (data-driven business plan sections)
- Strategy analysis (AI-generated SWOT/BMC with financial data)

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand (localStorage persistence) |
| AI | Anthropic Claude API (Sonnet) |
| Routing | React Router v6 |
| Deploy | Netlify / Vercel / Docker |
| Database | PostgreSQL + Prisma (schema ready) |

### Project Structure

```
atlas/
├── src/
│   ├── App.tsx                    # Route definitions
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Tailwind + dark theme
│   ├── stores/useStore.ts         # Zustand store
│   ├── components/
│   │   ├── Layout.tsx             # Sidebar nav + financial pulse
│   │   └── ui/                    # shadcn/ui component library
│   └── pages/
│       ├── Home.tsx               # Landing page
│       ├── Dashboard.tsx          # Overview + health score
│       ├── Chat.tsx               # AI conversation
│       ├── Context.tsx            # Document upload/paste/notes
│       ├── Financials.tsx         # Bakery financial model (domain-specific example)
│       ├── Research.tsx           # AI market research
│       ├── Strategy.tsx           # SWOT + Business Model Canvas
│       ├── Documents.tsx          # Business plan generator
│       └── Settings.tsx           # Project configuration
├── docs/
│   ├── ATLAS_Platform_Specification.md
│   └── projects/cheesecake-atelier/
│       ├── Equipment_Space_Design_Specifications.md
│       ├── Marketing_Calendar_Launch_Strategy.md
│       ├── Operations_Manual_Recipe_Standards.md
│       └── Demand_Forecasting_System_Specification.md
├── prisma/schema.prisma           # Database schema (future backend)
├── Dockerfile                     # Container deployment
├── docker-compose.yml             # Full stack (app + postgres + redis)
├── netlify.toml                   # Netlify auto-config
└── vercel.json                    # Vercel SPA routing
```

## Quick Start

```bash
npm install
npm run dev
```

## Deploy

### Netlify (recommended)
Connect repo → `netlify.toml` auto-configures build + SPA redirects.

### Vercel
Connect repo → `vercel.json` handles routing.

### Docker
```bash
docker-compose up -d
# App at localhost:3000, Postgres at 5432, Redis at 6379
```

### Manual
```bash
npm install
npm run build
# Serve dist/ with any static host
```

---

**Built by UNLESS** · Autonomous Business Intelligence

*Initial project: The Cheesecake Atelier (Newton, IL)*
*Powered by Anthropic Claude AI*

MIT License
