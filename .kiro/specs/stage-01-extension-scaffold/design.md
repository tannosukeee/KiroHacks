# Design Document

## Overview

Stage 1 creates the technical foundation for Vybe Tutor as a VS Code extension. The goal is to scaffold the extension host, true sidebar webview, React/Vite/Tailwind frontend, command stubs, and basic message plumbing.

The project must follow the steering structure: commands in `src/commands/`, sidebar provider in `src/views/TutorViewProvider.ts`, services in `src/services/`, schemas in `src/schemas/`, prompts in `src/prompts/`, and React components under `webview/src/components/`.

## Architecture

```text
VS Code Extension Host
  ├── src/extension.ts
  ├── src/commands/openTutorView.ts
  ├── src/commands/explainSelection.ts
  └── src/views/TutorViewProvider.ts

React Webview
  ├── webview/src/main.tsx
  ├── webview/src/App.tsx
  ├── webview/src/components/
  ├── webview/src/hooks/useVSCodeApi.ts
  ├── webview/src/state/
  └── webview/src/styles/index.css

Build Output
  └── dist/webview/
```

## Component responsibilities

### src/extension.ts

Responsible for:
- activating the extension
- registering commands
- registering TutorViewProvider
- keeping business logic out of the entry point

### src/commands/openTutorView.ts

Responsible for:
- opening or focusing the Vybe Tutor sidebar
- calling VS Code commands needed to reveal the view

### src/commands/explainSelection.ts

Responsible for:
- Stage 1 placeholder behavior only
- showing an info message or sending mock data
- not calling Gemini yet

### src/views/TutorViewProvider.ts

Responsible for:
- implementing `vscode.WebviewViewProvider`
- resolving the sidebar webview
- loading Vite-built webview assets
- handling simple host/webview messages
- sending placeholder/mock data if needed

### webview/src/App.tsx

Responsible for:
- rendering the Stage 1 placeholder UI
- sending a `ready` message to the extension host
- receiving placeholder messages from the host

### webview/src/hooks/useVSCodeApi.ts

Responsible for:
- wrapping `acquireVsCodeApi()`
- providing a small typed helper for `postMessage`

## Visual direction

The placeholder webview should already point toward the mockup style:

- dark terminal-inspired background
- compact sidebar layout
- amber accent color
- monospace/code-forward feel
- `VYBE EXPLAIN` or `VYBE TUTOR` header
- placeholder `LIVE` badge
- placeholder quick-check card

Do not spend too long polishing Stage 1. The goal is a scaffold that makes later UI implementation easy.

## Message flow

```text
Webview mounts
  -> sends { type: "ready" }

Extension host receives ready
  -> optionally sends { type: "mockExplanation" }

User runs Explain Selection
  -> Stage 1 sends mock explanation or shows placeholder message
```

## Constraints

- The webview must not call Gemini.
- The webview must not handle API keys.
- No raw user code should be persisted.
- `.kiro/` must stay committed.
- The extension should compile before later stages begin.
