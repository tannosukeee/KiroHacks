# Requirements Document

## Introduction

Stage 6 rethemes the Vybe Tutor sidebar to better match a Cal Poly / Mustangs-inspired color direction while preserving the existing dark terminal-style UI. This stage makes the interface feel more golden and green without changing any tutor logic.

This is a visual-only stage. It does not change Gemini integration, storage, adaptive logic, inline hover behavior, command routing, or quiz/game functionality.

## Glossary

- **Webview**: The React-based sidebar UI rendered inside VS Code, located in the `webview/` directory.
- **Color_Token**: A CSS custom property (e.g., `--vybe-green`) or Tailwind token (e.g., `text-vybe-green`) that maps a semantic name to a hex color value.
- **Theme_System**: The set of CSS custom properties defined in `:root` of `webview/src/styles/index.css` and the corresponding Tailwind color config in `webview/tailwind.config.js`.
- **Header**: The `HeaderBar` component displaying the product title, status badge, streak, and XP progress bar.
- **Feedback_Banner**: The `FeedbackBanner` component that renders correct-answer or incorrect-answer feedback after a quiz response.
- **Choice_Button**: The `ChoiceButton` component rendering an individual A/B/C/D answer option.
- **Recovery_Mode**: The game state entered after an incorrect answer, where difficulty drops and the learner works back up.
- **Poly_Green**: Cal Poly green (#154734).
- **Mustang_Gold**: Cal Poly gold (#BD8B13).
- **Stadium_Gold**: A soft warm gold (#F8E08E).
- **Poly_Canyon**: A bright gold (#F2C75C).
- **Farmers_Market_Green**: A vivid green (#3A913F).
- **Dexter_Green**: A bright lime green (#A4D65E).
- **Seal_Gray**: A neutral dark gray (#54585A).
- **Kennedy_Gray**: A warm medium gray (#8E9089).

## Requirements

### Requirement 1: Apply Cal Poly-inspired color system

**User Story:** As a designer, I want the sidebar colors to feel more Cal Poly / Mustangs inspired, so that the product feels connected to the hackathon and campus identity.

#### Acceptance Criteria

1. THE Theme_System SHALL define shared Color_Tokens for Poly_Green (#154734), Mustang_Gold (#BD8B13), Stadium_Gold (#F8E08E), Poly_Canyon (#F2C75C), Farmers_Market_Green (#3A913F), Dexter_Green (#A4D65E), Seal_Gray (#54585A), Kennedy_Gray (#8E9089), background, card, border, text, muted text, and error red.
2. THE color palette SHALL lean more green and gold than the current charcoal and amber palette.
3. THE Webview SHALL preserve the dark IDE/terminal aesthetic.
4. THE Theme_System SHALL centralize color definitions in CSS custom properties and Tailwind config rather than using scattered hardcoded color values in components.
5. THE Webview SHALL not use official Cal Poly logos or trademarked assets unless already approved by the team.

### Requirement 2: Use color roles consistently

**User Story:** As a learner, I want color to communicate meaning consistently, so that the interface is easier to understand.

#### Acceptance Criteria

1. THE Theme_System SHALL assign Mustang_Gold as the primary emphasis color for XP displays, progress bar fill, selected answer highlights, and primary buttons.
2. THE Theme_System SHALL assign Poly_Green as the color for panel backgrounds, success-state backgrounds, borders, and secondary emphasis.
3. THE Theme_System SHALL assign bright or soft gold tones (Poly_Canyon or Stadium_Gold) for highlights, badges, and subtle glow effects.
4. THE Theme_System SHALL assign green tones (Farmers_Market_Green or Dexter_Green) for success states such as correct answers, combo indicators, and completed challenges.
5. THE Theme_System SHALL reserve red for incorrect answers and Recovery_Mode warning states.
6. THE Theme_System SHALL assign gray tones (Seal_Gray or Kennedy_Gray) for metadata, disabled answers, inactive borders, and dividers.

### Requirement 3: Improve header theming

**User Story:** As a learner, I want the header to feel polished and branded, so that the sidebar feels intentional.

#### Acceptance Criteria

1. THE Header SHALL continue to display the text "VYBE EXPLAIN".
2. WHEN the sidebar is active, THE Header SHALL display the LIVE/IDLE badge using a gold or green treatment consistent with the Cal Poly theme.
3. THE XPProgressBar SHALL use green and gold colors, with a gold fill on a green track.
4. THE Header SHALL display the level label visually connected to the progress bar.
5. THE Header SHALL display the streak indicator in a readable and visually quiet style.
6. THE Header SHALL not become more visually crowded than the current layout.

### Requirement 4: Retheme quiz and feedback states

**User Story:** As a learner, I want answers and feedback to be visually clear, so that I know what happened and what to do next.

#### Acceptance Criteria

1. WHEN a correct answer is selected, THE Choice_Button SHALL use green and gold success styling.
2. WHEN an incorrect answer is selected, THE Choice_Button SHALL use a red error border or red text to indicate the mistake.
3. WHILE answers are disabled after submission, THE Choice_Button SHALL remain readable with approximately 0.55 opacity, a muted border, and legible text.
4. WHEN a correct answer is submitted, THE Feedback_Banner SHALL display celebratory styling using green and gold (deep green card background, gold accent, success border).
5. WHEN Recovery_Mode is active, THE Feedback_Banner SHALL use red sparingly and apply green or gold styling to the next-action buttons.
6. THE "Try Easier Question" and "Next Challenge" buttons SHALL use the Cal Poly theme tokens (green and gold) rather than red styling.

### Requirement 5: Preserve existing behavior

**User Story:** As a developer, I want visual changes to avoid breaking the working tutor loop.

#### Acceptance Criteria

1. WHEN the user triggers "Explain Selection", THE Webview SHALL load the sidebar explanation.
2. WHEN the user triggers "Show More" from inline hover, THE Webview SHALL load the sidebar explanation.
3. WHEN the user clicks an answer choice, THE Choice_Button SHALL register the selection and trigger feedback.
4. WHEN a correct answer is submitted, THE Webview SHALL award XP and update the combo counter.
5. WHEN an incorrect answer is submitted, THE Webview SHALL enter Recovery_Mode.
6. WHEN the user clicks "Try Easier Question", THE Webview SHALL load an easier question.
7. WHEN the user clicks "Next Challenge", THE Webview SHALL load another question.
8. THE retheme SHALL not modify any editor text or extension host logic.

## Non-goals

- No Gemini integration changes.
- No storage or persistence changes.
- No adaptive engine logic changes.
- No file import functionality.
- No deep dive implementation.
- No official Cal Poly logo usage.
- No new product features beyond the visual retheme.
