import * as vscode from "vscode";

export function registerOpenTutorViewCommand(
  context: vscode.ExtensionContext
): void {
  const disposable = vscode.commands.registerCommand(
    "vybeTutor.openTutorView",
    () => {
      vscode.commands.executeCommand("vybeTutor.tutorView.focus");
    }
  );

  context.subscriptions.push(disposable);
}
