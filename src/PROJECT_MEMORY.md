# 🧠 Coralfil Project Memory

**Version**: 1.0 (Post-SEO & Research Overhaul)  
**Last Updated**: 2026-04-14

---

## 🎯 Strategic Identity
- **Primary Brand**: **Coralfil** (Note: One 'L' at the end).
- **Core Domain**: `https://coralfil.com`
- **Primary Market Focus**: **BC Shellfish Growers** and **Sessile Marine Species** resilience. (Regional specialization in British Columbia).

## 🛠️ Technological Stack & Architecture
- **Framework**: Next.js 15 (App Router).
- **UI Components**: 
  - `motion-client.tsx`: Shared framer-motion bridge for Client Components.
  - **Research Page (`/research`)**: Server Component (lean, fast).
  - **Download Gate**: `GuideDownloadForm.tsx` (Client Island).
- **Database**: 
  - **Supabase**: Primary data store.
  - table: `guide_downloads` (tracks name + email for guide access).

## ⚙️ Critical Infrastructure Fixes
- **SEO Optimization**:
  - `robots.txt` & `sitemap.xml`: Corrected to single-L domain.
  - **Canonical Tags**: Absolute URLs pointing to `coralfil.com`.
  - **Metadata**: Fixed "Double Brand" bug in Research page title.
- **Rendering Bugs**:
  - **Hero H1**: Added trailing spaces to `HERO_SLIDES` tiles to prevent word concatenation (e.g., "forInfinite").
  - **Client Directives**: Ensure `"use client"` exists on any page using `motion` or hooks (Fixed for `/vibrio-intervention`).

## 📋 Ongoing & Upcoming Tasks
- [x] Research Page overhaul.
- [x] SEO technical audit & critical fixes.
- [ ] Monitor Google Search Console for new indexation (after sitemap submission).
- [ ] Scale `CoralStick` formulation engine as per R&D roadmap.

---
*This file is intended to preserve project context during strategic session compacting.*
