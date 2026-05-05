# Requirements Document

## Introduction

Stage 4 adds an inline explanation preview when the learner highlights code in the editor. The preview should appear near the selected code, explain the code in 30 words or fewer, and provide a `Show more in Vybe Tutor` action that opens the sidebar for a deeper explanation.

This feature must not modify source code. It is a read-only learning overlay only.

## Requirement 1: Detect highlighted code

**User Story:** As a learner, I want Vybe Tutor to notice when I highlight code, so that I can quickly understand a snippet without leaving the editor.

### Acceptance Criteria

1. WHEN the user selects code in the active editor, THE Extension_Host SHALL detect the selection.
2. WHEN the selection is empty, THE Extension_Host SHALL do nothing.
3. WHEN the selected text is whitespace only, THE Extension_Host SHALL do nothing.
4. WHEN the selected text is larger than the configured maximum preview size, THE Extension_Host SHALL avoid generating a preview and MAY show a small message asking for a smaller selection.
5. THE feature SHALL not alter, insert, delete, format, or rewrite any editor text.

## Requirement 2: Show short inline explanation

**User Story:** As a learner, I want a short explanation to appear near the highlighted code, so that I can understand the snippet quickly.

### Acceptance Criteria

1. WHEN valid code is selected, THE extension SHALL show a short inline explanation near the selected code.
2. THE explanation SHALL be 30 words or fewer.
3. THE explanation SHALL be plain-language and beginner-friendly by default.
4. THE explanation SHALL not reveal full assignment solutions or rewrite the code.
5. THE explanation SHALL use VS Code-native UI such as HoverProvider, command hover, CodeLens, or decoration-supported preview behavior.
6. THE preview SHALL work without requiring the user to open a browser or localhost page.

## Requirement 3: Provide Show More action

**User Story:** As a learner, I want to open a deeper explanation from the inline preview, so that I can learn more in the sidebar.

### Acceptance Criteria

1. THE inline preview SHALL include a `Show more in Vybe Tutor` action.
2. WHEN the user activates `Show more in Vybe Tutor`, THE extension SHALL open or focus the Vybe Tutor sidebar.
3. THE extension SHALL send the selected code context to the sidebar.
4. THE sidebar SHALL show the existing mock or real explanation flow depending on what the current implementation supports.
5. THE action SHALL not modify the selected code.

## Requirement 4: Preserve existing tutor behavior

**User Story:** As a developer, I want this feature to avoid breaking the existing sidebar quiz/game loop, so that the MVP remains stable.

### Acceptance Criteria

1. THE existing `Vybe Tutor: Open Tutor View` command SHALL continue to work.
2. THE existing `Vybe Tutor: Explain Selection` command SHALL continue to work.
3. THE sidebar SHALL still render the explanation, quick check, answer states, feedback, XP, and recovery UI.
4. THE inline preview SHALL reuse existing context extraction where possible.
5. THE inline preview SHALL not introduce Gemini, storage, adaptive, or gamification side effects unless those services already exist and are intentionally called.

## Requirement 5: Respect pause/snooze and privacy

**User Story:** As a learner, I want inline explanations to respect my focus and privacy settings, so that the extension does not interrupt me unexpectedly.

### Acceptance Criteria

1. IF the tutor is paused or snoozed, THE inline preview SHALL not auto-display explanations.
2. THE extension SHALL not persist raw selected code for the inline preview.
3. THE extension SHALL not send selected code to Gemini during this stage if the feature is implemented as mock/local.
4. THE feature SHALL include clear boundaries so future Gemini usage stays inside the extension host, not the webview.

## Non-goals

- No source code modification.
- No automatic code fixing.
- No code insertion.
- No document edits.
- No new database.
- No file import.
- No deep-dive chat UI beyond opening/focusing the existing sidebar.
- No full custom HTML popup inside the editor.
