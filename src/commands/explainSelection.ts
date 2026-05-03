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

    if (!selectedText) {
      vscode.window.showInformationMessage('Vybe Tutor: Select some code first.');
      return;
    }

    // Stage 1: Send mock explanation to webview
    provider.postMessage({
      type: 'mockExplanation',
      data: {
        concept: 'placeholder',
        lineReference: 'Selected code',
        explanation: 'This is a placeholder explanation. Gemini integration coming in a later stage.',
        codeTokens: ['placeholder'],
      },
    });

    vscode.commands.executeCommand('vybeTutor.tutorView.focus');
  });
  context.subscriptions.push(disposable);
}
