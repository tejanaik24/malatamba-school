# Malatamba School — Claude Context

## What this project is
Marketing site for Malatamba School (Vidyaniketan School). **Dual-hosted**: Vercel + cPanel (production domain `malatamba.com`). The cPanel-only Next.js config is intentionally never committed to git — see the dual-hosting decision in memory (`Decisions/malatamba-dual-hosting-strategy.md`).

## Current stack
Next.js 14.2.35, React 18, GSAP, Framer Motion, Tailwind 3.4, TypeScript.

## Folder structure (top 2 levels)
```
malatamba-school/                <- outer container folder
└── malatamba-school/            <- actual project root (this file lives here)
    ├── src/
    ├── public/
    └── package.json
```

## Active tasks
None documented locally. Check cPanel deployment state separately — it's not tracked in this repo by design.

## Important files to know
- Vercel project: `malatamba-school` (prj_rT0BGcwZSiSB02Tr7oJm0rqXNQK1).
- Production domain: `malatamba.com` — confirm whether Vercel or cPanel is currently serving it before deploying changes.

## Do not touch
Do not commit any cPanel-specific Next.js config to git — this is an established decision, not an oversight.

## Last session notes
_Auto-updated by nightly-update.ps1 on 2026-07-09_

**Last 5 commits:**
```
a901ddc Make Vidyaniketan text bold/larger to match Malatamba emphasis in navbar
417ebcd Add admission enquiry popup, floating call button, and bigger navbar branding
e34ab95 Fix favicon showing default Next.js/Vercel icon instead of school logo
e6a0430 feat: SEO/AI/accessibility/security overhaul
74bb5d4 Fix Academics/Infrastructure navbar dropdown closing before click registers
```

**TODO/FIXME found:**
```
None found.
```

**Last modified file:** malatamba-school\CLAUDE.md (modified 2026-07-09 23:27)
