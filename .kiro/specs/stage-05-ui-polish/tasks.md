# Implementation Plan: Stage 05 — UI Polish

## Overview

Cosmetic and UX refinement pass on the Vybe Tutor sidebar webview. All changes are scoped to `webview/` files. The existing game loop (answer selection, XP, combo, recovery mode, difficulty adjustment, Try Easier Question flow) remains functionally unchanged. Tasks are ordered foundation-first so later component work can reference the updated token set.

## Tasks

- [ ] 1. Add shared visual tokens (CSS variables + Tailwind config)
  - [ ] 1.1 Add missing CSS custom properties to `webview/src/styles/index.css`
    - Add `--vybe-panel-raised: #2e2e2e` to `:root`
    - Add `--vybe-amber-dark: #3d2e0a` to `:root`
    - Add `--vybe-chip-bg: #1a1a1a` to `:root`
    - Add `--vybe-red: #e05252` to `:root`
    - Add `--vybe-red-dark: #3a1616` to `:root`
    - Keep all existing variables unchanged
    - _Requirements: 1.1, 1.2, 2.2, 2.5_

  - [ ] 1.2 Extend `webview/tailwind.config.js` with matching Tailwind tokens
    - Add `"panel-raised": "var(--vybe-panel-raised)"` to `colors.vybe`
    - Add `"amber-dark": "var(--vybe-amber-dark)"` to `colors.vybe`
    - Add `"chip-bg": "var(--vybe-chip-bg)"` to `colors.vybe`
    - Add `"red": "var(--vybe-red)"` to `colors.vybe`
    - Add `"red-dark": "var(--vybe-red-dark)"` to `colors.vybe`
    - Keep all existing tokens unchanged
    - _Requirements: 1.1, 1.2, 2.1, 2.2_

- [ ] 2. Polish HeaderBar layout
  - [ ] 2.1 Simplify HeaderBar top row to title + LIVE pill only
    - Keep `VYBE EXPLAIN` title on the left, status pill (LIVE/IDLE) on the right
    - Remove streak indicator from the title row
    - _Requirements: 4.1, 4.2, 4.5_

  - [ ] 2.2 Move streak to XP row and reduce emoji weight
    - Render streak as a quiet text label (e.g., `STREAK 1`) in the XP bar row area, outside the `XPProgressBar` component
    - Either remove the flame emoji entirely and use plain `STREAK 1` text, or keep the flame at `text-[9px] opacity-70`
    - _Requirements: 4.3, 5.1, 5.2_

  - [ ] 2.3 Replace inline `var()` references with Tailwind token equivalents in HeaderBar
    - Replace `bg-[var(--vybe-panel)]` with `bg-vybe-panel`, `border-[var(--vybe-border)]` with `border-vybe-border`, etc.
    - Replace `bg-[var(--vybe-amber-dark)]` with `bg-vybe-amber-dark`, `bg-[var(--vybe-panel-raised)]` with `bg-vybe-panel-raised`
    - _Requirements: 2.1, 2.3, 4.4_

- [ ] 3. Polish typography hierarchy
  - [ ] 3.1 Update MockExplainPreview typography sizes
    - Increase explanation body text from `text-sm` to `text-lg` (18–20px)
    - Increase question text from `text-sm` to `text-lg` (18–20px)
    - Keep section label `QUICK CHECK · +10 XP` at `text-[11px]` uppercase with `text-vybe-subtle`
    - Keep line reference metadata at `text-xs` with `text-vybe-subtle`
    - Keep concept title at `text-sm`/`text-base` with `text-vybe-amber`
    - Replace inline `var()` references with Tailwind token equivalents where applicable
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ] 3.2 Update XPProgressBar to use Tailwind tokens
    - Replace `bg-[var(--vybe-chip-bg)]` with `bg-vybe-chip-bg`
    - Replace other inline `var()` references with Tailwind token equivalents
    - _Requirements: 1.2, 2.1_

- [ ] 4. Checkpoint — Verify foundation and layout changes
  - Ensure the webview builds without errors (`cd webview && npx vite build`)
  - Ensure all `--vybe-*` variables referenced in components are defined in `:root`
  - Ask the user if questions arise

- [ ] 5. Polish answer cards (ChoiceButton)
  - [ ] 5.1 Fix disabled state readability
    - Remove `opacity-50` from the disabled state class string
    - Use `text-vybe-muted` for disabled text color instead
    - Keep `cursor-default` and `border-vybe-border` for disabled state
    - Ensure `disabled` and `aria-disabled` attributes remain set on the `<button>` element
    - _Requirements: 6.1, 6.2, 9.5, 10.4_

  - [ ] 5.2 Update ChoiceButton colors and sizes
    - Replace inline `var()` references with Tailwind token equivalents (e.g., `bg-vybe-panel`, `border-vybe-amber`, `text-vybe-amber`)
    - Replace raw `red-500/50` and `red-400` with `border-vybe-red/50` and `text-vybe-red`
    - Increase answer text from `text-sm` to `text-base` (16–18px)
    - Update button font size to `text-base`
    - Keep `disabled`/`aria-disabled` attributes and `✓`/`✗` non-color indicators
    - _Requirements: 2.1, 2.2, 3.2, 6.1, 6.2, 10.1_

- [ ] 6. Polish feedback cards (FeedbackBanner)
  - [ ] 6.1 Restructure correct-answer state
    - Render "✓ Correct!" heading in amber, bold, `text-base`
    - Render "+XP" as inline metadata next to heading
    - Render combo and challenge-cleared info as `text-xs` `text-vybe-muted` metadata row
    - Render quiz explanation in `text-sm` `text-vybe-muted` `leading-relaxed`
    - Render "Next Challenge" as the primary CTA button label (replacing "Continue")
    - Style "Next Challenge" button with `border-vybe-amber`, `bg-vybe-amber-dark/30`, `text-base`, `font-bold`, `text-vybe-amber`
    - Add "Why does this work?" placeholder secondary button (not wired to logic)
    - Replace inline `var()` references with Tailwind token equivalents
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 2.1_

  - [ ] 6.2 Restructure incorrect-answer state
    - Render "× Not quite" heading in red, bold, `text-base` using `text-vybe-red`
    - Render "+5 XP" as inline metadata next to heading
    - Render "RECOVERY MODE" badge using `bg-vybe-red-dark/10`, `text-vybe-red`, `border-vybe-red/20`
    - Render difficulty change as `text-[10px]` `text-vybe-subtle` metadata
    - Promote hint text from `text-xs` to `text-sm` with `text-vybe-text` color; keep "Hint:" label in `text-vybe-amber`
    - Render "Try Easier Question" button with `border-vybe-border`, `bg-vybe-panel-raised`, `text-base`, `font-bold`, `text-vybe-text`, hover to amber
    - Convert "Review Explanation" from `<details>` collapsible to a styled secondary button for visual consistency
    - Replace raw Tailwind `red-400`/`red-500` with `vybe-red`/`vybe-red-dark` tokens throughout
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 2.2_

  - [ ] 6.3 Ensure button accessibility in FeedbackBanner
    - Ensure "Next Challenge" button is a `<button>` element and keyboard-focusable
    - Ensure "Try Easier Question" button is a `<button>` element and keyboard-focusable
    - Ensure visible focus ring styles on both buttons
    - _Requirements: 10.2, 10.3, 12.2_

- [ ] 7. Checkpoint — Verify all component polish
  - Ensure the webview builds without errors (`cd webview && npx vite build`)
  - Verify no raw `red-400`/`red-500` Tailwind classes remain in polished components
  - Verify no `opacity-50` on disabled ChoiceButton
  - Ask the user if questions arise

- [ ] 8. Write component tests (Vitest + React Testing Library)
  - [ ] 8.1 Set up Vitest and React Testing Library in the webview project
    - Install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` as dev dependencies in `webview/`
    - Add a `vitest.config.ts` (or extend `vite.config.ts`) with `jsdom` environment
    - Add a `test` script to `webview/package.json`: `"test": "vitest --run"`
    - _Requirements: 11.1_

  - [ ]* 8.2 Write ChoiceButton tests
    - Test: disabled state renders legible text without `opacity-50` class
    - Test: disabled state has `disabled` and `aria-disabled` attributes
    - Test: default state button is not disabled (keyboard-focusable)
    - Test: correct state shows `✓` indicator, incorrect state shows `✗` indicator
    - Test: answer text renders at `text-base` size class
    - _Requirements: 6.1, 6.2, 9.5, 10.1, 10.4_

  - [ ]* 8.3 Write FeedbackBanner tests
    - Test: correct state renders "Correct" heading text
    - Test: correct state renders XP and combo metadata
    - Test: correct state renders explanation text when provided
    - Test: correct state renders "Next Challenge" button when `onContinue` is provided
    - Test: correct state "Next Challenge" button calls `onContinue` on click
    - Test: incorrect state renders "Not quite" heading text
    - Test: incorrect state renders hint text
    - Test: incorrect state renders "RECOVERY MODE" badge when `isRecovering` is true
    - Test: incorrect state renders "Try Easier Question" button when `onTryEasier` is provided
    - Test: incorrect state "Try Easier Question" button calls `onTryEasier` on click
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 8.1, 8.2, 8.3, 8.5_

  - [ ]* 8.4 Write HeaderBar tests
    - Test: renders product title "VYBE EXPLAIN"
    - Test: renders "LIVE" pill when `isLive` is true, "IDLE" when false
    - Test: renders streak indicator when `gameState.streak > 0`
    - Test: "Next Challenge" and "Try Easier Question" buttons are keyboard-focusable (not disabled)
    - _Requirements: 4.1, 4.2, 4.3, 10.2, 10.3_

  - [ ]* 8.5 Write game loop regression tests
    - Test: clicking a correct answer updates XP (combo increments, XP increases)
    - Test: clicking "Next Challenge" loads a new question
    - Test: clicking "Try Easier Question" loads a new question at lower difficulty
    - Test: full correct flow — XP increases, combo increments
    - Test: full incorrect flow — XP increases by 5, combo resets, recovery mode activates
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 9. Final checkpoint — Ensure all tests pass
  - Run `cd webview && npm test` and ensure all tests pass
  - Ensure the webview builds without errors
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP.
- Each task references specific requirements for traceability.
- Checkpoints ensure incremental validation.
- PBT is not applicable — all changes are CSS/Tailwind classes, JSX structure, and button labels.
- All changes are scoped to `webview/` files only.
- The existing game loop behavior is preserved; only visual presentation changes.
