---
inclusion: fileMatch
fileMatchPattern: "src/prompts/**,src/services/gemini.ts,src/services/tutor.ts,src/utils/guardrails.ts"
---

# Gemini Prompting Guidelines

Gemini is used for code explanations, concept extraction, quiz generation, hint generation, optional answer feedback, and optional course-material connections.

## Prompting rules

- Ask Gemini for structured JSON when the extension needs to parse output.
- Validate responses with Zod.
- Prefer short, beginner-friendly explanations by default.
- Tie explanations to the user's selected, hovered, or recently changed code.
- Include the language ID and relevant diagnostics when available.
- Include current concept and difficulty when generating follow-up questions.
- Include skill level or explanation depth when known.
- Include concise course-material context only when materials were imported and relevant.
- Do not reveal the final answer immediately during quiz mode.
- Use hints before solutions.

## Mockup-aligned output style

Prompt Gemini to produce copy that can render like the mockups:

- concise explanation, usually 2 short paragraphs max
- line/concept title such as `Line 3 · @cache decorator`
- important code tokens for chips, such as `@cache`, `fib(40)`, `useEffect`, `ArrayList`
- one quick-check question
- short answer choices
- a short hint
- a short explanation for the correct answer
- no markdown table output
- no huge bullet lists
- no generic chatbot greeting

## Concept tags

Include concept tags such as:

- loops
- arrays
- recursion
- memoization
- conditionals
- functions
- OOP
- debugging
- syntax
- data structures
- architecture
- performance
- design patterns

## Tutor behavior

- Do not provide full final assignment solutions.
- If selected code appears to be from an assignment, explain concepts and ask guiding questions.
- When code correction is needed, describe the issue and give a minimal hint first.
- Only reveal a direct fix after the learner has attempted or explicitly requested a hint/fix.
- Use plain language first, then deeper rationale behind a `Why does this work?` option.
- Keep explanations encouraging and low-pressure.
- For advanced learners, focus more on tradeoffs, design decisions, patterns, and performance.

## Context minimization

Gemini prompts should include only what is needed:

- selected code, hovered range, or relevant changed block
- language ID
- file extension or filename when useful
- diagnostics or error text when relevant
- small surrounding context window
- skill level or explanation depth preference
- imported course-topic summary only if the user has provided materials and requested course connection

## Difficulty and adaptation

- Gemini generates questions at the requested difficulty.
- Gemini does not decide whether difficulty should increase or decrease.
- Local adaptive logic chooses the next difficulty and passes it into the prompt.

## Bad output handling

If Gemini returns malformed JSON, solution-like output, or unsafe content:

- do not pass it directly to the webview
- show a friendly recoverable error
- allow retry
- log internal diagnostic detail
