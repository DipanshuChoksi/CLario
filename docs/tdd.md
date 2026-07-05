# Technical Design Document: CLario

**Version:** 1.0
**Date:** 2026-07-06
**PRD Reference:** docs/prd.md
**Status:** Approved

## 1. Architecture Overview

CLario is a Next.js full-stack application that leverages Inngest for background orchestration. It fetches unread emails via the Gmail API on a user-configured schedule, cleans the HTML, and processes the text through the OpenAI SDK to extract structured knowledge. The resulting markdown digests are stored in a local folder, while user configurations and metadata are managed in Supabase.

## 2. Tech Stack

| Layer | Recommendation | Rationale |
| -------- | --------------------------- | --------- |
| Frontend | Next.js (React/TypeScript) | Minimal dashboard, simple S3 integration, and fast rendering. |
| Backend | Next.js API Routes | Serverless API routes co-located with the frontend for simplicity. |
| Background Jobs | Inngest | Reliable execution of long-running workflows (Gmail fetch -> LLM -> local storage). |
| Database | Supabase (PostgreSQL) | Robust relational storage for user preferences and schedule config. |
| LLM | OpenAI SDK | Reliable structured JSON extraction using function calling/structured outputs. |
| Auth | NextAuth.js (Auth.js) | Native integration with Google OAuth using Clario's centralized GCP credentials. |
| Storage | Local File System | File-based storage for compiled daily markdown digests. |
| Hosting | Vercel | Seamless deployment for Next.js and API endpoints. |

## 3. Data Model

**Users Table:**
- `id`: UUID (Primary Key)
- `email`: String
- `refresh_token`: String (Encrypted)
- `schedule`: String (Cron expression or time preference)
- `created_at`: Timestamp

**Digests Table (Metadata):**
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key)
- `file_path`: String (Path to markdown file in local folder)
- `date`: Date
- `created_at`: Timestamp

## 4. API Design

- `POST /api/auth/[...nextauth]` - Handles Google OAuth flow.
- `GET /api/digests` - Retrieves metadata of user's past digests from Supabase.
- `GET /api/digests/[id]/download` - Streams the markdown digest file from the local folder for downloading/viewing.
- `POST /api/inngest` - Webhook endpoint for Inngest background jobs.
- `PUT /api/settings` - Updates user schedule and GCP credentials.

## 5. Authentication & Authorization

Users will authenticate via NextAuth.js using Google OAuth. Clario will use a centralized Google Cloud Project OAuth application. NextAuth will request the `https://www.googleapis.com/auth/gmail.readonly` scope. OAuth tokens will be stored securely in Supabase.

## 6. Third-Party Integrations

- **Gmail API:** For reading emails matching the "newsletters" label.
- **OpenAI API:** For passing cleaned email text and receiving structured JSON.
- **Local Storage:** For storing the final markdown output on disk.
- **Inngest:** For orchestrating the multi-step background job reliably.

## 7. Non-Functional Requirements

- **Security:** GCP credentials and OAuth tokens must be encrypted at rest in Supabase.
- **Reliability:** The background extraction pipeline must be idempotent and retryable (handled by Inngest).
- **Performance:** Dashboard loading should be instant; digest generation happens asynchronously.

## 8. Technical Risks

- **Context Window Limits:** Newsletters can be very long. Mitigation: Implement strict HTML cleaning and consider chunking text if it exceeds OpenAI context limits.
- **Gmail API Quotas:** Fetching many emails might hit rate limits. Mitigation: Use Inngest step concurrency controls and batched API requests.
