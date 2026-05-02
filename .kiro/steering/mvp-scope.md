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
- Sidebar/webview panel for the tutoring experience.
- Gemini-generated code explanation.
- Concept identification.
- One comprehension quiz question tied to the same concept.
- Answer submission flow.
- Hint or easier retry after an incorrect answer.
- Deterministic local difficulty adjustment.
- XP update after quiz completion.
- Local persistence for mastery and gamification state.
- Pause/snooze control or simple disable toggle.

## Should-have functionality
- Visual difficulty indicator.
- Concept badge.
- Streak counter.
- Level or XP progress bar.
- Short feedback after each answer.
- One or two polished demo snippets.
- Support for Python plus one additional language if time allows.

## Stretch features
- Explanation depth onboarding quiz.
- Syllabus or lecture note import.
- Course-topic matching.
- On-save explanation trigger.
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
1. Open sidebar panel.
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
12. Add stretch features only after the loop is stable.