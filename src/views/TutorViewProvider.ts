import * as vscode from "vscode";
import {
  HostToWebviewMessage,
  HostToWebviewMessageSchema,
  WebviewToHostMessage,
  WebviewToHostMessageSchema,
} from "../shared/contracts";

type MessageHandler = (message: WebviewToHostMessage) => void;

export class TutorViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "vybeTutor.tutorView";

  private view?: vscode.WebviewView;
  private readonly handlers: MessageHandler[] = [];
  private readonly pendingMessages: HostToWebviewMessage[] = [];

  public constructor(private readonly extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView): void {
    this.view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    };

    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((rawMessage: unknown) => {
      const parsed = WebviewToHostMessageSchema.safeParse(rawMessage);

      if (!parsed.success) {
        console.warn("[Vybe Tutor] Ignoring invalid webview message.");
        return;
      }

      if (parsed.data.type === "ready") {
        this.flushPendingMessages();
      }

      this.handlers.forEach((handler) => handler(parsed.data));
    });

    this.flushPendingMessages();
  }

  public postMessage(message: HostToWebviewMessage): void {
    const parsed = HostToWebviewMessageSchema.safeParse(message);

    if (!parsed.success) {
      console.warn("[Vybe Tutor] Ignoring invalid host message.");
      return;
    }

    if (!this.view) {
      this.pendingMessages.push(parsed.data);
      return;
    }

    this.view.webview.postMessage(parsed.data);
  }

  public onDidReceiveMessage(handler: MessageHandler): void {
    this.handlers.push(handler);
  }

  private flushPendingMessages(): void {
    if (!this.view) {
      return;
    }

    while (this.pendingMessages.length > 0) {
      const message = this.pendingMessages.shift();

      if (message) {
        this.view.webview.postMessage(message);
      }
    }
  }

  private getHtmlForWebview(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "dist", "webview", "index.js")
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "dist", "webview", "index.css")
    );
    const nonce = getNonce();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">
  <link rel="stylesheet" href="${styleUri}">
  <title>Vybe Tutor</title>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
  }
}

function getNonce(): string {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";

  for (let index = 0; index < 32; index += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
