# Vybe Tutor

> An IDE extension that helps students learn from vibe coding rather than exploit it.

## What it does

Vybe Tutor is a local-first VS Code extension that turns passive vibe coding into active learning. When students accept AI-generated code, Vybe Tutor explains what the code does, identifies key concepts, quizzes them on comprehension, and links to official documentation — all without leaving the editor. It adapts to the student's skill level and rewards learning through XP, levels, and streaks.

## The problem we're solving

Vibe coding has been a great tool for students, faculty, and companies alike. Yet it can become a double-edged sword, especially for students. Students can blindly paste code without understanding what it does, why it works, or what security concerns it introduces. Vybe Tutor closes that gap by providing contextual explanations, comprehension checks, and official documentation references directly in the IDE sidebar — turning every AI-generated snippet into a learning opportunity.

## How we built it

Built as a VS Code extension with TypeScript, React, and the Gemini API. Developed entirely in Kiro IDE using spec-driven development, 18 steering documents, agent hooks for automated validation, and custom MCP integrations for documentation enrichment.

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
- **Validation**: Zod schemas for all AI outputs and messages
- **Storage**: VS Code SecretStorage (API keys), globalState (progress/XP)
- **MCP**: Custom Python Docs server for documentation enrichment
- **IDE**: Kiro


## Project structure

```
src/
  extension.ts              Extension entry point and command registration
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
    docEnricher.ts           Maps concepts to Python docs and fetches relevant quotes
    adaptiveEngine.ts        Deterministic difficulty adjustment based on performance
    gamification.ts          XP, levels, and streak tracking
  schemas/
    gamification.ts          Zod schemas for XP and level state
    mastery.ts               Zod schemas for concept mastery tracking
  shared/
    contracts.ts             Zod schemas for TutorResponse, DocReference, and messages
  mcp/
    pythonDocsServer.ts      MCP server exposing Python documentation tools
    pythonDocsTool.ts         Fetches and parses official Python docs by topic
    tutorMcpServer.ts        MCP server for tutor capabilities
webview/
  src/                       React sidebar UI with Tailwind CSS
  vite.config.ts             Vite bundler config for webview
.kiro/
  specs/                     Spec-driven feature definitions
  steering/                  18 steering documents for conventions and scope
  hooks/                     Agent hooks for automated validation
```

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

## Core learning loop

```
Select code → Gemini explanation → Concept identification → Doc enrichment
    → Comprehension quiz → Answer feedback → Adaptive difficulty → XP/streak
```

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
- `gemini-prompts.md` — Standardized prompt structure across all AI calls.
- `ai-output-contracts.md` — Required Zod validation on every Gemini response.

### MCP integrations

- **Python Docs MCP Server** (`src/mcp/pythonDocsServer.ts`) — Custom MCP server that exposes a `getPythonDocs` tool. Given a topic (loops, functions, classes, etc.), it fetches the relevant section from docs.python.org, strips HTML, and returns structured sections with quotes.
- **Doc Enricher Service** (`src/services/docEnricher.ts`) — After Gemini identifies key concepts, the enricher maps them to doc topics, fetches official quotes in parallel, and attaches them to the tutor response. This means every explanation includes authoritative documentation inline — not as a separate lookup.
- **Tutor MCP Server** (`src/mcp/tutorMcpServer.ts`) — Exposes tutor capabilities as MCP tools for integration with other IDE agents.

### Vibe coding moments

- Scaffolded the entire Zod contract system (TutorResponse, DocReference, quiz schemas, host/webview messages) in one conversation — contracts that would have taken hours to design manually.
- Iterated on Gemini prompt engineering across multiple rounds, testing structured JSON output with guardrails against solution-like responses.
- Built the doc enricher pipeline (concept mapping → parallel fetch → quote extraction → response attachment) end-to-end through conversational coding in under 20 minutes.

## Demo

[Link to YouTube/Vimeo demo video - 3 minutes]

## Team

- Tan Nguyen
- Valerie Truong
- Naomi Liu
- Brian Li

## License

MIT — see [LICENSE](LICENSE) file for details.

## Acknowledgments

Built at KiroHacks 2026, hosted by Cal Poly's CS+AI Club. Special thanks to AWS for sponsoring and providing on-site mentorship.
