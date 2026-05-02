# Vibe Code Tutor — Revised Tech Stack for a Local-First VS Code Extension

## Recommendation in one sentence
Build **Vibe Code Tutor as a VS Code extension** using a **TypeScript extension host + React/Tailwind webview UI + Gemini for explanation and quiz generation + a deterministic local adaptive-difficulty engine + local VS Code storage**, so the product feels like a real developer-learning tool while still scoring well on **Implementation**, **Innovation & Design**, and **Social Good**.

---

## Product constraints this stack is designed around
1. **This is an IDE extension, not a standalone web app.**
2. **Gemini is used for explanation and quiz generation.**
3. **Difficulty adapts based on user responses.** If a student gets a problem wrong, the next problem for that same concept becomes easier; once they recover, the tutor returns them to a problem near the original difficulty.
4. **Everything stays local to the machine.** No Supabase, no account system, no cross-device sync.
5. **The tutor explains and checks understanding, but does not write the solution for the student.**

---

## Why this revised direction is strong
The best version of this product lives **inside the coding workflow**. A VS Code extension lets the tutor watch the student’s real code context, explain what is happening, and immediately test understanding without forcing the student into a separate website.

The new changes also make the idea stronger:
- **Gemini** handles natural-language explanation and quiz generation.
- The **adaptive difficulty system** makes the product feel more educational and intentional than a generic AI sidebar.
- A **local-first architecture** reduces setup friction, protects user privacy, and keeps the demo simple and reliable.

That combination helps the project feel both practical and innovative.

---

# Recommended tech stack

## 1) Core extension platform
### **VS Code Extension API**
Use the native VS Code extension platform for commands, active editor access, diagnostics, storage, and the webview panel.

**Why this is the right choice**
- Direct access to the student’s actual code environment
- Lets the product use the active file, selected code, cursor location, and error messages as tutoring context
- Makes the demo feel like a real tool, not just a chat wrapper
- Strong match for the project’s central user journey: **code -> explain -> quiz -> adjust difficulty -> continue learning**

### **TypeScript**
Use TypeScript for the extension host and shared app types.

**Why**
- Best-supported language for VS Code extensions
- Great for schema-driven AI integration
- Easier to move quickly while keeping the codebase clean during a hackathon

### **Node.js runtime**
The extension host runs on Node and is the correct place to handle Gemini requests, local persistence, and adaptive logic.

**Important architecture rule**
Call Gemini from the **extension host**, not from the webview. That keeps secrets and request orchestration out of the UI layer.

---

## 2) In-editor UI layer
### **React inside a VS Code Webview**
Use a webview panel for the actual tutor experience.

**Use the panel for:**
- explanation cards
- concept breakdowns
- quiz prompts and answer inputs
- mastery indicators
- “why this got easier/harder” feedback
- lightweight progress history

**Why React is the right fit**
- Gives you a polished and interactive experience in-editor
- Makes it easier to create an intentional teaching flow instead of a series of notifications
- Helps the project score better on design because the user journey can feel clean and guided

### **Vite**
Use Vite to bundle the webview frontend.

**Why**
- Fastest iteration cycle during a hackathon
- Clean React + TypeScript workflow
- Easy to keep the webview build separate from the extension host

### **Tailwind CSS**
Use Tailwind to style the webview.

**Why**
- Fastest way to get a polished UI under hackathon time pressure
- Great for cards, mastery badges, quiz states, and feedback callouts
- Supports a modern, intentional visual design without a heavy CSS burden

### **Optional component layer: shadcn/ui**
Use it only if time allows.

**Best uses**
- cards
- tabs
- accordion sections for explanations
- buttons
- badges
- progress bars
- dialog components for onboarding or help

---

## 3) AI layer
### **Gemini API**
Use **Gemini** for:
- code explanation
- concept extraction
- misconception-aware feedback
- quiz generation
- short review guidance

**Do not use Gemini for**
- writing the student’s solution
- auto-completing assignments
- silently replacing learning with code generation

### **Structured-response design**
Do not let the model return totally free-form text. Require a predictable response shape.

**Recommended response sections**
- `summary`
- `block_explanations[]`
- `concepts[]`
- `quiz_questions[]`
- `difficulty_level`
- `misconceptions[]`
- `review_tip`
- `contains_solution_like_output`

### **Why Gemini fits this project**
Gemini is a strong fit because the project needs an LLM that can:
- explain code in plain English
- generate targeted follow-up questions
- stay on one concept while difficulty changes
- support a tutoring flow rather than just a one-shot answer

---

## 4) Adaptive difficulty engine
### **Deterministic local mastery engine in TypeScript**
This should be one of the most important parts of the project.

**Do not leave adaptive difficulty entirely to the model.**
Instead, keep the progression rules local and deterministic so the system behaves predictably.

### **How the adaptive logic should work**
Track mastery **per concept** and **per difficulty band**.

Example concept flow:
1. Student gets a medium-difficulty loop question wrong
2. Next question stays on **loops** but drops to an easier version
3. If the student answers correctly, give another loop question that is slightly harder
4. Once the student shows recovery, return to a question close to the original medium difficulty
5. If they succeed there, mark that concept as improved

### **Recommended difficulty model**
Use something simple and demo-friendly, such as:
- **1 = easy**
- **2 = medium**
- **3 = challenging**

For each concept, store:
- current difficulty band
- recent correct/incorrect streak
- last missed difficulty
- recovery state
- confidence or mastery score

### **Why this matters for judging**
This feature is one of the clearest ways to show:
- thoughtful AI development
- educational intent
- functionality beyond a basic AI explainer

It makes the product feel like a tutor, not just a chatbot.

---

## 5) Validation and schema enforcement
### **Zod**
Use Zod in the extension host to validate model responses before the UI renders them.

**Why**
- Prevents malformed AI output from breaking the extension
- Makes the system feel engineered rather than improvised
- Gives you a strong implementation story: the model is treated as one component in a validated pipeline

### **Shared TypeScript interfaces**
Use shared interfaces between the extension host and the webview for:
- explanations
- quiz question payloads
- mastery updates
- adaptive state updates

This reduces UI bugs and makes the project easier to reason about.

---

## 6) Code context and code understanding
### **VS Code editor context**
Start with native editor context before adding heavier parsing.

**Capture:**
- selected text
- active file contents
- language ID
- cursor position
- nearby code window
- diagnostics or error messages
- file name or logical scope if useful

This is enough for a strong MVP.

### **Optional stretch: Tree-sitter or syntax-aware chunking**
Use this only if the core tutor loop is already stable.

**Why it is valuable**
- Splits code into real logical blocks
- Improves explanation quality for longer files
- Makes concept extraction more intentional

**Recommended scope**
If you add syntax-aware chunking, support only one or two languages well, such as:
- Python
- JavaScript / TypeScript

---

## 7) Local-only persistence
### **VS Code SecretStorage**
Use this for sensitive local secrets.

**Store:**
- Gemini API key
- optional local preferences related to model access

**Why**
- Keeps secrets out of the webview
- Keeps the project local-first and privacy-conscious
- Avoids the need for accounts or cloud auth

### **VS Code `globalState` and `workspaceState`**
Use native extension storage for all non-sensitive tutoring state.

**Store in `globalState`:**
- onboarding completion
- preferred explanation style
- recent concept mastery summary
- aggregate quiz history

**Store in `workspaceState`:**
- project-specific concept history
- recent explanation sessions
- file- or workspace-level progress
- local adaptive state tied to the current codebase

### **Optional local JSON file or SQLite database**
Only add this if you want richer analytics or session replay.

**Good use cases**
- detailed history of question attempts
- concept mastery timeline
- local export of progress data

For the hackathon, native VS Code storage is probably enough. Add SQLite only if you need deeper history and your team has extra time.

---

## 8) Optional learning-material ingestion
### **Local PDF parsing only if it supports the demo**
If you later keep the syllabus/course-material angle, parse files locally.

**Possible local tools**
- `pdf-parse`
- `pdfjs`
- another lightweight local parser

**Use cases**
- import a syllabus
- map coding concepts to course topics
- generate a small local study plan

**Important scope note**
This is still secondary to the main loop:
**explain code -> quiz understanding -> adapt difficulty -> keep learning**

---

## 9) Testing and reliability
### **Vitest**
Use Vitest for unit tests on:
- adaptive-difficulty logic
- schema validation
- local state transitions
- prompt-building helpers

### **VS Code Extension Test tooling**
Use extension-level tests for:
- command registration
- editor context extraction
- message passing between extension host and webview

### **Manual eval set for the hackathon demo**
Create a small set of sample code snippets and expected tutoring behavior.

**Example eval dimensions**
- explanation clarity
- correct concept labeling
- question quality
- difficulty step-down after a wrong answer
- difficulty recovery after improvement
- refusal to generate solution code

This gives you a very strong implementation story when judges ask how you validated the AI behavior.

---

## 10) Packaging and demo readiness
### **vsce / extension packaging workflow**
Package the extension so judges can see it as a real VS Code tool.

### **Simple local setup flow**
Aim for this demo setup:
1. Install extension
2. Paste Gemini API key into extension settings or secure setup flow
3. Open a sample file
4. Highlight code or trigger the tutor command
5. Get explanation + quiz + adaptive next question

That setup is simple enough for a demo and still feels real.

---

# Suggested architecture

## Flow of data
1. Student highlights code or runs the tutor command
2. Extension host gathers editor context
3. Extension host builds a tutoring request
4. Gemini returns explanation + concept tags + quiz content
5. Zod validates the response
6. Webview displays explanation and question set
7. Student answers questions
8. Local adaptive engine updates mastery state
9. Extension host decides the next difficulty for that concept
10. Gemini generates the next question at the chosen difficulty
11. Local state is saved to the machine

---

# What not to include in this version
Do **not** add these for the hackathon MVP:
- Supabase
- authentication
- profiles across devices
- cloud dashboards
- collaborative syncing
- full assignment solving
- auto-code generation as the main interaction

These would add complexity without strengthening the core proof of the product.

---

# Why this stack satisfies the judging criteria

## 1) Implementation (20 pts)
This stack shows a thoughtful AI strategy because it is **not just “send code to an LLM and print the answer.”**

It includes:
- direct IDE integration through the VS Code API
- structured Gemini outputs instead of loose chat text
- validation through Zod
- a deterministic adaptive-difficulty engine
- local persistence for mastery tracking
- clear separation between AI generation and rule-based progression
- explicit guardrails to avoid solution generation

That is a strong story of engineered AI behavior.

## 2) Innovation & Design (20 pts)
The idea feels original because it turns an IDE into a **teaching environment**, not just a coding environment.

The design can feel polished and intentional through:
- a clean in-editor tutoring panel
- concept-based explanations
- adaptive quizzes that react to mistakes
- visible progress and recovery across the same concept
- explanation of *why* the next question became easier or harder

This is more differentiated than a generic AI code assistant.

## 3) Social Good (20 pts)
The project addresses a real problem:
students increasingly use AI to speed up coding, but often lose understanding in the process.

This stack supports that mission because it is:
- **learning-first**, not generation-first
- **local-first**, which lowers privacy risk and removes account friction
- **scalable in use**, because the same tutor loop can support beginners in many contexts
- **realistic**, because it fits into the environment students already use

The user journey is also strong:
- the student stays in VS Code
- receives help in context
- gets questions matched to current understanding
- is guided back up after mistakes instead of being punished by static difficulty

That is a clear educational and social-good story.

---

# Final recommendation
Use this as the final stack direction for the hackathon:

- **VS Code Extension API**
- **TypeScript**
- **React webview**
- **Vite**
- **Tailwind CSS**
- **Gemini for explanation and quiz generation**
- **Zod for response validation**
- **Deterministic adaptive-difficulty engine in TypeScript**
- **VS Code SecretStorage + globalState/workspaceState for local persistence**
- **Optional syntax-aware chunking and optional local PDF parsing only if the core loop is already finished**

This keeps the product focused, technically believable, demo-friendly, and strongly aligned with the judging rubric.
