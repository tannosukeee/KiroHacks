# Vybe Tutor

> An IDE extension that helps students learn from vibe coding rather than exploit it.

## What it does

Vybe Tutor is a local-first VS Code extension that turns passive vibe coding into active learning. When students accept AI-generated code, Vybe Tutor explains what the code does, identifies key concepts, quizzes them on comprehension, and links to official documentation — all without leaving the editor. It adapts to the student's skill level in real time and rewards learning through XP, levels, and daily streaks.

The full loop runs entirely in the IDE sidebar:

1. Student selects AI-generated code
2. Gemini generates a plain-language explanation and a comprehension quiz
3. Student answers the quiz — the extension grades it locally, no round-trip to AI
4. Adaptive engine adjusts difficulty based on the answer (correct → harder, wrong → easier + hint)
5. XP, level, and streak update immediately in the header bar

## The problem we're solving

Vibe coding has been a great tool for students, faculty, and companies alike. Yet it can become a double-edged sword, especially for students. Students can blindly paste code without understanding what it does, why it works, or what security concerns it introduces. Vybe Tutor closes that gap by providing contextual explanations, comprehension checks, and official documentation references directly in the IDE sidebar — turning every AI-generated snippet into a learning opportunity.

## How we built it

Built as a VS Code extension with TypeScript, React, and the Gemini API. Developed entirely in Kiro IDE using spec-driven development, 18 steering documents, agent hooks for automated validation, and custom MCP integrations for documentation enrichment.

The adaptive engine and gamification layer are pure deterministic TypeScript functions — no AI involved in state transitions. Difficulty, XP, levels, and streaks are all computed locally from Zod-validated state, making the learning loop fast, testable, and privacy-safe.

## Track alignment

**Track**: Human-Centered Design

Vybe Tutor puts the learner at the center of the AI-assisted coding experience. Instead of optimizing for code output speed, it optimizes for understanding — adapting explanations to skill level, using encouraging feedback, and meeting students where they already work: inside their editor.

## Social good impact

Students across all skill levels increasingly rely on AI to write code, creating a comprehension gap where they ship code they don't understand. Vybe Tutor supports beginners learning syntax for the first time, bootcamp students building portfolio projects, and university learners navigating CS coursework — giving them accessible, confidence-building programming education without requiring a separate platform or paid tutoring.

## Tech stack

- **Language**: TypeScript
- **Extension host**: VS Code Extension API
- **UI**: React sidebar webview with Tailwind CSS
- **Bundling**: esbuild (extension), Vite (webview)
- **AI**: Google Gemini 2.5 Flash
- **Validation**: Zod schemas for all AI outputs, messages, and local state
- **Adaptive engine**: Deterministic pure functions — no AI in state transitions
- **Storage**: VS Code SecretStorage (API keys), in-memory state (session progress)
- **Testing**: Vitest — 49 unit tests covering all difficulty transitions and gamification logic
- **MCP**: Custom Python Docs server for documentation enrichment
- **IDE**: Kiro

## Project structure

```
src/
  extension.ts              Extension entry point, command registration, answer submission bridge
  ai/
    geminiService.ts         Gemini API integration with SecretStorage key management
    prompts.ts               Structured prompt builder for explanations and quizzes
    mockTutorResponse.ts     Mock response for offline development and testing
  commands/
    explainSelection.ts      "Explain Selection" command handler
    openTutorView.ts         "Open Tutor View" command handler
  views/
    TutorViewProvider.ts     WebviewViewProvider for the sidebar UI
  services/
    adaptiveEngine.ts        Deterministic difficulty adjustment — gradeMultipleChoiceAnswer,
                             updateMasteryState, chooseNextDifficulty, shouldShowHint
    gamification.ts          XP, levels, and streak tracking — awardQuizXp, calculateLevel,
                             updateDailyStreak
    docEnricher.ts           Maps concepts to Python docs and fetches relevant quotes
  schemas/
    mastery.ts               Zod schemas and types for concept mastery state
    gamification.ts          Zod schemas and types for XP, level, and streak state
  shared/
    contracts.ts             Zod schemas for TutorResponse, host/webview messages,
                             and quizFeedback payload
  mcp/
    pythonDocsServer.ts      MCP server exposing Python documentation tools
    pythonDocsTool.ts        Fetches and parses official Python docs by topic
    tutorMcpServer.ts        MCP server for tutor capabilities
webview/
  src/
    App.tsx                  Main React app — view state machine, message handler
    components/
      TutorResponseView.tsx  Explanation, quiz, and answer buttons
      HeaderBar.tsx          XP progress bar, streak, live/idle badge
      EmptyState.tsx         Initial state prompt
    state/
      gameState.ts           Client-side game state model
    hooks/
      useVSCodeApi.ts        VS Code webview API hook
  vite.config.ts             Vite bundler config for webview
tests/
  unit/
    adaptiveEngine.test.ts   27 tests — difficulty transitions, recovery loop, hint logic
    gamification.test.ts     22 tests — XP, levels, streaks, idempotency, date guards
.kiro/
  specs/                     Spec-driven feature definitions
  steering/                  18 steering documents for conventions and scope
  hooks/                     Agent hooks for automated validation
```

## Core learning loop

```
Select code → Gemini explanation → Concept identification → Doc enrichment
    → Comprehension quiz → Local grading → Adaptive difficulty → XP/streak → quizFeedback
```

## Answer submission bridge

When a student clicks a quiz answer:

1. **Webview** sends `submitQuizAnswer` with `questionId` and `selectedOptionId`
2. **Extension host** looks up the correct answer from the last `TutorResponse`
3. **`gradeMultipleChoiceAnswer`** compares selected vs correct (case-insensitive)
4. **`updateMasteryState`** adjusts difficulty and recovery state
5. **`awardQuizXp`** adds XP (+5 attempt, +10 correct, +5 recovery bonus)
6. **`updateDailyStreak`** updates the calendar streak
7. **Extension host** posts `quizFeedback` back with `isCorrect`, `correctOptionId`, `explanation`, `showHint`, `nextDifficulty`, `totalXp`, `level`, `currentStreak`
8. **Webview** renders the feedback banner and updates the header bar

All state transitions are deterministic and locally computed — Gemini is only called for explanations and quiz generation, never for grading or difficulty decisions.

## Setup and run

### Prerequisites
- Node.js 18+
- VS Code 1.85+
- Google Gemini API key (from [aistudio.google.com](https://aistudio.google.com/apikey))

### Installation
```bash
git clone https://github.com/tannosukeee/KiroHacks.git
cd KiroHacks
npm install
cd webview && npm install && cd ..
```

### Development
```bash
# Build the extension
npm run build

# Build the webview
npm run build:webview

# Run unit tests
npx vitest --run

# Or open in VS Code and press F5 to launch the Extension Development Host
```

### Setting your API key
1. Open the command palette (`Cmd+Shift+P`)
2. Run `Vybe Tutor: Set API Key`
3. Enter your Gemini API key

### Usage
1. Select code in the editor
2. Run `Vybe Tutor: Explain Selection` from the command palette
3. The sidebar shows: explanation → doc references → quiz → feedback → XP update

## Kiro Powers Writeup

### Spec-driven development

We used Kiro specs in `.kiro/specs/core-tutor-loop/` to define the full learning loop before writing code. The spec broke down requirements (Gemini integration, Zod validation, quiz flow, adaptive engine) into discrete tasks with clear acceptance criteria. This prevented scope creep during the hackathon and gave each team member a concrete implementation target.

### Agent hooks

We use 4 hooks in `.kiro/hooks/` to automate quality and consistency:

- **Course material context** — Before writing explanation code, checks if course materials are available to personalize tutoring to the student's coursework.
- **Codebase context lookup** — After writing tutor code, checks if referenced symbols have definitions elsewhere in the codebase that could enrich explanations.
- **Quiz progress sync** — Ensures quiz state stays consistent across the adaptive engine and gamification system.
- **Dataset schema validation** — Validates that AI output schemas match the Zod contracts, catching mismatches early.

### Steering documents

18 steering files in `.kiro/steering/` kept the entire team aligned:

- `tech.md` — Enforced TypeScript + VS Code Extension API stack, prevented drift toward web app architecture.
- `mvp-scope.md` — Defined must-have vs stretch features with explicit build order, keeping focus on the core loop.
- `product-principles.md` — "Teach before giving answers" principle prevented the tutor from becoming a code generator.
- `local-data-privacy.md` — No cloud accounts, no full file uploads, SecretStorage for keys — kept the product privacy-conscious.
- `adaptive-learning.md` — Defined all difficulty transition rules (incorrect → recover, correct while recovering → step up, 2 correct in a row → increase difficulty) so the engine matched the spec exactly.
- `gamification.md` — Defined XP scoring (+5 attempt, +10 correct, +5 recovery bonus), level formula, and streak rules deterministically.
- `gemini-prompts.md` — Standardized prompt structure across all AI calls.
- `ai-output-contracts.md` — Required Zod validation on every Gemini response.

### MCP integrations

- **Python Docs MCP Server** (`src/mcp/pythonDocsServer.ts`) — Custom MCP server that exposes a `getPythonDocs` tool. Given a topic (loops, functions, classes, etc.), it fetches the relevant section from docs.python.org, strips HTML, and returns structured sections with quotes.
- **Doc Enricher Service** (`src/services/docEnricher.ts`) — After Gemini identifies key concepts, the enricher maps them to doc topics, fetches official quotes in parallel, and attaches them to the tutor response. This means every explanation includes authoritative documentation inline — not as a separate lookup.
- **Tutor MCP Server** (`src/mcp/tutorMcpServer.ts`) — Exposes tutor capabilities as MCP tools for integration with other IDE agents.

### Vibe coding moments

- Scaffolded the entire Zod contract system (TutorResponse, DocReference, quiz schemas, host/webview messages, quizFeedback) in one conversation — contracts that would have taken hours to design manually.
- Built the full adaptive engine and gamification layer (7 pure functions, 49 unit tests) through spec-driven conversation, with the steering documents acting as the spec the agent implemented against.
- Wired the complete answer submission bridge — webview click → host grading → state update → feedback message → UI render — by inspecting the existing message flow and filling only the missing pieces.
- Iterated on Gemini prompt engineering across multiple rounds, testing structured JSON output with guardrails against solution-like responses.
- Built the doc enricher pipeline (concept mapping → parallel fetch → quote extraction → response attachment) end-to-end through conversational coding in under 20 minutes.

## Demo

[[Link to YouTube/Vimeo demo video - 3 minutes]](https://drive.google.com/file/d/1ULOTPL4I1GCHzBw3qd7yint6ztMYo9kz/view?usp=sharing)

## Team

- Tan Nguyen
- Valerie Truong
- Naomi Liu
- Brian Li

## License

MIT — see [LICENSE](LICENSE) file for details.

## Acknowledgments

Built at KiroHacks 2026, hosted by Cal Poly's CS+AI Club. Special thanks to AWS for sponsoring and providing on-site mentorship.
