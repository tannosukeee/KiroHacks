---
inclusion: fileMatch
fileMatchPattern: "src/services/materials.ts,src/schemas/materials.ts,src/prompts/**,webview/src/components/*Import*,webview/src/components/*Coursework*,data/**,tests/unit/materials.test.ts"
---

# File Import and Course Material Integration

Course-material import is a should-have feature, not part of the first core loop. It should personalize explanations without creating privacy or scope problems.

## Supported file types
For v1-style local import, support some or all of:
- PDF
- DOCX
- TXT

Canvas OAuth is future work and should not be implemented for the hackathon MVP.

## Product behavior
- Users can import a syllabus, lecture notes, or course outline.
- Vybe Tutor summarizes or indexes the material locally.
- Explanations can show a `Relate to my coursework` action when relevant material exists.
- Gemini prompts should receive only a concise relevant topic summary, not the full raw file.
- Imported materials can influence explanation framing and quiz topics, but should not override local adaptive difficulty rules.

## Data rules
- Do not commit imported files.
- Do not store raw imported file contents in `globalState` or `workspaceState` by default.
- Store local file references, extracted topic summaries, or lightweight indexes.
- Keep imported material state workspace-specific unless the user explicitly chooses otherwise.

## Suggested local schema

```ts
type ImportedMaterialSummary = {
  id: string;
  fileName: string;
  fileType: "pdf" | "docx" | "txt";
  importedAt: string;
  topics: string[];
  summary: string;
  conceptTags: string[];
};
```

## Optional local datasets
Local datasets are optional and should live in `/data`. Possible datasets:
- Intro programming concepts.
- Common compiler/runtime errors.
- Starter quiz templates.
- Concept prerequisite graph.
- Cal Poly intro CS topic map if available.

## Dataset entry shape
Dataset entries should include:
- concept
- difficulty
- language
- prompt
- answer
- explanation
- tags

## MVP boundary
Do not implement file import until the core loop works: `code context -> explanation -> quiz -> feedback -> adaptive difficulty -> XP/streak -> local persistence`.
