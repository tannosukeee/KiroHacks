---
inclusion: fileMatch
fileMatchPattern: "src/prompts/**,src/services/gemini.ts,src/services/tutor.ts,src/utils/guardrails.ts"
---

# Gemini Prompting Guidelines

Gemini is used for code explanations, concept extraction, quiz generation, hint generation, and answer feedback.

## Prompting rules
- Ask Gemini for structured JSON when the extension needs to parse output.
- Validate responses with Zod.
- Prefer short, beginner-friendly explanations by default.
- Tie explanations to the user's selected or recently changed code.
- Include the language ID and relevant diagnostics when available.
- Include current concept and difficulty when generating follow-up questions.
- Do not reveal the final answer immediately during quiz mode.
- Use hints before solutions.
- Include concept tags such as loops, arrays, recursion, conditionals, functions, OOP, debugging, syntax, and data structures.

## Tutor behavior
- Do not provide full final assignment solutions.
- If selected code appears to be from an assignment, explain concepts and ask guiding questions.
- When code correction is needed, describe the issue and give a minimal hint first.
- Only reveal a direct fix after the learner has attempted or explicitly requested a hint/fix.
- Use plain language first, then deeper rationale behind a "Why does this work?" option.
- Keep explanations encouraging and low-pressure.

## Context minimization
Gemini prompts should include only what is needed:
- selected code or relevant changed block
- language ID
- file extension or filename when useful
- diagnostics or error text when relevant
- small surrounding context window
- skill level or explanation depth preference
- imported course-topic summary only if the user has provided materials

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