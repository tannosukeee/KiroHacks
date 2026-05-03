# Implementation Plan

## Stage 4: Inline Highlight Explain

- [ ] 1. Add inline explanation state service
  - [ ] 1.1 Create `src/services/inlineExplain.ts`
    - Track current editor URI, selected range, selected text, language ID, and preview explanation.
    - Ignore empty selections.
    - Ignore whitespace-only selections.
    - Ignore oversized selections.
    - Generate a mock short explanation of 30 words or fewer.
    - Do not call Gemini in this stage.
    - Do not persist selected code.
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.2, 5.2, 5.3_

  - [ ] 1.2 Add selection size constants
    - `MAX_INLINE_PREVIEW_WORDS = 30`
    - `MAX_INLINE_SELECTION_LINES = 30`
    - `MAX_INLINE_SELECTION_CHARS = 2000`
    - `INLINE_PREVIEW_DEBOUNCE_MS = 300`
    - _Requirements: 1.4, 2.2_

- [ ] 2. Listen to editor selection changes
  - [ ] 2.1 Register `vscode.window.onDidChangeTextEditorSelection` in `extension.ts` or a setup helper.
    - _Requirements: 1.1_
  - [ ] 2.2 Keep `extension.ts` thin by delegating logic to `InlineExplainService`.
    - _Requirements: 1.1_
  - [ ] 2.3 Debounce selection changes.
    - _Requirements: 1.1_
  - [ ] 2.4 If pause/snooze state exists, skip inline preview when paused.
    - _Requirements: 5.1_
  - [ ] 2.5 Never modify text in the editor.
    - _Requirements: 1.5_

- [ ] 3. Create hover provider
  - [ ] 3.1 Create `src/providers/InlineExplainHoverProvider.ts`.
    - _Requirements: 2.1, 2.5_
  - [ ] 3.2 Register a hover provider for supported languages or all file schemes.
    - _Requirements: 2.1_
  - [ ] 3.3 Return a hover only when the current hover position overlaps the tracked selected range.
    - _Requirements: 2.1_
  - [ ] 3.4 Render the short explanation.
    - _Requirements: 2.2, 2.3_
  - [ ] 3.5 Add a `Show more in Vybe Tutor` command link.
    - _Requirements: 3.1_
  - [ ] 3.6 Use `MarkdownString.isTrusted` only for the specific command link.
    - _Requirements: 3.1_

- [ ] 4. Trigger hover preview
  - [ ] 4.1 After a stable valid selection, attempt to run `vscode.commands.executeCommand("editor.action.showHover")`.
    - _Requirements: 2.1_
  - [ ] 4.2 Ensure this does not spam the user.
    - _Requirements: 2.1_
  - [ ] 4.3 Clear preview state when the selection is cleared.
    - _Requirements: 1.2_

- [ ] 5. Add Show More command
  - [ ] 5.1 Create `src/commands/showMoreFromInline.ts`.
    - _Requirements: 3.1, 3.2_
  - [ ] 5.2 Register command `vybeTutor.showMoreFromInline`.
    - _Requirements: 3.1_
  - [ ] 5.3 Command opens/focuses the Vybe Tutor sidebar.
    - _Requirements: 3.2_
  - [ ] 5.4 Command sends selected code context to the sidebar through the existing provider.
    - _Requirements: 3.3, 3.4_
  - [ ] 5.5 Command does not modify code.
    - _Requirements: 3.5_

- [ ] 6. Integrate with existing sidebar mock flow
  - [ ] 6.1 Add a method on `TutorViewProvider` such as `showInlineContext(context)`.
    - _Requirements: 3.3, 3.4, 4.4_
  - [ ] 6.2 Reuse the existing mock explanation/quiz rendering path if real tutor service is not ready.
    - _Requirements: 4.3_
  - [ ] 6.3 Ensure answer buttons, recovery mode, and Try Easier Question still work after opening from inline preview.
    - _Requirements: 4.1, 4.2, 4.3_

- [ ] 7. Add tests or manual verification
  - [ ] 7.1 Add unit tests for inline selection filtering.
    - _Requirements: 1.2, 1.3, 1.4_
  - [ ] 7.2 Add unit tests for 30-word preview limit.
    - _Requirements: 2.2_
  - [ ] 7.3 Add unit tests that oversized selections are ignored.
    - _Requirements: 1.4_
  - [ ] 7.4 Manual test: select code and confirm inline preview appears.
    - _Requirements: 2.1_
  - [ ] 7.5 Manual test: click Show More and confirm sidebar opens.
    - _Requirements: 3.2_
  - [ ] 7.6 Manual test: confirm no code is modified.
    - _Requirements: 1.5_
  - [ ] 7.7 Manual test: confirm existing quiz/game loop still works.
    - _Requirements: 4.1, 4.2, 4.3_

## Done criteria

- Highlighting code shows a short inline explanation.
- Explanation is 30 words or fewer.
- Inline preview includes `Show more in Vybe Tutor`.
- Clicking Show More opens/focuses the sidebar.
- Sidebar receives the selected code context.
- Existing sidebar quiz/game loop still works.
- No source code is modified.
- No Gemini call is required for this stage.
