import * as vscode from "vscode";
import { getTutorResponse } from "../ai/geminiService";
import { TutorViewProvider } from "../views/TutorViewProvider";

export function registerExplainSelectionCommand(
  context: vscode.ExtensionContext,
  provider: TutorViewProvider
): void {
  const disposable = vscode.commands.registerCommand(
    "vybeTutor.explainSelection",
    async () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showInformationMessage(
          "Vybe Tutor: Open a file and select some code first."
        );
        return;
      }

      const selectedCode = editor.document.getText(editor.selection).trim();

      if (!selectedCode) {
        vscode.window.showInformationMessage(
          "Vybe Tutor: Select some code first."
        );
        return;
      }

      await vscode.commands.executeCommand("vybeTutor.tutorView.focus");

      provider.postMessage({
        type: "loading",
        payload: { isLoading: true },
      });

      try {
        const response = await getTutorResponse({
          context,
          selectedCode,
          languageId: editor.document.languageId,
          useMock: true,
        });

        provider.postMessage({
          type: "tutorResponse",
          payload: response,
        });
      } catch {
        provider.postMessage({
          type: "error",
          payload: {
            message: "Vybe Tutor could not explain that selection. Try again.",
          },
        });
      } finally {
        provider.postMessage({
          type: "loading",
          payload: { isLoading: false },
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}
