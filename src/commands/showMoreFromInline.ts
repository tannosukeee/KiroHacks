import * as vscode from 'vscode';
import { InlineExplainService } from '../services/inlineExplain';
import { TutorViewProvider } from '../views/TutorViewProvider';

/**
 * Register the showMoreFromInline command. This opens/focuses the sidebar
 * and sends the current inline preview context to it.
 * This is a read-only command. It never modifies editor text.
 */
export function registerShowMoreFromInlineCommand(
  context: vscode.ExtensionContext,
  _inlineService: InlineExplainService,
  _provider: TutorViewProvider
): void {
  const disposable = vscode.commands.registerCommand(
    'vybeTutor.showMoreFromInline',
    () => {
      // Reuse the existing explainSelection command which reads
      // the current editor selection and sends mock data to the sidebar.
      // The selection should still be active since the user clicked from hover.
      vscode.commands.executeCommand('vybeTutor.explainSelection');
    }
  );

  context.subscriptions.push(disposable);
}
