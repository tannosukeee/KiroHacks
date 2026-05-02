---
inclusion: always
---

# Project Structure

Vibe Code Tutor is a local-first VS Code extension with a TypeScript extension host and a React webview UI.

This file defines the expected repository layout, naming conventions, ownership boundaries, and placement rules for generated code.

## Repository layout

```text
.
├── .kiro/
│   ├── specs/
│   ├── steering/
│   └── hooks/
├── src/
│   ├── extension.ts
│   ├── commands/
│   ├── panels/
│   ├── services/
│   ├── schemas/
│   ├── prompts/
│   ├── types/
│   ├── utils/
│   └── test-data/
├── webview/
│   ├── src/
│   └── vite.config.ts
├── tests/
│   ├── unit/
│   └── integration/
├── package.json
├── tsconfig.json
└── README.md