---
inclusion: fileMatch
fileMatchPattern: "tests/**,src/services/**,src/schemas/**,src/utils/guardrails.ts"
---

# Testing and Quality

Testing should protect the demo-critical learning loop and the deterministic logic around it.

## Testing priorities
- Adaptive difficulty state transitions.
- Gemini response parsing and Zod validation.
- Guardrail behavior for solution-like output.
- Local storage read/write.
- Command registration.
- Host-to-webview message payloads.
- Quiz grading.
- XP, level, and streak updates.
- Pause/snooze state.
- Materials import only after the core loop is stable.

## Rules
- Write unit tests for pure logic.
- Mock Gemini API calls in automated tests.
- Test invalid AI JSON responses.
- Test difficulty changes after correct and incorrect answers.
- Test recovery flow after a wrong answer.
- Test that XP and streaks persist across storage reloads.
- Test that pause does not break an already-earned daily streak.
- Avoid relying on live API calls in tests.
- Use deterministic demo snippets.

## Minimum useful test set
- `adaptiveEngine.test.ts`: correct, incorrect, recovery, repeated incorrect, difficulty cap.
- `gamification.test.ts`: XP increase, level calculation, daily streak, pause does not break completed-day streak.
- `tutorResponse.test.ts`: valid Gemini JSON, invalid JSON, missing quiz fields, solution-like flag.
- `storage.test.ts`: read/write mastery and gamification state.
- `panelMessaging.test.ts` or `viewMessaging.test.ts`: host sends typed explanation and quiz payload to webview.
- `context.test.ts`: selected code and context window extraction.

## Demo QA checklist
Before demoing:
- Extension activates.
- Sidebar opens.
- Selected code explanation works.
- Quiz renders.
- Correct answer updates XP.
- Wrong answer shows hint and easier retry.
- State survives VS Code reload.
- API failure shows retry instead of crashing.
- Pause/snooze suppresses new generation.
- UI is readable in VS Code light and dark themes.
