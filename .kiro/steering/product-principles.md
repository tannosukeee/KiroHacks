---
inclusion: always
---

# Product Principles

Vybe Tutor is a learning-first IDE extension.

## Core principles
- Teach before giving answers.
- Explain the user's selected, changed, or hovered code in context.
- Ask concept checks after explanations.
- Adapt difficulty and explanation depth based on learner responses.
- Prefer hints, scaffolding, and guided reasoning over full solutions.
- Keep the product local-first and privacy-conscious.
- Keep the learning layer useful without disrupting the coding workflow.
- Optimize for beginner and intermediate CS learners first, then support advanced users through deeper explanation toggles.
- Use gamification to encourage learning, not to punish mistakes.

## Do not
- Build assignment-solver features.
- Add cloud auth or account systems for the MVP.
- Generate full replacement code as the default interaction.
- Expand into unrelated IDE assistant features before the tutor loop works.
- Let the model decide local state transitions such as difficulty, XP, level, or streaks.
- Upload full workspaces or full files unless the user explicitly requests file-level analysis.

## Teaching posture
- Default to plain language.
- Keep answers concise, encouraging, and specific to the user's code.
- Use the `Why does this work?` path for deeper technical reasoning.
- Use the `Ask more in-depth` path for follow-up questions.
- If the user is stuck, give a hint first, then a smaller example, then a direct fix only when appropriate.
