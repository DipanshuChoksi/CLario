# Implementation Plan: CLario

## Phase 1: Foundation
- [x] Initialize Next.js project with TypeScript and Tailwind CSS
- [ ] Set up Supabase project and database schema migrations
- [ ] Configure NextAuth.js with Google Provider (using centralized Clario GCP credentials)
- [ ] Set up basic UI shell and dashboard routing

## Phase 2: Core
- [ ] Implement API endpoint for user schedule config
- [ ] Create UI components for settings and digest history viewing
- [ ] Implement Gmail API fetch logic (read-only for "newsletters" label)
- [ ] Implement HTML cleaning utility to strip clutter and retain links/code

## Phase 3: Integration
- [ ] Integrate OpenAI SDK for structured JSON extraction (Core Thesis, Insights, Tools, Links)
- [ ] Set up local folder structure and implement file read/write utilities
- [ ] Implement Inngest background orchestration workflow (Fetch -> Clean -> Extract -> Save to local folder)
- [ ] Implement API endpoints for retrieving past digests

## Phase 4: Polish
- [ ] Implement PKM Export (Markdown copy-to-clipboard or download)
- [ ] Add error handling and loading states to UI
- [ ] Refine NextAuth error boundaries and token refresh logic
- [ ] Add basic email notification when digest is ready

## Phase 5: Launch
- [ ] Deploy Next.js app to Vercel
- [ ] Deploy Inngest functions and configure webhooks
- [ ] Conduct end-to-end testing of daily digest pipeline
- [ ] Finalize README and documentation
