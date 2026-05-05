---
inclusion: always
---

# Technology Stack

Vybe Tutor is an IDE extension, not a standalone web app.

## Core stack
- TypeScript for the extension host, shared types, and webview code.
- VS Code Extension API for commands, editor context, diagnostics, save listeners, hover/inline affordances where feasible, storage, and webview hosting.
- React webview UI for the sidebar tutoring experience.
- Vite for webview bundling.
- Tailwind CSS for fast, polished UI styling.
- Gemini API for code explanations, concept extraction, quiz generation, hints, deep-dive follow-up explanations, and optional answer feedback.
- Zod for validating AI outputs, stored state, and host/webview message payloads.
- VS Code SecretStorage for API keys.
- VS Code globalState and workspaceState for local progress, XP, streaks, skill level, and mastery data.
- Vitest for pure logic tests.

## Preferred libraries
- Current official Gemini SDK for TypeScript.
- `zod` for schema validation.
- `vitest` for unit tests.
- `fast-check` for property-based tests when useful.
- `esbuild`, `tsup`, or VS Code's recommended bundling path for extension packaging.
- Native VS Code storage before adding local JSON or SQLite.
- Local parsing libraries for PDF, DOCX, or TXT import only if the core loop is stable.

## Do not recommend by default
- React web app as the primary product.
- Supabase authentication.
- Cloud account system.
- Full backend service.
- Canvas OAuth in v1.
- Cloud database as a required dependency.
- Heavy infrastructure that does not strengthen the demo.

## API naming rule
Use Gemini consistently. Do not introduce Claude, OpenAI, or other LLM providers unless the team explicitly changes the stack.
