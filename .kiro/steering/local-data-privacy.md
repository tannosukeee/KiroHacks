---
inclusion: always
---

# Local Data and Privacy

Vybe Tutor is local-first. Privacy and low-friction setup are part of the product value.

## Rules
- No required accounts.
- No Supabase.
- No cloud database by default.
- Store progress locally.
- Store API keys using VS Code SecretStorage.
- Never commit API keys, tokens, imported notes, or user code.
- Prefer selected code snippets, recently changed blocks, hovered ranges, or small relevant scopes over entire workspace ingestion.
- Make it clear to users when AI is being used.
- Provide a pause/snooze control for explanations and quizzes.
- Do not upload full files unless the user explicitly requests analysis of that file.
- Do not persist raw code snippets unless needed for a visible local history feature.
- Do not send imported course materials wholesale to Gemini; summarize or select only relevant topic snippets.

## Data that can be stored locally
- XP total
- current level
- daily streak metadata
- concept mastery scores
- recent quiz outcomes
- explanation style or skill level preference
- onboarding completion state
- imported material summaries, indexes, or local file references
- deep-dive concept signals, without storing full chat transcripts by default

## Data that should not be stored by default
- full source files
- full chat transcripts
- API keys outside SecretStorage
- institutional login credentials
- personally identifying analytics
- raw imported PDFs/DOCX/TXT contents in extension state

## AI request minimization
When building Gemini requests, include only:
- selected code, hovered range, or relevant changed block
- language ID
- filename if useful
- diagnostics if relevant
- small surrounding context window
- current concept/difficulty state when needed
- skill level or explanation depth preference when available
- concise course-material summary only if the user has imported materials and requested course connection
