# Requirements Document

## Introduction

Stage 1 scaffolds the Vybe Tutor VS Code extension project. This stage creates the TypeScript extension host, package manifest, command stubs, true sidebar webview view, React + Vite webview build pipeline, Tailwind setup, and basic test infrastructure.

This stage does not implement Gemini, adaptive learning, quiz grading, XP/streak logic, file import, deep dive, or persistence. It only creates the foundation that later stages can build on.

## Glossary

- Extension_Host: The TypeScript process running inside VS Code.
- Sidebar_View: The VS Code sidebar view powered by WebviewViewProvider.
- Webview_UI: The React + Vite + Tailwind UI rendered inside the sidebar.
- Command: A VS Code command registered through package.json and extension.ts.
- Scaffold: Project setup and placeholder functionality only.

## Requirement 1: Create VS Code extension foundation

**User Story:** As a developer, I want a working VS Code extension scaffold, so that the team can build Vybe Tutor inside the correct platform.

### Acceptance Criteria

1. WHEN the repo is opened, THE project SHALL include a valid `package.json` for a VS Code extension.
2. THE project SHALL include a strict TypeScript configuration.
3. THE project SHALL include `src/extension.ts` with `activate` and `deactivate` functions.
4. THE extension SHALL activate without throwing errors in the VS Code Extension Host.
5. THE scaffold SHALL not include FastAPI, Streamlit, Supabase, or backend-server architecture.

## Requirement 2: Register initial commands

**User Story:** As a learner, I want to open Vybe Tutor and trigger explanation from VS Code commands, so that the extension has a real entry point.

### Acceptance Criteria

1. THE extension SHALL register `vybeTutor.openTutorView`.
2. THE extension SHALL register `vybeTutor.explainSelection`.
3. WHEN `vybeTutor.openTutorView` is invoked, THE Sidebar_View SHALL open or focus.
4. WHEN `vybeTutor.explainSelection` is invoked during Stage 1, THE command SHALL show a placeholder message or send mock data only.
5. THE command implementation SHALL be placed under `src/commands/`.

## Requirement 3: Create true sidebar webview

**User Story:** As a learner, I want Vybe Tutor to appear in the VS Code sidebar, so that it feels integrated into my coding workflow.

### Acceptance Criteria

1. THE extension SHALL use `WebviewViewProvider`, not a floating `WebviewPanel`, unless the team explicitly changes direction.
2. THE sidebar provider SHALL be named `TutorViewProvider`.
3. THE provider SHALL live at `src/views/TutorViewProvider.ts`.
4. THE sidebar SHALL load bundled webview assets from the Vite build output.
5. THE sidebar SHALL show a placeholder Vybe Tutor UI before real tutor data exists.

## Requirement 4: Set up React + Vite + Tailwind webview

**User Story:** As a frontend developer, I want a React webview shell, so that later stages can implement the mockup-aligned UI.

### Acceptance Criteria

1. THE project SHALL include a `webview/` folder.
2. THE webview SHALL use React and TypeScript.
3. THE webview SHALL use Vite to bundle assets into `dist/webview/`.
4. THE webview SHALL include Tailwind CSS setup.
5. THE webview SHALL render a placeholder app without requiring Gemini or backend services.
6. THE webview SHALL support VS Code dark theme by default.

## Requirement 5: Add basic message plumbing

**User Story:** As a developer, I want the extension host and webview to exchange simple messages, so that later stages can add typed tutor messages safely.

### Acceptance Criteria

1. THE webview SHALL send a `ready` message to the extension host after mounting.
2. THE extension host SHALL be able to send a placeholder message to the webview.
3. THE message layer SHALL be simple in Stage 1 and prepared for Zod validation in a later stage.
4. THE webview SHALL never receive API keys or secret values.

## Requirement 6: Add basic test and build scripts

**User Story:** As a developer, I want basic scripts to build and test the scaffold, so that the team can verify the project is healthy.

### Acceptance Criteria

1. THE root `package.json` SHALL include scripts for extension compile/build.
2. THE root `package.json` SHALL include a script for webview build.
3. THE root `package.json` SHALL include a script for tests.
4. THE project SHALL include a minimal Vitest smoke test.
5. THE project SHALL include `.gitignore` and `.vscodeignore`.
6. THE `.gitignore` SHALL not ignore `.kiro/`.

## Non-goals

- No Gemini API calls.
- No API key setup command.
- No Zod schemas.
- No adaptive engine.
- No XP, levels, or streaks.
- No local persistence.
- No file import.
- No deep dive.
- No final visual polish.
