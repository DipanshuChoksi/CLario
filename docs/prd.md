# Product Requirements Document: CLario

**Version:** 1.0
**Date:** 2026-06-14
**Author:** Dipanshu Choksi

## 1. Problem Statement

Modern newsletters suffer from excessive storytelling, promotional fluff, and bloated HTML. Users subscribe intentionally but fail to consume consistently because their inboxes become overwhelming and extracting high-signal value takes too much effort. This creates "Newsletter Debt".

## 2. Target Users

- **Developers**: AI engineers, backend engineers, system designers, OSS contributors. Goal: Keep up with technical advancements efficiently. Frustration: Wading through long text for actionable code or tools.
- **Startup Founders**: Goal: Monitor market trends and operator insights. Frustration: Lack of time to read through multiple daily newsletters.
- **Technical Learners**: Engineering students and self-learners. Goal: Capture knowledge quickly. Frustration: Information overload and cognitive fatigue.

## 3. Proposed Solution

An AI-powered information triage and knowledge extraction system that fetches unread emails from a dedicated Gmail account under specific labels, cleans the HTML to remove garbage while preserving essential links/diagrams, and uses an LLM pipeline to extract structured insights. The system then delivers a high-signal daily digest via email and a minimal dashboard, allowing users to save outputs to PKM tools like Obsidian or Notion.

## 4. Key Features (MVP)

- **Gmail Integration**: Users authenticate with Google OAuth 2.0 using Clario's OAuth application. After granting read-only Gmail access, Clario securely fetches unread emails from configured Gmail labels using the Gmail API. OAuth access and refresh tokens are securely stored to enable scheduled background processing without requiring users to sign in repeatedly.
- **HTML Cleaning**: Strip ads, footers, tracking wrappers, and clutter while preserving links, code snippets, and image/diagram references.
- **LLM Pipeline**: Extract core thesis, key insights, tools mentioned, important links, and actionable takeaways into a structured format.
- **Daily Digest Generation**: Compile structured outputs into a single, scannable markdown digest stored in S3 and retrieved on the website. The digest generation will run on a user-configured schedule.
- **PKM Export**: Allow simple markdown export of today's digest.

## 5. Success Metrics

- 80% reduction in newsletter consumption time.
- Daily digest open rate > 60%.
- Reduction in user's unread newsletters and "save for later" tabs.
- High daily usage consistency.

## 6. Out of Scope (V1)

- No AI-generated "further reading" resources or chatbots.
- No vector databases or semantic search.
- No advanced ML categorization (relying on Gmail labels instead).
- No multi-user collaboration architecture.
- No complex dashboard ("second inbox" avoidance).
- No support for experimental local models.

## 7. Acceptance Criteria

- **Gmail Integration**: Users can securely authenticate with Clario using Google OAuth 2.0 and grant read-only access to their Gmail. After successful authentication, Clario securely stores OAuth tokens and automatically fetches unread emails from specified Gmail labels on the user's configured schedule using the Gmail API without modifying original emails.
- **HTML Cleaning**: Given a raw newsletter email, when it passes through the cleaner, then the output HTML/text is free of tracking links and ads, but retains original code blocks and image links.
- **LLM Pipeline**: Given clean newsletter text, when processed by the LLM, then it outputs the required JSON structure (Core Thesis, Insights, Tools, Links) without hallucinating facts.
- **Daily Digest Generation**: Given multiple structured JSON outputs, when compiled, then a single markdown digest is generated and emailed to the user.
- **PKM Export**: Given a viewed digest, when the user clicks "Save to Obsidian", then the system provides a properly formatted markdown file or copy-paste block.
