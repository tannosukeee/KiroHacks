# Requirements Document

## Introduction

Polish the existing Vybe Tutor sidebar webview UI to improve visual hierarchy, readability, and color consistency while preserving the working mock tutor/game loop. This is a cosmetic and UX refinement pass — no new product features, no extension host logic changes (unless strictly required for UI state props), and no breaking changes to the existing answer selection, XP, combo, recovery mode, or Show More behavior. All changes target webview files only.

## Glossary

- **Webview**: The React-based sidebar UI rendered inside VS Code via the TutorViewProvider.
- **HeaderBar**: The top bar component displaying the product title, streak indicator, status pill, and XP progress bar.
- **FeedbackBanner**: The component shown after a quiz answer, displaying correct/incorrect status, XP awarded, combo, hints, and action buttons.
- **ChoiceButton**: An A/B/C/D answer button component with default, correct, incorrect, and disabled visual states.
- **MockExplainPreview**: The main explanation and quiz view component rendering line reference, explanation text, code tokens, quiz choices, and feedback.
- **XPProgressBar**: The level and XP bar displayed in the header area.
- **DifficultyIndicator**: A label showing the current difficulty level with optional transition arrow.
- **CSS_Variable_System**: The set of CSS custom properties (prefixed `--vybe-`) that define the color palette and font stack for the webview.
- **Game_Loop**: The existing answer selection, XP award, combo tracking, recovery mode, difficulty adjustment, and Try Easier Question flow.
- **Color_Role**: A semantic mapping from a CSS variable name to its intended usage context (e.g., amber for reward/active/correct, red for incorrect/recovery).
- **Next_Challenge_Button**: A prominent call-to-action button shown after a correct answer, replacing the current "Continue" label.
- **Try_Easier_Question_Button**: The existing button shown after an incorrect answer that loads a lower-difficulty question.

## Requirements

### Requirement 1: Define and Register Missing CSS Variables

**User Story:** As a developer, I want all referenced CSS variables to be defined in the stylesheet, so that components render with the intended colors instead of falling back to browser defaults.

#### Acceptance Criteria

1. THE CSS_Variable_System SHALL define `--vybe-panel-raised`, `--vybe-amber-dark`, and `--vybe-chip-bg` in the `:root` selector of `webview/src/styles/index.css`.
2. WHEN a component references a `--vybe-` CSS variable, THE CSS_Variable_System SHALL resolve that variable to a defined value without relying on browser fallback behavior.

### Requirement 2: Establish Semantic Color Roles

**User Story:** As a user, I want consistent color usage across the UI, so that I can quickly distinguish rewards, errors, metadata, and reading text by color alone.

#### Acceptance Criteria

1. THE CSS_Variable_System SHALL assign amber tones (`--vybe-amber` and `--vybe-amber-dark`) exclusively to reward, active, and correct-answer contexts.
2. THE CSS_Variable_System SHALL assign red tones to incorrect-answer and recovery-mode contexts.
3. THE CSS_Variable_System SHALL assign gray tones (`--vybe-muted`, `--vybe-subtle`) to metadata, disabled elements, and secondary labels.
4. THE CSS_Variable_System SHALL assign off-white (`--vybe-text`) to primary reading text and explanation copy.
5. THE Webview SHALL maintain a dark terminal/IDE aesthetic with a dark background (`--vybe-bg`) and dark panel surfaces (`--vybe-panel`, `--vybe-raised`).

### Requirement 3: Improve Typography Hierarchy

**User Story:** As a user, I want clear visual distinction between section labels, body text, and metadata, so that I can scan the sidebar content quickly.

#### Acceptance Criteria

1. THE Webview SHALL render section labels (e.g., "QUICK CHECK · +10 XP") in uppercase, small font size, bold weight, and wide letter-spacing using `--vybe-subtle` color.
2. THE Webview SHALL render primary explanation and question text in a larger font size with relaxed line-height using `--vybe-text` color.
3. THE Webview SHALL render metadata text (e.g., line references, difficulty labels, XP counts) in a smaller font size using `--vybe-muted` or `--vybe-subtle` color.
4. THE Webview SHALL render the product title in the HeaderBar in a distinct weight and tracking that separates it from body copy.

### Requirement 4: Simplify the Header Layout

**User Story:** As a user, I want a clean, uncluttered header, so that the top bar does not feel crowded or visually noisy.

#### Acceptance Criteria

1. THE HeaderBar SHALL display the product title on the left side of the top row.
2. THE HeaderBar SHALL display the status pill (LIVE/IDLE) on the right side of the top row.
3. WHEN the streak count is greater than zero, THE HeaderBar SHALL display the streak indicator in a visually quiet style that does not compete with the product title or status pill.
4. THE HeaderBar SHALL separate the XPProgressBar onto its own row below the title row.
5. THE HeaderBar SHALL avoid displaying more than three distinct informational elements on a single horizontal line.

### Requirement 5: Reduce Emoji Visual Weight

**User Story:** As a user, I want emoji to be visually quieter, so that they do not dominate the header or distract from content.

#### Acceptance Criteria

1. WHEN the streak count is displayed, THE HeaderBar SHALL render the streak indicator using reduced opacity or smaller font size so that the emoji does not dominate the header row.
2. THE Webview SHALL limit emoji usage to at most one emoji character per visible UI section at any time.

### Requirement 6: Improve Disabled Answer Readability

**User Story:** As a user, I want to still read the text of disabled answer choices after answering, so that I can review all options.

#### Acceptance Criteria

1. WHEN a ChoiceButton is in the disabled state, THE ChoiceButton SHALL render its text at a contrast ratio that remains legible against the panel background.
2. WHEN a ChoiceButton is in the disabled state, THE ChoiceButton SHALL use a muted text color instead of applying a blanket opacity reduction to the entire button.

### Requirement 7: Improve Correct Feedback Card Hierarchy

**User Story:** As a user, I want the correct-answer feedback to clearly celebrate my success and guide me to the next action, so that I feel rewarded and know what to do next.

#### Acceptance Criteria

1. WHEN the user answers correctly, THE FeedbackBanner SHALL display a prominent "Correct" heading using amber color and bold weight.
2. WHEN the user answers correctly, THE FeedbackBanner SHALL display the XP awarded and combo count as secondary metadata below the heading.
3. WHEN the user answers correctly, THE FeedbackBanner SHALL display the quiz explanation in muted text below the metadata.
4. WHEN the user answers correctly, THE FeedbackBanner SHALL display a prominent Next_Challenge_Button labeled "Next Challenge" as the primary call-to-action.
5. THE Next_Challenge_Button SHALL use amber background or amber border styling that visually distinguishes it as the primary action in the correct feedback card.

### Requirement 8: Improve Incorrect Feedback Card Hierarchy

**User Story:** As a user, I want the incorrect-answer feedback to clearly show what went wrong and guide me toward recovery, so that I can learn from mistakes without feeling punished.

#### Acceptance Criteria

1. WHEN the user answers incorrectly, THE FeedbackBanner SHALL display a "Not quite" heading using red color and bold weight.
2. WHEN the user answers incorrectly, THE FeedbackBanner SHALL display the hint text prominently below the heading.
3. WHEN the user answers incorrectly and recovery mode is active, THE FeedbackBanner SHALL display a "RECOVERY MODE" badge using red tones.
4. WHEN the user answers incorrectly, THE FeedbackBanner SHALL display the difficulty change information as quiet metadata.
5. WHEN the user answers incorrectly, THE FeedbackBanner SHALL display the Try_Easier_Question_Button as a clearly visible secondary action.

### Requirement 9: Preserve Existing Game Loop Behavior

**User Story:** As a user, I want all existing game mechanics to continue working after the UI polish, so that my learning progress is not disrupted.

#### Acceptance Criteria

1. WHEN the user selects an answer choice, THE MockExplainPreview SHALL invoke the same answer processing logic (processCorrectAnswer or processWrongAnswer) as before the UI polish.
2. WHEN the user clicks the Try_Easier_Question_Button after an incorrect answer, THE MockExplainPreview SHALL load a new question at the adjusted difficulty level.
3. WHEN the user clicks the Next_Challenge_Button after a correct answer, THE MockExplainPreview SHALL load a new question at the same or higher difficulty level.
4. THE Game_Loop SHALL continue to track and display XP, combo, streak, level, recovery mode, and difficulty transitions without regression.
5. WHEN a ChoiceButton is in the disabled, correct, or incorrect state, THE ChoiceButton SHALL not respond to click events.

### Requirement 10: Maintain Keyboard Accessibility

**User Story:** As a user navigating with a keyboard, I want all interactive elements to remain focusable and operable, so that I can use the sidebar without a mouse.

#### Acceptance Criteria

1. THE ChoiceButton SHALL remain focusable via keyboard Tab navigation in the default state.
2. THE Next_Challenge_Button SHALL be focusable via keyboard Tab navigation when visible.
3. THE Try_Easier_Question_Button SHALL be focusable via keyboard Tab navigation when visible.
4. WHEN a ChoiceButton is in the disabled state, THE ChoiceButton SHALL be skipped during keyboard Tab navigation or clearly indicate its disabled status to assistive technology.

### Requirement 11: Scope Changes to Webview Files

**User Story:** As a developer, I want UI polish changes confined to webview files, so that extension host logic and game state logic remain untouched and stable.

#### Acceptance Criteria

1. THE UI polish changes SHALL modify only files within the `webview/` directory.
2. IF a change to a file outside `webview/` is required for a UI state prop, THEN THE change SHALL be limited to adding or exposing a read-only property and SHALL NOT alter game state computation logic.
3. THE UI polish changes SHALL NOT add Gemini integration, storage persistence, adaptive engine logic, file import, deep dive, or any new product feature.

### Requirement 12: No Image Assets Except Optional Logo

**User Story:** As a developer, I want the UI to remain lightweight and text-driven, so that the extension stays small and loads quickly.

#### Acceptance Criteria

1. THE Webview SHALL NOT introduce new image assets except for an optional small logo or icon (maximum 64x64 pixels).
2. THE Webview SHALL use text characters, CSS borders, and CSS backgrounds for all visual indicators (checkmarks, crosses, badges, pills).
