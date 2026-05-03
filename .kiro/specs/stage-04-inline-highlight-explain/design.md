# Design Document

## Overview

Stage 4 adds a lightweight inline explanation preview for selected code. The feature listens for editor selection changes, creates a short explanation preview, and exposes a `Show more in Vybe Tutor` action that routes the selected code to the sidebar.

Because VS Code does not support arbitrary custom HTML popovers above text selection, the preferred implementation uses a VS Code-native hover-like flow:

```text
selection change
  -> capture selected range and code
  -> create short mock explanation
  -> HoverProvider returns explanation for current selection
  -> trigger editor.action.showHover when appropriate
  -> command link opens sidebar for full explanation
```

Alternative fallback: Use CodeLens above the selected line if hover behavior is unreliable. Use editor decorations only for subtle highlighting; do not use decorations as the main action UI because they cannot provide rich interactive buttons.

This is a read-only learning overlay. Never edit the user's code.

## Architecture

```text
src/
  extension.ts
  commands/
    showMoreFromInline.ts
  services/
    inlineExplain.ts
    context.ts
  providers/
    InlineExplainHoverProvider.ts
  views/
    TutorViewProvider.ts
```

## Component responsibilities

### InlineExplainService (`src/services/inlineExplain.ts`)

Responsible for:
- tracking current selected code
- ignoring empty or oversized selections
- generating or retrieving a 30-word-or-less preview
- exposing current inline preview state to the hover provider
- clearing preview state when selection changes or editor changes

### InlineExplainHoverProvider (`src/providers/InlineExplainHoverProvider.ts`)

Responsible for:
- returning a VS Code Hover only when the hover position overlaps the current selected range
- rendering a short explanation
- rendering a trusted command link for `Show more in Vybe Tutor`
- avoiding expensive work inside the hover provider

### showMoreFromInline command (`src/commands/showMoreFromInline.ts`)

Responsible for:
- opening/focusing the Vybe Tutor sidebar
- sending the selected code context to the sidebar
- triggering the existing mock explanation path or full explanation path depending on current implementation
- never modifying editor content

### TutorViewProvider

Responsible for:
- receiving inline-selected code context
- rendering or forwarding that context into the existing sidebar explanation flow
- keeping existing quiz/game loop behavior intact

## Inline preview content

The inline preview should follow this shape:

```
Short explanation, max 30 words.

[Show more in Vybe Tutor]
```

Example:

```
This method call creates a Foo object and invokes call(), returning a Boolean result based on the event-processing logic.

Show more in Vybe Tutor
```

## Selection limits

Recommended limits:
- minimum selection: 1 non-whitespace character
- maximum selection: 30 lines or 2,000 characters for preview
- if selection is larger, do not auto-preview; ask the user to use the sidebar command instead

## Trigger behavior

Preferred:
- debounce selection changes by 300-500ms
- only show preview for stable selection
- do not trigger repeatedly while the user is dragging selection
- do not trigger when the user has paused/snoozed Vybe Tutor

## Visual behavior

Use VS Code-native hover styling. Do not try to force the mockup sidebar visual style into the editor hover.

The hover should feel like a concise learning tooltip:
- short title or concept label
- one short explanation
- one action link

## Safety

This feature must never call:
- `TextEditor.edit`
- `WorkspaceEdit`
- formatting commands
- code action apply commands
- file write APIs

This feature is read-only.
