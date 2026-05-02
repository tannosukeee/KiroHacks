---
inclusion: fileMatch
fileMatchPattern: "webview/src/**"
---

# Webview UI Guidelines

The webview should feel like a focused tutoring sidebar, not a generic chatbot.

## Sidebar layout
- Top bar: Vybe Tutor logo/name, current level badge, XP progress bar, streak counter.
- Main panel: latest explanation card.
- Concept row: concept badge, language label, difficulty indicator.
- Quiz section: one comprehension check at a time.
- Feedback area: correct/incorrect result, hint, and next step.
- Footer: settings, pause/snooze, import materials button.

## UI priorities
- Clear explanation card.
- Concept badge.
- Difficulty indicator.
- Quiz card.
- Hint area.
- Feedback banner.
- Mastery/recovery status.
- Simple next-question flow.

## Design rules
- Keep the UI calm and beginner-friendly.
- Use short sections and readable spacing.
- Make the demo path obvious within 10 seconds.
- Show why difficulty changed after an answer.
- Avoid cluttered dashboards.
- Avoid chat-first UI unless needed.
- Avoid large walls of text.
- Put advanced details behind a "Why does this work?" toggle.

## States to design for
- Empty state before first explanation.
- Loading explanation.
- Explanation ready.
- Quiz unanswered.
- Correct answer.
- Incorrect answer with hint.
- Recovering from missed concept.
- Gemini/API failure with retry.
- Paused/snoozed state.

## Accessibility and usability
- Buttons should have clear labels.
- Do not rely only on color for correctness or difficulty.
- Keep keyboard navigation reasonable.
- Make text readable in VS Code light and dark themes when possible.