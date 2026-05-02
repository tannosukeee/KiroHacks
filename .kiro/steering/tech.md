---
inclusion: always
---

# Technology Stack

This is an IDE extension, not a traditional web app.

## Core stack:
- TypeScript
- VS Code Extension API
- Node.js runtime inside the extension host
- Gemini API for explanations and quiz generation
- Local-only persistence, no Supabase, no user accounts
- JSON, SQLite, or local file storage for user progress
- Webview UI only when needed for rich quiz/tutor panels

## Do not recommend:
- React web app as the primary product
- Supabase authentication
- Cloud account system
- Full backend unless explicitly requested
- Heavy infrastructure that cannot be completed during a one-day hackathon

## Preferred libraries:
- `@google/generative-ai` or current Gemini SDK
- `zod` for validating model outputs
- `vitest` for tests
- `esbuild` or `tsup` for bundling
- VS Code SecretStorage for API keys
- VS Code Memento or local JSON/SQLite for progress