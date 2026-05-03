import * as vscode from 'vscode';

// Selection size limits
export const MAX_INLINE_SELECTION_LINES = 30;
export const MAX_INLINE_SELECTION_CHARS = 2000;
export const MAX_INLINE_PREVIEW_WORDS = 30;
export const INLINE_PREVIEW_DEBOUNCE_MS = 400;

export interface InlinePreviewState {
  uri: string;
  range: vscode.Range;
  selectedText: string;
  languageId: string;
  fileName: string;
  preview: string;
}

/**
 * InlineExplainService tracks the current editor selection and generates
 * a short mock explanation preview. This is a read-only learning overlay.
 * It never modifies editor text.
 */
export class InlineExplainService {
  private _currentPreview: InlinePreviewState | null = null;
  private _debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private _paused = false;

  get currentPreview(): InlinePreviewState | null {
    return this._currentPreview;
  }

  get isPaused(): boolean {
    return this._paused;
  }

  setPaused(paused: boolean): void {
    this._paused = paused;
    if (paused) {
      this.clearPreview();
    }
  }

  clearPreview(): void {
    this._currentPreview = null;
  }

  /**
   * Handle a selection change event. Debounces and validates before
   * generating a preview. Calls callback if a valid preview was generated.
   */
  handleSelectionChange(
    event: vscode.TextEditorSelectionChangeEvent,
    callback: () => void
  ): void {
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
    }

    this._debounceTimer = setTimeout(() => {
      const result = this._processSelection(event.textEditor);
      if (result) {
        callback();
      }
    }, INLINE_PREVIEW_DEBOUNCE_MS);
  }

  private _processSelection(editor: vscode.TextEditor): boolean {
    if (this._paused) {
      this.clearPreview();
      return false;
    }

    const selection = editor.selection;

    if (selection.isEmpty) {
      this.clearPreview();
      return false;
    }

    const selectedText = editor.document.getText(selection);

    if (!selectedText || selectedText.trim().length === 0) {
      this.clearPreview();
      return false;
    }

    const lineCount = selection.end.line - selection.start.line + 1;
    if (lineCount > MAX_INLINE_SELECTION_LINES || selectedText.length > MAX_INLINE_SELECTION_CHARS) {
      this.clearPreview();
      return false;
    }

    const languageId = editor.document.languageId;
    const fileName = editor.document.fileName.split(/[\\/]/).pop() || 'unknown';

    const preview = generateMockPreview(selectedText, languageId);

    this._currentPreview = {
      uri: editor.document.uri.toString(),
      range: new vscode.Range(selection.start, selection.end),
      selectedText,
      languageId,
      fileName,
      preview,
    };

    return true;
  }

  dispose(): void {
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
    }
    this.clearPreview();
  }
}

/**
 * Generate a short mock explanation of 30 words or fewer.
 * This is a read-only preview. It never modifies code.
 */
export function generateMockPreview(selectedText: string, languageId: string): string {
  const trimmed = selectedText.trim();

  if (languageId === 'python') {
    if (trimmed.includes('def ')) {
      return 'This defines a Python function. Functions group reusable logic and accept parameters to produce a return value.';
    }
    if (trimmed.includes('class ')) {
      return 'This defines a Python class. Classes bundle data and behavior together using attributes and methods.';
    }
    if (trimmed.includes('import ')) {
      return 'This imports a module, making external functionality available in this file.';
    }
    if (trimmed.includes('for ') || trimmed.includes('while ')) {
      return 'This loop repeats a block of code. Each iteration processes the next item or checks the condition again.';
    }
    if (trimmed.includes('@')) {
      return 'This decorator wraps the function below it, adding behavior before or after the original function runs.';
    }
    return 'This Python code defines logic that processes data. Understanding each part helps you trace the program flow.';
  }

  if (languageId === 'typescript' || languageId === 'javascript') {
    if (trimmed.includes('async ') || trimmed.includes('await ')) {
      return 'This uses async/await for asynchronous operations. The function returns a Promise and await pauses until it resolves.';
    }
    if (trimmed.includes('function ') || trimmed.includes('=>')) {
      return 'This defines a function that encapsulates reusable logic. It accepts inputs and returns a result.';
    }
    if (trimmed.includes('class ')) {
      return 'This defines a class with properties and methods, providing a blueprint for creating objects.';
    }
    if (trimmed.includes('import ')) {
      return 'This imports modules or named exports, making external code available in this file.';
    }
    if (trimmed.includes('interface ') || trimmed.includes('type ')) {
      return 'This defines a TypeScript type describing the shape of data, helping catch errors at compile time.';
    }
    return 'This code defines logic for your application. Each statement contributes to the overall program behavior.';
  }

  if (languageId === 'java') {
    if (trimmed.includes('class ')) {
      return 'This defines a Java class, the building block of Java programs containing fields and methods.';
    }
    return 'This Java code defines program logic. Understanding the class structure helps you navigate the codebase.';
  }

  return 'This code block defines program logic. Understanding how each part connects helps you reason about behavior.';
}

/**
 * Check if a preview string is within the word limit.
 */
export function isWithinWordLimit(text: string, maxWords: number = MAX_INLINE_PREVIEW_WORDS): boolean {
  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  return wordCount <= maxWords;
}
