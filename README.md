## 1. Product Overview

### Product Name : CLario

### Product Vision

Transform newsletter overload into a clean, actionable intelligence feed for developers, founders, and technical learners.

### Core Philosophy

This is **NOT**:

- an email client
- a note-taking app
- a chatbot

This is:

> An AI-powered information triage and knowledge extraction system.

The product’s primary job is:

- reduce newsletter friction
- extract high-signal information
- help users quickly decide what deserves attention

---

# 2. Problem Statement

Modern newsletters suffer from:

- excessive storytelling
- promotional fluff
- bloated HTML
- fragmented information

Users subscribe intentionally but fail to consume consistently because:

- inboxes become overwhelming
- extracting value takes too much effort
- skimming multiple newsletters is cognitively expensive

This creates:

> “Newsletter Debt”

---

# 3. Target Users

## Primary Users

### Developers

- AI engineers
- backend engineers
- system designers
- OSS contributors

### Startup Founders

- tech/startup newsletters
- market trend newsletters
- VC/operator newsletters

### Technical Learners

- engineering students
- self-learners
- intermediate developers

---

# 4. Product Goals

## Primary Goal

Reduce newsletter consumption time by **80%** while preserving actionable value.

## Secondary Goals

- Create a low-friction daily information workflow
- Improve information density
- Enable quick knowledge capture
- Preserve trust in extracted content

---

# 5. Non-Goals

The system will NOT initially:

- replace Gmail
- become a PKM platform
- become a chatbot
- build a vector database
- generate AI “further reading”
- support multi-user collaboration
- build complex semantic search
- auto-train ML classifiers

---

# 6. Core Product Principles

## 1. Low Friction

If using the product feels harder than checking Gmail, the product fails.

## 2. Trust > Intelligence

Incorrect extraction destroys trust faster than mediocre summaries.

Always preserve:

- original links
- original email access
- diagram references

## 3. Signal Density

Every screen/output should maximize:

> actionable information per second

## 4. Simplicity First

The product must remain operational on:

- free-tier infrastructure
- lightweight architecture
- minimal maintenance

---

# 7. User Workflow

## Setup

1. User creates dedicated Gmail account
2. User subscribes newsletters there
3. User labels newsletters under:
   - `newsletters`
   - optional sublabels

## Daily Workflow

1. System fetches new emails
2. HTML is cleaned
3. LLM extracts structured insights
4. Daily digest is generated
5. Digest is:
   - emailed back to user
   - stored for user to view later in dashboard

---

# 8. MVP Scope (STRICT)

## Included Features

### Email Fetching

- Gmail API integration
- Fetch unread emails from newsletter label

### HTML Cleaning

Remove:

- ads
- footers
- unsubscribe blocks
- navigation clutter
- tracking garbage

Preserve:

- code snippets
- links
- important formatting
- images/diagram references

### Structured Extraction

Output format:

```text
Newsletter Name
Subject
Core Thesis
- ...

Key Insights
- ...
- ...

Tools/Products Mentioned
- ...

Important Links
- ...

Actionable Takeaways
- ...

Visual Content Warning
⚠️ Contains diagrams/charts → View Original
```

### Daily Digest

Single digest containing:

- summaries
- insights
- extracted links

Delivered through:

- email
- Dashboard

### Save to PKM

Simple:

- “Save to Obsidian”
- “Save to Notion”

Export as:

- Markdown

---

# 9. Explicitly Excluded Features (V1)

## No AI-generated resources

Reason:

- hallucination risk
- low trust

## No vector databases

Reason:

- unnecessary complexity
- weak ROI early

## No advanced ML categorization

Reason:

- Gmail labels are enough initially

## No multi-user architecture

Reason:

- optimize for usability first

## No complex dashboard

Reason:

- avoid “second inbox” problem

---

# 10. Functional Requirements

## Gmail Integration

### Requirements

- OAuth authentication
- Read-only permissions
- Fetch latest unread emails
- Label filtering support

## Email Processing

### Requirements

- HTML → clean text conversion
- preserve meaningful formatting
- remove low-signal content

## LLM Pipeline

### Requirements

Generate:

- concise summaries
- structured insights
- extracted tools
- actionable items
- important links

## Digest Generation

### Requirements

- markdown formatting
- scannable layout
- low visual clutter

---

# 11. System Architecture (High Level)

```text

Gmail API
↓
Email Fetcher
↓
HTML Cleaner
↓
LLM Extraction Pipeline
↓
Structured JSON Output
↓
Digest Generator
↓
Email / Minimal UI / Markdown Export

```

---

# 12. Suggested Tech Stack

## Frontend

- Next.js
- TailwindCSS

## Backend

- Node.js

## Database

- PostgreSQL

## Queue / Scheduling

- Cron jobs
- BullMQ

## LLM

Priority order:

1. GPT-4o-mini
2. Claude Haiku
3. Local models (experimental)

---

# 13. Engineering Challenges

## High-Risk Areas

### HTML Parsing

Newsletters vary wildly.
Potential issues:

- malformed HTML
- images-only layouts
- embedded tables
- tracking wrappers

### Diagram Preservation

Some newsletters rely heavily on visuals.
Solution:

- preserve image references
- add “view original” shortcut

### Trust & Hallucination

If summaries distort meaning:

- users stop trusting output
- retention collapses

---

# 14. Success Metrics

## Product Metrics

- Daily digest open rate
- Emails processed/day
- Time spent consuming digest
- Click-through rate to originals

---

## Personal Utility Metrics

- Reduction in unread newsletters
- Reduction in “save for later” tabs
- Daily usage consistency

---

# 15. Failure Conditions

The product fails if:

- digest feels slower than Gmail
- summaries are unreliable
- UI creates another inbox
- maintenance burden becomes annoying
- extraction quality is mediocre

---

# 16. Future Roadmap (Post-MVP)

## Phase 2

- lightweight tagging
- weekly intelligence report
- trend detection
- better extraction formatting

## Phase 3

- searchable archive
- topic clustering
- cross-newsletter insight linking

## Phase 4 (Experimental)

- local LLM support
- semantic retrieval
- knowledge graph exploration

---

# 17. Final Product Positioning

## Incorrect Positioning

❌ AI newsletter reader
❌ Email summarizer
❌ Knowledge management app

## Correct Positioning

✅ AI-powered information triage system
✅ Newsletter intelligence pipeline
✅ Actionable knowledge extraction engine

---

# 18. Final Product Philosophy

The product should feel:

- invisible
- fast
- trustworthy
- lightweight

The best outcome is:

> The user consumes more valuable information with dramatically less cognitive load.
