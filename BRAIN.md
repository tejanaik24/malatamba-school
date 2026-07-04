# BRAIN.md — Malatamba Vidyaniketan School Website

## 30-Second Brief

**Project:** Malatamba Vidyaniketan School — World-class website upgrade  
**Path:** `c:\claude code\malatamba-school`  
**GitHub:** `tejanaik24/malatamba-school`  
**Live URL:** Check Vercel for latest deployment  
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · GSAP + ScrollTrigger · Framer Motion  
**Vercel auto-deploy:** `git push origin main`

### The School
- LKG to Class 10 · PM Palem, Visakhapatnam
- Chairman: Mr. Suneel Mahanty (M.Sc., M.Phil., MBA FISM)
- 20+ years · 1000+ students · 50+ faculty · 4.9★ Google rating
- APSCERT affiliated · AP Government recognized

---

## Design System (DO NOT CHANGE)

```css
--primary: #762123    /* School maroon — navbar, headings, accents */
--dark:    #1a0a0a    /* Near-black for text + dark sections */
--light:   #f5f0f0    /* Warm cream — default page background */
--gold:    #c9a84c    /* Gold accent — CTAs, highlights */
Font:      Inter (all weights)
```

**Theme: LIGHT** — cream background `#f5f0f0`, dark text `#1a0a0a`  
**Navbar:** Maroon `#762123` background with white text + gold "Enquire Now" button  
**NEVER use a dark background for the overall page** — only StatsCounter and TrustBar are intentionally dark sections

---

## Current File Structure

```
src/
├── app/
│   ├── page.tsx          ← Homepage (imports all sections below)
│   ├── about/
│   ├── academics/
│   ├── admissions/
│   ├── contact/
│   ├── faculty/
│   ├── gallery/
│   ├── infrastructure/
│   └── rules/
├── sections/             ← Homepage sections
│   ├── WalkerScroll.tsx  ← 4-panel horizontal GSAP scroll (Hero+Values+Mission+Highlights)
│   ├── TrustBar.tsx      ← Dark marquee ticker
│   ├── LeadershipMessage.tsx ← Chairman photo + GSAP reveal
│   ├── StatsCounter.tsx  ← Dark section, count-up numbers
│   ├── FeaturesGrid.tsx  ← Bento grid of 6 features with real/AI images
│   ├── CampusMap.tsx     ← Hotspot SVG map of school campus
│   ├── VideoSection.tsx  ← Dark section with video thumbnail
│   ├── GoogleReviews.tsx ← 5-star parent reviews carousel
│   └── GalleryPreview.tsx ← Real student photos masonry grid
├── components/
│   ├── Navbar.tsx        ← Maroon nav, dropdown menus, mobile hamburger
│   ├── Footer.tsx
│   ├── MobileStickyBar.tsx
│   └── WhatsAppButton.tsx
└── app/globals.css       ← Design tokens (do not change colors)
```

**Public assets:**
- `/real-photos/` — actual school photos (logo, chairman, student gallery)
- `/ai-images/` — AI-generated placeholder images for hero/values/features

---

## What's Already Built (Session 1–5 complete)

| Section | Status | Notes |
|---|---|---|
| WalkerScroll | ✅ Done | 4 GSAP horizontal panels — Hero crossfade + Values + Mission + Highlights |
| TrustBar | ✅ Done | Marquee ticker, dark bg |
| LeadershipMessage | ✅ Done | Chairman photo, GSAP scroll reveal |
| StatsCounter | ✅ Done | Count-up, dark bg with gold glow |
| FeaturesGrid | ✅ Done | Bento grid, 6 features |
| CampusMap | ✅ Done | SVG hotspot campus map |
| VideoSection | ✅ Done | Dark section, video thumbnail |
| GoogleReviews | ✅ Done | Review cards |
| GalleryPreview | ✅ Done | Real photo masonry grid |
| Navbar | ✅ Done | Maroon, dropdowns, mobile |
| All inner pages | ✅ Done | /about /academics /admissions /contact /faculty /gallery /infrastructure /rules |

---

## NEXT SESSION START HERE — World-Class Upgrade

### User's Confirmed Vision
- **Feel:** Prestigious + Warm + Futuristic (all three simultaneously)
- **Hero 3D:** NO 3D — cinematic text animation only (GSAP word-by-word reveal)
- **Horizontal scroll:** YES — already done in WalkerScroll (keep and upgrade)
- **Theme:** LIGHT (cream + maroon + gold — as per school screenshot confirmed)
- **Reference schools:** Walker School, Dunham School, Worcester Academy (all light-bg, professional photography, restrained animations)

### Reference Site Insights (scraped 2026-07-02)
1. **One-word hero anchor** (Walker) — hero builds to ONE emotional word in giant caps
2. **Full-screen photography** is the emotion layer, not code effects
3. **Sans-serif with weight contrast** — mix regular + bold in same headline for drama
4. **Numbered values grid** (Walker) — already done in WalkerScroll Panel 2 ✅
5. **Boxed content + full-width image breaks** = scroll rhythm
6. **Funnel CTAs: Enquire → Visit → Apply** — 3 actions visible above fold

### Session 6 Plan — Hero Cinematic Upgrade (START HERE)

**File:** `src/sections/WalkerScroll.tsx` — Panel 1 (Hero section)

**Current hero:** Simple `gsap.fromTo(captionRef, {opacity:0,y:16}, ...)` on entire caption div

**Upgrade to:**
1. Word-by-word GSAP reveal on headline (each word: `y:40 → 0, opacity:0 → 1`, staggered 0.08s)
2. Subtitle: letter scramble or fade-in-up before headline
3. Bigger headline — `text-7xl lg:text-9xl` with tight tracking (`-0.03em`)
4. One emotional anchor word on last line in gold `#c9a84c`
5. Description: fade in 0.2s after headline settles
6. CTAs: slide up from bottom after description
7. Progress dots at bottom (01/04 → styled as dots, not just text)
8. Scroll arrow: smooth bounce animation

**After hero:** Upgrade each WalkerScroll panel (Session 7, 8, 9)

### Full Upgrade Session Plan

| Session | Target | Key Work |
|---|---|---|
| 6 | WalkerScroll Panel 1 — Hero | Cinematic word-by-word GSAP, bigger type, emotional copy |
| 7 | WalkerScroll Panel 2 — Values | Typography scale up, image hover 3D tilt (CSS), gold number animation |
| 8 | WalkerScroll Panel 3+4 — Mission + Highlights | Image clip-path upgrade, text reveal |
| 9 | LeadershipMessage | Parallax image, letter-reveal quote |
| 10 | StatsCounter | Animated gold accent lines, particle glow |
| 11 | FeaturesGrid + GalleryPreview | Hover reveal effects, stagger entrance |
| 12 | Global polish | Page transitions, scroll progress bar, floating WhatsApp CTA |

---

## Known Decisions (Decision Log)

| Date | Decision | Why |
|---|---|---|
| 2026-07-02 | Light theme (#f5f0f0 cream) — NOT dark | School brand is maroon+white, parent screenshot confirmed |
| 2026-07-02 | No 3D on hero — cinematic GSAP text only | Performance + no risk of glitches |
| 2026-07-02 | Keep GSAP horizontal scroll in WalkerScroll | User loves the effect, already built |
| 2026-07-02 | Do NOT edit `malatamba-institute-v2` folder | That is a different/old project — school is at `malatamba-school` |
| 2026-07-02 | Inter font (not Cormorant Garamond) | School website uses Inter, feels warm and readable for parents |

---

## KNOWN BLOCKERS

- None currently. Clean to start Session 6.

---

## Session History

### Session 5 (pre-upgrade sessions 1–5)
- Built complete homepage: WalkerScroll + all sections
- Built all 8 inner pages
- Major UI upgrade: TrustBar, StatsCounter, CampusMap hotspots, bento FeaturesGrid, 3-step admissions wizard, MobileStickyBar

### Session 6 (2026-07-02) — Hero Cinematic Upgrade ✅
- Upgraded `WalkerScroll.tsx` Panel 1 hero animation from single-div fade to **word-by-word GSAP reveal**
- Each word: `y:44→0, opacity:0→1`, stagger 0.07s, `power4.out` easing — cinematic curtain effect
- Sequence: eyebrow label → headline words → description → CTAs (all timed with GSAP timeline)
- Headline font size: `clamp(48px, 9vw, 118px)` with `-0.03em` tracking (was `text-4xl lg:text-8xl`)
- Last line of each caption stays gold (emotional anchor word — STARTS HERE / TOMORROW / CELEBRATING GROWTH)
- CTAs moved inside caption div — now animate in as part of the sequence
- Progress bar: replaced `01 / 04` text with styled pill dots (active = gold wide pill)
- Scroll hint: separated label + bouncing arrow, bottom-right corner
- Build: ✅ zero errors, 13 static pages
- Commit: `8dffa4f`

### Session 7 (2026-07-04) — Full Mobile Audit + Zero Overlap Fix ✅
- Complete mobile audit across all 33 TSX files — 5 issues found (2 critical, 2 major, 1 minor)
- **WalkerScroll Panel 2 (Values):** Fixed h-screen overflow — `aspect-[3/4]` → `h-[100px]` images, reduced padding/gaps/font sizes in 2×2 mobile grid
- **WalkerScroll Panel 3 (Mission):** Added `mp-text-layer` class + CSS `@media (max-width: 1023px)` — text fills top 50%, image fills bottom 55%, gradient fade at overlap, bleed text hidden on mobile
- **WalkerScroll Panel 4 (Highlights):** Added `hp-drift-area` class + CSS — drift columns hidden on mobile, text column expands to full width
- **LeadershipMessage:** Added `lm-quote`/`lm-stats` classes + mobile CSS — `columnCount:2` → 1 on mobile, stats gap tightened
- **GoogleReviews:** Carousel dots moved from `absolute -bottom-8` (outside container) to normal flow `mt-4` — no more overlap
- All 8 inner pages already mobile-ready (no changes needed)
- Build: ✅ zero errors, 13 static pages
