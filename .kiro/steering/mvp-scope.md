---
inclusion: always
---

# MVP Scope

## Goal

Deliver one visually polished, judge-friendly learning loop that matches the mockups and works reliably in a live demo:

```text
code context -> VYBE EXPLAIN -> quick check -> feedback -> adaptive difficulty -> XP/streak -> local persistence
```

If a feature does not improve this loop or the mockup-aligned demo, it is a stretch feature.

## Must-have functionality

- VS Code command to start tutoring on selected code.
- Sidebar/webview view for the tutoring experience.
- Mockup-aligned `VYBE EXPLAIN` panel.
- Gemini-generated code explanation.
- Concept identification.
- Inline code-chip rendering for important tokens.
- One quick-check quiz question tied to the same concept.
- Answer submission flow.
- Hint or easier retry after an incorrect answer.
- Deterministic local difficulty adjustment.
- XP update after quiz completion.
- Streak and level display in the sidebar.
- Local persistence for mastery and gamification state.
- Pause/snooze control or simple disable toggle.
- Friendly retry state for Gemini/API failure.

## Design-must-have for demo

- Dark terminal-inspired UI.
- Amber accent color.
- Header with `VYBE EXPLAIN` and `LIVE` pill.
- Large readable monospace explanation copy.
- `QUICK CHECK · +10 XP` section.
- Full-width answer choice buttons.
- Calm feedback after answer submission.

## PRD must-haves mapped to hackathon MVP

- Extension Install CTA: repo/README and demo install path are enough for the hackathon; Marketplace publishing is not a hard blocker.
- Real-Time Code Explanation: selected-code command is the safe MVP path; on-save is stretch unless the core loop is stable.
- Comprehension Quiz/Check: implement one question per explanation first.
- Gamification: implement XP, level, and streak locally.

## Should-have functionality

- Quick calibration/onboarding screen matching the second mockup.
- Visual difficulty/calibration label, such as `Calibrated for: Advanced`.
- Concept badge.
- Short feedback after each answer.
- One or two polished demo snippets.
- Support for Python plus one additional language if time allows.

## Stretch features

- Full 3-5 question onboarding calibration with persistence.
- Syllabus or lecture note import.
- PDF, DOCX, and TXT parsing.
- Course-topic matching and `Relate to my coursework` button.
- On-save explanation trigger.
- Hover/inline explanation affordance.
- Multi-language polish for Python, JavaScript, Java, and C++.
- Mini history of recent concepts.
- Export of local progress history.

## Explicitly out of scope

- Supabase or cloud sync.
- Account management.
- Canvas LMS OAuth.
- Instructor dashboard.
- Assignment solver mode.
- Marketplace publishing as a hard requirement for the hackathon demo.
- Support for JetBrains, Cursor, or other IDEs.

## Build order

1. Open sidebar view.
2. Render mockup-aligned static `VYBE EXPLAIN` UI using mock data.
3. Extract selected editor context.
4. Call Gemini for explanation and quiz.
5. Validate response with Zod.
6. Render explanation and quiz from real data.
7. Submit answer and show feedback.
8. Update adaptive mastery state.
9. Update XP, level, and streak.
10. Persist local state.
11. Add pause/snooze.
12. Add calibration/onboarding screen if time allows.
13. Add on-save, import, deep-dive, and other stretch features only after the loop is stable.
