---
inclusion: fileMatch
fileMatchPattern: "src/services/deepDive.ts,src/prompts/deepDive.ts,src/services/tutor.ts,src/schemas/**,webview/src/components/*DeepDive*,webview/src/**/DeepDive*.tsx"
---

# Deep-Dive Exploration

Deep-dive exploration lets learners ask follow-up questions about the current code or concept after reading the initial explanation.

## Product behavior
- The learner can click `Ask more in-depth` from the explanation card or inline explanation affordance.
- The sidebar shows an input for a follow-up question.
- Gemini returns a deeper, context-aware explanation, examples, or breakdowns.
- The answer should stay educational and tied to the current code/concept.
- The tutor may record related concept signals locally to shape future quizzes.

## MVP boundary
Deep-dive exploration is useful but should not block the core demo loop. Implement it only after explanation, quiz, feedback, adaptive difficulty, gamification, and persistence work.

## Guardrails
- Do not turn deep dive into assignment solving.
- Do not provide full replacement code as the default answer.
- Hints and conceptual explanations should come before direct fixes.
- Validate deep-dive responses with Zod before rendering.

## Local learning signals
Deep-dive interactions can update lightweight concept signals such as:
- concepts the user asked about
- misconceptions mentioned by Gemini
- related concepts to prioritize in future quizzes

Do not update mastery score from deep-dive alone. Mastery should change after quiz performance.
