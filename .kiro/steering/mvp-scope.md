---
inclusion: always
---

# MVP Scope

## Goal
Deliver one tight, judge-friendly learning loop that is reliable in a live demo:

```text
code context -> explanation -> quiz -> feedback -> adaptive difficulty -> XP/streak -> local persistence
```

If a feature does not improve this loop, it is a stretch feature.

## Must-have functionality
- VS Code command to start tutoring on selected code.
- Sidebar/webview view for the tutoring experience.
- Gemini-generated code explanation.
- Concept identification.
- One comprehension quiz question tied to the same concept.
- Answer submission flow.
- Hint or easier retry after an incorrect answer.
- Deterministic local difficulty adjustment.
- XP update after quiz completion.
- Streak and level display in the sidebar.
- Local persistence for mastery and gamification state.
- Pause/snooze control or simple disable toggle.
- Friendly retry state for Gemini/API failure.

## PRD must-haves mapped to hackathon MVP
- Extension Install CTA: repo/README and demo install path are enough for the hackathon; Marketplace publishing is not a hard blocker.
- Real-Time Code Explanation: selected-code command is the safe MVP path; on-save is stretch unless the core loop is stable.
- Comprehension Quiz/Check: implement one question per explanation first.
- Gamification: implement XP, level, and streak locally.

## Should-have functionality
- Visual difficulty indicator.
- Concept badge.
- Short feedback after each answer.
- One or two polished demo snippets.
- Support for Python plus one additional language if time allows.
- Simple explanation-depth preference or default beginner mode.
- Simple deep-dive follow-up input in the sidebar if the main loop is stable.

## Stretch features
- Explanation depth onboarding quiz.
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
2. Extract selected editor context.
3. Call Gemini for explanation and quiz.
4. Validate response with Zod.
5. Render explanation and quiz.
6. Submit answer and show feedback.
7. Update adaptive mastery state.
8. Update XP, level, and streak.
9. Persist local state.
10. Add pause/snooze.
11. Polish UI and demo snippets.
12. Add on-save, deep-dive, onboarding, import, and other stretch features only after the loop is stable.
