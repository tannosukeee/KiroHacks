# Implementation Plan: Stage 06 — Cal Poly Theme

## Overview

Replace the current charcoal-and-amber color system with a Cal Poly / Mustangs-inspired palette of greens and golds across all webview components. Changes are scoped entirely to `webview/` — no logic, game state, adaptive engine, or extension host code is modified. The approach is foundation-first (CSS variables + Tailwind config), then component-by-component class name updates.

## Tasks

- [x] 1. Add theme tokens
  - [x] 1.1 Update `webview/src/styles/index.css` with Cal Poly-inspired CSS variables
    - Replace the entire `:root` block with the new Cal Poly palette
    - Add Cal Poly accent variables: `--vybe-poly-green` (#154734), `--vybe-mustang-gold` (#BD8B13), `--vybe-stadium-gold` (#F8E08E), `--vybe-poly-canyon` (#F2C75C), `--vybe-farmers-green` (#3A913F), `--vybe-dexter-green` (#A4D65E)
    - Add green-tinted neutral variables: `--vybe-bg` (#101713), `--vybe-panel` (#17231d), `--vybe-panel-2` (#1d2b24), `--vybe-card` (#171b19), `--vybe-card-raised` (#202820), `--vybe-border` (#345244), `--vybe-border-muted` (#2a342f), `--vybe-text` (#f1eadb), `--vybe-muted` (#9d9a8f)
    - Add status variables: `--vybe-success` (#A4D65E), `--vybe-success-deep` (#3A913F), `--vybe-warning` (#F2C75C), `--vybe-error` (#ff6b6b), `--vybe-error-bg` (#2b2026)
    - Remove old variables: `--vybe-raised`, `--vybe-subtle`, `--vybe-amber`, `--vybe-chip`
    - Preserve `--vybe-mono` font stack unchanged
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [x] 1.2 Verify all new variables are defined in `:root` and available globally
    - Ensure the `body` selector still references `--vybe-bg`, `--vybe-text`, and `--vybe-mono`
    - _Requirements: 1.1, 1.4_

- [x] 2. Replace scattered color usage
  - [x] 2.1 Search webview component files for hardcoded amber/yellow/gray/red color classes
    - Identify all instances of `amber`, `#d6ad45`, `red-400`, `red-500`, `#737373`, `#a8a8a8`, and other hardcoded color values in `.tsx` files
    - _Requirements: 1.4, 2.5_
  - [x] 2.2 Replace repeated hardcoded values with theme variables or consistent Tailwind arbitrary values
    - Convert `var(--vybe-amber)` references to new token names (e.g., `vybe-mustang-gold`)
    - Convert `var(--vybe-subtle)` references to `vybe-muted`
    - Convert `var(--vybe-chip-bg)` and `var(--vybe-chip)` references to `vybe-card`
    - Convert `var(--vybe-panel-raised)` references to `vybe-card-raised` or `vybe-panel-2` as appropriate
    - Convert `var(--vybe-amber-dark)` references to `vybe-poly-green`
    - _Requirements: 1.4, 2.1, 2.2_
  - [x] 2.3 Preserve red only for incorrect/error states
    - Replace raw `red-400`, `red-500` Tailwind classes with `vybe-error` token references
    - Confirm red is not used for any non-error UI element
    - _Requirements: 2.5_

- [x] 3. Retheme header
  - [x] 3.1 Update `webview/src/components/HeaderBar.tsx`
    - Header background: use `bg-vybe-panel`
    - Border: use `border-vybe-border`
    - Title text: use `text-vybe-text`
    - Streak text: change from `text-[var(--vybe-amber)]` to `text-vybe-stadium-gold opacity-70`
    - _Requirements: 3.1, 3.5, 3.6_
  - [x] 3.2 Apply green/gold treatment to LIVE/IDLE badge
    - LIVE badge: `bg-vybe-poly-green text-vybe-mustang-gold`
    - IDLE badge: `bg-vybe-panel-2 text-vybe-muted`
    - _Requirements: 3.2_
  - [x] 3.3 Apply gold progress fill and green progress track in `webview/src/components/XPProgressBar.tsx`
    - Track background: `bg-vybe-poly-green` (green track)
    - Fill bar: `bg-vybe-mustang-gold` (gold fill)
    - Level label: `text-vybe-mustang-gold`
    - XP text: `text-vybe-muted`
    - Container: `bg-vybe-panel`
    - _Requirements: 3.3, 3.4_
  - [x] 3.4 Keep XP and level readable
    - Verify level label is visually connected to the progress bar
    - Verify XP count text uses `text-vybe-muted` for quiet readability
    - _Requirements: 3.4, 3.5_
  - [x] 3.5 Keep header spacing stable
    - Ensure no layout changes — only class name swaps, no structural JSX changes
    - _Requirements: 3.6_

- [x] 4. Retheme explanation area
  - [x] 4.1 Update `webview/src/components/MockExplainPreview.tsx` — explanation container
    - Line/concept label: change `text-[var(--vybe-subtle)]` to `text-vybe-muted`
    - Concept span: change `text-[var(--vybe-amber)]` to `text-vybe-mustang-gold`
    - Explanation text: use `text-vybe-text`
    - _Requirements: 1.2, 2.1_
  - [x] 4.2 Update metadata color to muted gray
    - Quick check label: change `text-[var(--vybe-subtle)]` to `text-vybe-muted`
    - Divider: change `border-[var(--vybe-border)]` to `border-vybe-border`
    - _Requirements: 2.6_
  - [x] 4.3 Update concept title to Mustang Gold
    - Concept name in the line/concept header uses `text-vybe-mustang-gold`
    - _Requirements: 2.1, 2.3_
  - [x] 4.4 Update code chips to use dark green background with gold text
    - Code chips: `bg-vybe-card text-vybe-mustang-gold border-vybe-border`
    - _Requirements: 1.4, 2.1_
  - [x] 4.5 Update `webview/src/components/DifficultyIndicator.tsx`
    - Label text: change `text-[var(--vybe-subtle)]` to `text-vybe-muted`
    - Current difficulty: `text-vybe-muted`
    - Changed difficulty accent: change `text-[var(--vybe-amber)]` to `text-vybe-mustang-gold`
    - _Requirements: 2.1, 2.6_

- [x] 5. Retheme quiz cards
  - [x] 5.1 Update `webview/src/components/ChoiceButton.tsx`
    - Default state: `bg-vybe-card border-vybe-border-muted text-vybe-text`
    - Default hover: `hover:border-vybe-mustang-gold hover:bg-vybe-card-raised` with subtle gold glow `hover:shadow-[0_0_6px_rgba(189,139,19,0.15)]`
    - _Requirements: 2.1, 2.6_
  - [x] 5.2 Default answers use dark card plus muted green-gray border
    - Verify default state uses `bg-vybe-card` and `border-vybe-border-muted`
    - _Requirements: 2.6_
  - [x] 5.3 Hover/selected answers use Mustang Gold
    - Hover border and glow use gold accent
    - _Requirements: 2.1, 2.3_
  - [x] 5.4 Correct answer uses green/gold success styling
    - Correct state: `bg-vybe-card-raised border-vybe-dexter-green text-vybe-stadium-gold`
    - _Requirements: 4.1_
  - [x] 5.5 Incorrect answer keeps red error styling
    - Incorrect state: `border-vybe-error/50 text-vybe-error`
    - _Requirements: 4.2_
  - [x] 5.6 Disabled answers remain readable
    - Disabled state: `text-vybe-muted opacity-55 border-vybe-border-muted` (no full opacity-50 washout)
    - _Requirements: 4.3_

- [x] 6. Retheme feedback states
  - [x] 6.1 Update `webview/src/components/FeedbackBanner.tsx` — correct answer state
    - Card border: `border-vybe-success-deep/40` (green success border)
    - Card background: `bg-vybe-poly-green/20` (deep green card)
    - Heading "✓ Correct!": `text-vybe-mustang-gold`
    - XP text: `text-vybe-stadium-gold`
    - Combo text: `text-vybe-poly-canyon`
    - Explanation: `text-vybe-muted`
    - _Requirements: 4.4_
  - [x] 6.2 Update `FeedbackBanner.tsx` — incorrect answer state
    - Card border: `border-vybe-error/20`
    - Card background: `bg-vybe-error-bg/30`
    - Heading "✗ Not quite": `text-vybe-error`
    - RECOVERY MODE badge: `bg-vybe-error/10 text-vybe-error/80 border-vybe-error/20`
    - Hint label: `text-vybe-mustang-gold`
    - Difficulty change text: `text-vybe-muted`
    - Review Explanation summary: `text-vybe-muted`
    - _Requirements: 4.5, 2.5_
  - [x] 6.3 Incorrect feedback uses red only for error label/border
    - Verify red is used only for the "✗ Not quite" heading, RECOVERY MODE badge, and card border — not for buttons
    - _Requirements: 2.5, 4.5_
  - [x] 6.4 "Try Easier Question" button uses green/gold styling
    - Style: `border-vybe-border bg-vybe-card-raised text-vybe-text hover:border-vybe-mustang-gold hover:text-vybe-mustang-gold`
    - _Requirements: 4.6_
  - [x] 6.5 "Next Challenge" button uses green/gold styling
    - Style: `border-vybe-mustang-gold bg-vybe-poly-green/30 text-vybe-mustang-gold hover:bg-vybe-poly-green/50`
    - _Requirements: 4.6_

- [x] 7. Update Tailwind config
  - [x] 7.1 Update `webview/tailwind.config.js` with all new color tokens
    - Add tokens: `panel-2`, `card`, `card-raised`, `border-muted`, `poly-green`, `mustang-gold`, `stadium-gold`, `poly-canyon`, `farmers-green`, `dexter-green`, `success`, `success-deep`, `warning`, `error`, `error-bg`
    - _Requirements: 1.1, 1.4_
  - [x] 7.2 Remove old amber/chip tokens that are no longer used
    - Remove: `amber`, `chip`, `raised`, `subtle`
    - _Requirements: 1.4_
  - [x] 7.3 Ensure all CSS variables have matching Tailwind tokens
    - Every `--vybe-*` variable in `index.css` must have a corresponding entry in the Tailwind `colors.vybe` config
    - _Requirements: 1.4_

- [x] 8. Update root App component
  - [x] 8.1 Update `webview/src/App.tsx` with new Tailwind token classes
    - Background: change `bg-[var(--vybe-bg)]` to `bg-vybe-bg`
    - Text: change `text-[var(--vybe-text)]` to `text-vybe-text`
    - _Requirements: 1.4_

- [x] 9. Update EmptyState component
  - [x] 9.1 Update `webview/src/components/EmptyState.tsx`
    - Change `text-vybe-amber` to `text-vybe-mustang-gold` for the command name highlight
    - _Requirements: 1.2, 2.1_

- [x] 10. Checkpoint — Verify build and visual consistency
  - Ensure the webview builds without errors (`npm run build` in `webview/`)
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Write optional tests
  - [x] 11.1 Write Vitest + RTL tests for ChoiceButton theme classes
    - Verify default state uses `border-vybe-border-muted` class
    - Verify correct state uses green/gold classes (not amber)
    - Verify incorrect state uses `text-vybe-error` class
    - Verify disabled state has `opacity-55` and `text-vybe-muted`
    - Verify disabled state preserves `disabled` and `aria-disabled` attributes
    - _Requirements: 2.6, 4.1, 4.2, 4.3, 5.3_
  - [x] 11.2 Write Vitest + RTL tests for FeedbackBanner theme classes
    - Verify correct state renders "✓ Correct!" with gold heading
    - Verify correct state uses green/gold border and background classes
    - Verify correct state "Next Challenge" button uses gold styling
    - Verify incorrect state renders "✗ Not quite" with error color
    - Verify incorrect state RECOVERY MODE badge renders when `isRecovering`
    - Verify "Try Easier Question" button uses green/gold styling, not red
    - _Requirements: 4.4, 4.5, 4.6_
  - [x] 11.3 Write Vitest + RTL tests for HeaderBar and XPProgressBar theme classes
    - Verify HeaderBar renders "VYBE EXPLAIN" title
    - Verify LIVE badge uses gold-on-green styling
    - Verify XPProgressBar uses gold fill class
    - _Requirements: 3.1, 3.2, 3.3_
  - [x] 11.4 Write smoke tests for theme token consistency
    - Verify CSS file defines all `--vybe-*` variables from the Cal Poly palette
    - Verify Tailwind config exposes matching token names for all CSS variables
    - Verify no component files contain hardcoded `#d6ad45` (old amber)
    - Verify no component files contain raw `red-400` or `red-500` Tailwind classes
    - _Requirements: 1.1, 1.4, 2.5_

- [-] 12. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP.
- All changes are scoped to `webview/` files only — no extension host or logic changes.
- PBT is not applicable to this feature (static CSS/class name changes only).
- Each task references specific requirements for traceability.
- Checkpoints ensure incremental validation.
- Red is preserved exclusively for error/incorrect states per Requirement 2.5.
