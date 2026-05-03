import * as vscode from 'vscode';
import { TutorViewProvider } from '../views/TutorViewProvider';

export function registerExplainSelectionCommand(
  context: vscode.ExtensionContext,
  provider: TutorViewProvider
): void {
  const disposable = vscode.commands.registerCommand('vybeTutor.explainSelection', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('Vybe Tutor: Select some code first.');
      return;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    if (!selectedText || selectedText.trim().length === 0) {
      vscode.window.showInformationMessage('Vybe Tutor: Select some code first.');
      return;
    }

    const languageId = editor.document.languageId;
    const fileName = editor.document.fileName.split(/[\\/]/).pop() || 'unknown';
    const startLine = selection.start.line + 1;

    // Stage 2: Build mock TutorResponse with real metadata
    const mockResponse = buildMockTutorResponse(selectedText, languageId, fileName, startLine);

    // Focus sidebar first, then send data
    vscode.commands.executeCommand('vybeTutor.tutorView.focus').then(() => {
      setTimeout(() => {
        provider.postMessage({
          type: 'mockExplanation',
          data: mockResponse,
        });
      }, 100);
    });
  });
  context.subscriptions.push(disposable);
}

interface MockTutorResponse {
  concept: string;
  lineReference: string;
  explanation: string;
  codeTokens: string[];
  language: string;
  fileName: string;
  quiz: {
    question: string;
    choices: string[];
    correctAnswerIndex: number;
    hint: string;
    explanation: string;
  };
}

function buildMockTutorResponse(
  _selectedText: string,
  languageId: string,
  fileName: string,
  startLine: number
): MockTutorResponse {
  const mocksByLanguage: Record<string, MockTutorResponse> = {
    python: {
      concept: '@cache decorator',
      lineReference: `Line ${startLine} · ${fileName}`,
      explanation:
        'The @cache decorator from functools stores the results of expensive function calls. When the same arguments are passed again, it returns the cached result instead of recomputing.',
      codeTokens: ['@cache', 'functools', 'memoization'],
      language: languageId,
      fileName,
      quiz: {
        question: 'What does @cache do when the same arguments are passed again?',
        choices: [
          'Raises a TypeError',
          'Returns the cached result without recomputing',
          'Deletes the previous result',
          'Calls the function twice for verification',
        ],
        correctAnswerIndex: 1,
        hint: 'Think about what "caching" means — storing something for later reuse.',
        explanation:
          '@cache stores previously computed results. When the same input appears again, it skips the function body and returns the stored value.',
      },
    },
    typescript: {
      concept: 'async/await pattern',
      lineReference: `Line ${startLine} · ${fileName}`,
      explanation:
        'The async/await pattern lets you write asynchronous code that reads like synchronous code. An async function always returns a Promise, and await pauses execution until that Promise resolves.',
      codeTokens: ['async', 'await', 'Promise'],
      language: languageId,
      fileName,
      quiz: {
        question: 'What does an async function always return?',
        choices: [
          'undefined',
          'A callback function',
          'A Promise',
          'The raw value directly',
        ],
        correctAnswerIndex: 2,
        hint: 'Even if you return a plain value, the runtime wraps it automatically.',
        explanation:
          'An async function always returns a Promise. If you return a value, it gets wrapped in Promise.resolve() automatically.',
      },
    },
    javascript: {
      concept: 'array destructuring',
      lineReference: `Line ${startLine} · ${fileName}`,
      explanation:
        'Array destructuring lets you unpack values from arrays into distinct variables. The syntax uses square brackets on the left side of an assignment.',
      codeTokens: ['const', '[]', 'destructuring'],
      language: languageId,
      fileName,
      quiz: {
        question: 'Which syntax correctly destructures the first two elements of an array?',
        choices: [
          'const {a, b} = arr',
          'const [a, b] = arr',
          'const a, b = arr[0], arr[1]',
          'const (a, b) = arr',
        ],
        correctAnswerIndex: 1,
        hint: 'Array destructuring uses square brackets, not curly braces.',
        explanation:
          'const [a, b] = arr unpacks the first two elements. Curly braces {} are for object destructuring.',
      },
    },
  };

  const fallback: MockTutorResponse = {
    concept: 'code structure',
    lineReference: `Line ${startLine} · ${fileName}`,
    explanation:
      'This code defines a block of logic. Understanding how each part connects helps you reason about the program flow and catch bugs early.',
    codeTokens: ['function', 'variable', 'logic'],
    language: languageId,
    fileName,
    quiz: {
      question: 'Why is it helpful to understand code structure before modifying it?',
      choices: [
        'It makes the code run faster',
        'It helps you reason about program flow and catch bugs',
        'It is required by the compiler',
        'It automatically fixes syntax errors',
      ],
      correctAnswerIndex: 1,
      hint: "Think about what happens when you change code you don't fully understand.",
      explanation:
        'Understanding structure helps you predict how changes will affect behavior, making it easier to find and prevent bugs.',
    },
  };

  return mocksByLanguage[languageId] || fallback;
}
