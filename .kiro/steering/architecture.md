---
inclusion: fileMatch
fileMatchPattern: "src/**,webview/src/**,tests/**"
---

# Architecture

## System overview
Vybe Tutor is a local-first VS Code extension. The extension host gathers editor context, calls Gemini for structured tutoring output, validates the response, applies guardrails, and sends safe typed data to a React webview sidebar. Student answers are graded locally or with structured Gemini feedback, then the adaptive engine and gamification service update local state.

## Core layers

### 1. Extension host
Responsible for activation, command registration, editor access, save listeners, diagnostics, storage, Gemini orchestration, adaptive learning, and gamification state.

### 2. Context extraction layer
Collects the selected code or recently changed code block, language ID, file name, cursor range, diagnostics, and a small context window. Prefer function/class scope plus nearby lines over entire files.

### 3. AI orchestration layer
Builds prompts, calls Gemini, validates structured responses with Zod, and applies guardrails before any data reaches the UI.

### 4. Adaptive learning layer
Uses deterministic local rules to choose next difficulty for the same concept. Gemini may generate the question, but local code decides difficulty transitions.

### 5. Gamification layer
Tracks XP, levels, daily streaks, and basic progress state locally. Gamification should motivate learning without interrupting coding flow.

### 6. Webview UI layer
Renders the sidebar: level/streak header, explanation card, quiz section, hint area, feedback banner, difficulty indicator, and pause/import/settings controls.

## Layering rules
1. The webview never calls Gemini directly.
2. The webview never handles API keys.
3. Gemini calls go through a single service wrapper.
4. Prompt construction stays separate from React components.
5. Adaptive difficulty decisions happen locally, not inside the model.
6. XP and streak updates happen in local services, not inside the model.
7. All host-to-webview payloads must be typed and validated.
8. Storage helpers stay separate from tutoring and UI logic.
9. User-facing errors are friendly; internal logs can contain diagnostic detail.

## Primary demo flow
1. User highlights code or saves a file.
2. Extension host extracts relevant code context.
3. Tutor service builds a Gemini prompt for explanation and quiz.
4. Gemini returns structured JSON.
5. Zod validates the response.
6. Guardrails check for solution-like or malformed output.
7. Webview shows explanation, concept tag, difficulty, and quiz.
8. User answers.
9. System gives feedback and updates mastery.
10. Gamification service updates XP, level, and streak.
11. Adaptive engine chooses next difficulty for the same concept.
12. Local progress is saved.

## Trigger policy
- Manual command is the safest MVP path: `Vybe Tutor: Explain Selected Code`.
- On-save explanation is allowed, but should be configurable and easy to pause.
- Avoid firing Gemini on every keystroke.
- If no selection exists, use the nearest function/class or a small changed-code window.
- For files over 500 lines, send only relevant scope plus a small context window.

## State model

### SecretStorage
Use for:
- Gemini API key

### globalState
Use for:
- onboarding completion
- preferred explanation depth
- aggregate XP and level
- daily streak metadata
- global concept summary

### workspaceState
Use for:
- workspace-specific concept mastery
- recent quiz attempts
- last explanations
- recovery state by concept
- imported course-material summaries or indexes

## Non-goals for MVP
- cloud backend
- user accounts
- classroom dashboard
- Canvas OAuth
- mobile app
- support for IDEs other than VS Code
- repo-wide autonomous analysis