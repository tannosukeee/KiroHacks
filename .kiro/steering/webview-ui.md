---
inclusion: fileMatch
fileMatchPattern: "webview/src/**"
---

# Webview UI Guidelines

The webview should match the provided dark terminal-inspired mockups. It should feel like a focused tutoring console inside VS Code, not a generic chatbot, LMS dashboard, or bright gamified app.

## Source of truth

Use these docs/mockups for implementation:

- `docs/design/mockups/vybe-explain-panel.png`
- `docs/design/mockups/vybe-calibration-screen.png`
- `.kiro/steering/visual-design.md`

## Main surfaces

### 1. VYBE EXPLAIN panel

This is the default live explanation and quick-check sidebar.

Required UI pieces:

- Top header with `VYBE EXPLAIN` on the left.
- Compact amber `LIVE` pill on the right.
- Explanation title using line/concept format, for example `Line 3 · @cache decorator`.
- Inline code chips for tokens like `@cache` and `fib(40)`.
- Concise explanation copy in large monospace text.
- Quiet calibration label, for example `Calibrated for: Advanced`.
- Divider line before quiz.
- `QUICK CHECK · +10 XP` label.
- Optional visual prompt card with code tokens.
- Multiple-choice answer buttons with `A.`, `B.`, `C.`, `D.` labels.

### 2. Quick calibration screen

This is the onboarding/skill-level calibration surface.

Required UI pieces:

- Small uppercase label, such as `QUESTION 2 OF 3 · ~30 SECONDS`.
- Large question heading, such as `Which language?`.
- Muted helper copy.
- Thin amber progress bar.
- Large dark option cards.
- Back and Next controls.
- Bottom step pill, such as `STEP 3 Quick calibration — 5 questions, ~60 seconds`.

## Visual style

- Dark background.
- Warm amber accent.
- Monospace-heavy type.
- Serif or strong display type allowed for large onboarding titles.
- Rounded code chips.
- Subtle borders.
- Large readable text.
- Generous spacing.
- Minimal icon use.

## Component map

Use or create components like:

```text
HeaderBar.tsx              # VYBE EXPLAIN + LIVE badge or level/streak compact header
LiveStatusBadge.tsx        # amber LIVE pill
ExplanationCard.tsx        # line/concept title + explanation copy
InlineCodeChip.tsx         # @cache / fib(40) visual token
QuickCheckCard.tsx         # quiz wrapper
QuizVisualCard.tsx         # white/cream visual prompt card
ChoiceButton.tsx           # A/B/C/D answer option
FeedbackBanner.tsx         # correct/incorrect + hint
DifficultyIndicator.tsx    # difficulty/calibration label
CalibrationScreen.tsx      # onboarding flow screen
CalibrationOption.tsx      # onboarding option row
ProgressRail.tsx           # thin amber progress line
BottomStepPill.tsx         # step pill at bottom
PausedState.tsx            # pause/snooze state
ErrorState.tsx             # retryable Gemini/API failure state
```

## Layout rules

- Design narrow sidebar first.
- Do not overload the top header; the mockup header is simple.
- Keep explanations short enough to scan.
- Keep answer choices full-width and easy to click.
- Use one quiz at a time.
- Put secondary actions behind subtle buttons or toggles.

## Theme rules

- Support VS Code dark theme first because the mockup is dark.
- Keep light theme readable, but do not let light theme drive the design.
- Use VS Code CSS variables where practical.
- Preserve amber accent and code-chip styling across themes.

## Accessibility and usability

- All interactive elements must be keyboard focusable.
- Do not rely only on color to indicate correct/incorrect answers.
- Use clear button labels.
- Maintain readable contrast.
- Make answer choices large enough for quick selection.

## Avoid

- Chat-first UI.
- Bright confetti-heavy gamification.
- Dense analytics dashboards.
- Generic form styling.
- Large walls of AI text.
- Unstyled markdown dumps.
