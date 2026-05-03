import * as vscode from 'vscode';
import { TutorViewProvider } from './views/TutorViewProvider';
import { registerOpenTutorViewCommand } from './commands/openTutorView';
import { registerExplainSelectionCommand } from './commands/explainSelection';

export function activate(context: vscode.ExtensionContext) {
  const provider = new TutorViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      TutorViewProvider.viewType,
      provider
    )
  );

  registerOpenTutorViewCommand(context);
  registerExplainSelectionCommand(context, provider);
}

export function deactivate() {}