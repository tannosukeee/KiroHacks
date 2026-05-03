# Design Document

## Overview

Stage 2 connects the Stage 1 scaffold into a clickable mock tutor loop. The goal is: select code → run Explain Selection → sidebar shows mock explanation → user clicks answer → feedback appears → mock XP updates.

All data is mocked. The extension host generates a hardcoded mock TutorResponse based on the selected code metadata. The webview handles answer selection, feedback display, and local XP tracking.

## Architecture

```text
User selects code in editor
  -> runs vybeTutor.explainSelection
  -> extension host reads selection + language + filename
  -> extension host builds mock TutorResponse
  -> extension host sends { type: "mockExplanation", data: {...} } to webview
  -> webview updates state: IDLE -> LIVE, renders explanation + quiz

User clicks answer choice
  -> webview compares to correctAnswerIndex
  -> webview shows FeedbackBanner (correct or incorrect + hint)
  -> webview updates local XP (+5 attempt, +10 if correct)
  -> answer buttons disabled after submission

User selects new code and runs Explain Selection again
  -> webview replaces explanation, resets feedback, keeps XP
```

## Mock TutorResponse shape

```typescript
interface MockTutorResponse {
  concept: string;
  lineReference: string;
  explanation: string;
  codeTokens: string[];
  language: string;
  fileName: string;
  quiz: {
    question: string;
    choices: string[];
    correctAnswerIndex: number;
    hint: string;
  };
}
```

This is a simplified mock shape. The real TutorResponse schema (with Zod validation) will be added in a later stage.

## Component changes

### src/commands/explainSelection.ts

Update to:
- Read `editor.document.getText(selection)` for the selected text
- Read `editor.document.languageId` and `editor.document.fileName`
- Build a mock TutorResponse using the metadata
- Send it to the webview via `provider.postMessage`
- Focus the sidebar

### webview/src/App.tsx

Update to:
- Track `explanationData`, `feedbackState`, `totalXp`, and `isLive` in state
- When `mockExplanation` message arrives: set explanation data, set `isLive = true`, reset feedback
- Pass state down to child components

### webview/src/components/HeaderBar.tsx

Update to:
- Accept `isLive` and `totalXp` props
- Show `LIVE` badge in amber when active, `IDLE` in muted when not
- Show XP total near the header

### webview/src/components/MockExplainPreview.tsx

Update to:
- Render the explanation with line reference and code token chips
- Render the quiz section with `QUICK CHECK · +10 XP` label
- Render four ChoiceButton components
- Handle answer click: determine correct/incorrect, show feedback, disable buttons, update XP

### New: webview/src/components/ChoiceButton.tsx

- Full-width dark button with subtle border
- Label format: `A.`, `B.`, `C.`, `D.`
- States: default, selected-correct (amber/green border + icon), selected-incorrect (red/muted border + icon), disabled
- Click handler calls parent's onAnswer callback

### New: webview/src/components/FeedbackBanner.tsx

- Correct: encouraging message with amber accent, e.g. "Nice work! +15 XP"
- Incorrect: hint text with muted styling, e.g. "Not quite. Hint: [hint text]"
- Does not rely only on color — uses text labels and icons

## Visual direction

Follow the existing mockup style:
- Dark terminal-inspired background
- Amber accent for correct/active states
- Monospace text for explanations and choices
- `VYBE EXPLAIN` header with `LIVE`/`IDLE` badge
- `QUICK CHECK · +10 XP` section label
- Full-width A/B/C/D answer buttons
- Calm feedback banner below the choices

## Constraints

- No Gemini calls. All explanations are hardcoded mock data.
- No Zod validation. Message shapes are plain TypeScript interfaces.
- No adaptive difficulty. Every mock quiz is the same difficulty.
- No persistence. XP resets on webview reload.
- No real gamification service. XP is a simple counter in React state.
