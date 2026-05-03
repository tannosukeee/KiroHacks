import * as vscode from "vscode";
import { registerExplainSelectionCommand } from "./commands/explainSelection";
import { registerOpenTutorViewCommand } from "./commands/openTutorView";
import { registerShowMoreFromInlineCommand } from "./commands/showMoreFromInline";
import { getTutorResponse } from "./ai/geminiService";
import { TutorViewProvider } from "./views/TutorViewProvider";
import { InlineExplainService } from "./services/inlineExplain";
import { InlineExplainHoverProvider } from "./providers/InlineExplainHoverProvider";

export function activate(context: vscode.ExtensionContext): void {
  const provider = new TutorViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      TutorViewProvider.viewType,
      provider
    )
  );

  // --- Inline Explain (Stage 4) ---
  const inlineService = new InlineExplainService();
  const hoverProvider = new InlineExplainHoverProvider(inlineService);

  // Register hover provider for all file-scheme documents
  context.subscriptions.push(
    vscode.languages.registerHoverProvider({ scheme: 'file' }, hoverProvider)
  );

  // Listen for selection changes, debounce, and trigger hover
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection((event) => {
      inlineService.handleSelectionChange(event, () => {
        vscode.commands.executeCommand('editor.action.showHover');
      });
    })
  );

  // Clean up inline service on deactivate
  context.subscriptions.push({ dispose: () => inlineService.dispose() });

  // Register Show More from Inline command
  registerShowMoreFromInlineCommand(context, inlineService, provider);

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
