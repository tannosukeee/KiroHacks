# Implementation Plan

## Stage 1: Scaffold VS Code Extension

- [x] 1. Initialize extension project
  - [x] 1.1 Create root `package.json`
    - Add extension name, display name, publisher placeholder, version, engines.vscode, main entry, scripts.
    - Add activation events for the initial commands and sidebar view.
    - Add contributes.commands for:
      - `vybeTutor.openTutorView`
      - `vybeTutor.explainSelection`
    - Add contributes.viewsContainers and contributes.views for the Vybe Tutor sidebar.
    - Do not add Gemini implementation yet.
    - _Requirements: 1.1, 2.1, 2.2, 3.1_

  - [x] 1.2 Create TypeScript config
    - Add `tsconfig.json`.
    - Enable strict mode.
    - Target ES2020 or newer.
    - Include `src/**/*.ts`.
    - Exclude `webview`, `dist`, and `node_modules` as appropriate.
    - _Requirements: 1.2_

  - [x] 1.3 Add base dependencies
    - Runtime dependencies: none for Stage 1 (add `zod` and Gemini SDK in a later stage)
    - Dev dependencies:
      - `typescript`
      - `@types/vscode`
      - `@types/node`
      - `vitest`
      - `vite`
      - `react`
      - `react-dom`
      - `@types/react`
      - `@types/react-dom`
      - `@vitejs/plugin-react`
      - `tailwindcss`
      - `postcss`
      - `autoprefixer`
    - _Requirements: 1.1, 4.1, 4.2, 4.4_

- [x] 2. Create extension host skeleton
  - [x] 2.1 Create `src/extension.ts`
    - Export `activate(context: vscode.ExtensionContext)`.
    - Export `deactivate()`.
    - Register `TutorViewProvider`.
    - Register `vybeTutor.openTutorView`.
    - Register `vybeTutor.explainSelection`.
    - _Requirements: 1.3, 1.4, 2.1, 2.2_

  - [x] 2.2 Create command handlers
    - Create `src/commands/openTutorView.ts`.
    - Create `src/commands/explainSelection.ts`.
    - Keep command handlers thin.
    - Do not add tutor business logic.
    - _Requirements: 2.3, 2.4, 2.5_

  - [x] 2.3 Create `src/views/TutorViewProvider.ts`
    - Implement `vscode.WebviewViewProvider`.
    - Resolve webview options.
    - Load HTML referencing bundled webview JS/CSS.
    - Add minimal message listener.
    - Add `postMessage` helper.
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 3. Create React webview scaffold
  - [x] 3.1 Create Vite config for webview
    - Create `webview/vite.config.ts`.
    - Configure output to `dist/webview`.
    - Configure React plugin.
    - _Requirements: 4.1, 4.3_

  - [x] 3.2 Create webview entry files
    - Create `webview/src/main.tsx`.
    - Create `webview/src/App.tsx`.
    - Create `webview/src/styles/index.css`.
    - _Requirements: 4.1, 4.2, 4.5_

  - [x] 3.3 Add Tailwind
    - Create Tailwind config if needed.
    - Add Tailwind directives to `index.css`.
    - Ensure dark mockup-friendly base styles.
    - _Requirements: 4.4, 4.6_

  - [x] 3.4 Create initial placeholder components
    - Create `webview/src/components/EmptyState.tsx`.
    - Create `webview/src/components/MockExplainPreview.tsx`.
    - Create `webview/src/components/HeaderBar.tsx`.
    - Use mock text only.
    - _Requirements: 3.5, 4.5_

  - [x] 3.5 Create `webview/src/hooks/useVSCodeApi.ts`
    - Wrap `acquireVsCodeApi`.
    - Send `{ type: "ready" }` on mount.
    - _Requirements: 5.1_

- [ ] 4. Add simple host/webview message plumbing
  - [ ] 4.1 Webview sends ready message
    - _Requirements: 5.1_
  - [ ] 4.2 Host logs ready message
    - _Requirements: 5.2_
  - [ ] 4.3 Host can send mock explanation message
    - _Requirements: 5.2_
  - [ ] 4.4 `explainSelection` command sends mock explanation if sidebar is open
    - _Requirements: 2.4, 5.2_
  - [ ] 4.5 Do not add Zod validation yet; leave TODO for Stage 3
    - _Requirements: 5.3_

- [ ] 5. Add build and test scripts
  - [ ] 5.1 Add scripts
    - `compile`
    - `build`
    - `build:webview`
    - `watch`
    - `test`
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ] 5.2 Add `.gitignore`
    - Ignore `node_modules`, `dist`, `.env`, `.env.local`
    - Do not ignore `.kiro/`
    - _Requirements: 6.5, 6.6_

  - [ ] 5.3 Add `.vscodeignore`
    - Exclude source maps or dev-only files as appropriate.
    - _Requirements: 6.5_

  - [ ] 5.4 Add `tests/unit/smoke.test.ts`
    - Verify test runner works.
    - _Requirements: 6.4_

- [ ] 6. Manual verification
  - [ ] 6.1 Run install.
  - [ ] 6.2 Run TypeScript compile.
  - [ ] 6.3 Run webview build.
  - [ ] 6.4 Launch VS Code Extension Host.
  - [ ] 6.5 Confirm Vybe Tutor sidebar appears.
  - [ ] 6.6 Confirm `Open Tutor View` command works.
  - [ ] 6.7 Confirm `Explain Selection` does not crash.
  - [ ] 6.8 Confirm tests pass.

## Done criteria

Stage 1 is complete when:
- the extension activates
- the sidebar opens
- the React webview renders
- command stubs exist
- basic message plumbing works
- TypeScript compiles
- webview builds
- tests run
- no Gemini/adaptive/storage logic has been implemented
