import * as vscode from "vscode";
import { registerExplainSelectionCommand } from "./commands/explainSelection";
import { registerOpenTutorViewCommand } from "./commands/openTutorView";
import { getTutorResponse } from "./ai/geminiService";
import { TutorViewProvider } from "./views/TutorViewProvider";

export function activate(context: vscode.ExtensionContext): void {
  const provider = new TutorViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      TutorViewProvider.viewType,
      provider
    )
  );

  provider.onDidReceiveMessage(async (message) => {
    if (message.type === "requestTutorResponse") {
      provider.postMessage({
        type: "loading",
        payload: { isLoading: true },
      });

      try {
        const response = await getTutorResponse({
          context,
          selectedCode: message.payload.selectedCode,
          languageId: message.payload.languageId,
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
            message: "Vybe Tutor could not generate an explanation. Try again.",
          },
        });
      } finally {
        provider.postMessage({
          type: "loading",
          payload: { isLoading: false },
        });
      }
    }

    if (message.type === "submitQuizAnswer") {
      console.log("[Vybe Tutor] Quiz answer:", message.payload);
    }
  });

  registerOpenTutorViewCommand(context);
  registerExplainSelectionCommand(context, provider);
}

export function deactivate(): void {}
