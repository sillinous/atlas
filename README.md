# ATLAS 2.0 Platform — Next.js Package

> **Track ONE [T1]** — Marketing Site + Interactive Demo

## Quick Deploy to Hostinger

### Option 1: Direct Upload (Recommended)

1. **Extract** this package
2. **Install dependencies locally:**
   ```bash
   npm install
   ```
3. **Build the static export:**
   ```bash
   npm run build
   ```
4. **Upload the `out/` folder** contents to Hostinger

### Option 2: Git Deployment

1. Push to GitHub
2. Connect Hostinger to repo
3. Set build command: `npm run build`
4. Set output directory: `out`

---

## Project Structure

```
atlas-nextjs/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── pricing/
│       └── page.tsx       # Pricing page
│
├── components/             # React components
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Agents.tsx
│   ├── Comparison.tsx
│   ├── Innovation.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   └── DemoModal.tsx      # ⭐ Interactive demo
│
├── lib/
│   └── demo-scenarios.ts  # Demo data (3 scenarios)
│
├── styles/
│   └── globals.css        # Global styles
│
├── package.json
├── next.config.js
└── tsconfig.json
```

---

## Features

✅ **Marketing Pages**
- Homepage with full sections
- Pricing page with toggle
- Responsive design

✅ **Interactive Demo**
- 3 business scenarios (Bakery, Detailing, SaaS)
- Animated conversation flow
- Live agent progress indicators
- Research & financial results
- Document preview

---

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## Environment

No environment variables required for static deployment.

For future MVP integration, add:
```
DEMO_MODE=true
```

---

**Track:** ONE (Marketing)  
**Version:** 2.0.0  
**Status:** Production Ready
