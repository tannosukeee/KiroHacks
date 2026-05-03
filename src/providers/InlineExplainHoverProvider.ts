import * as vscode from 'vscode';
import { InlineExplainService } from '../services/inlineExplain';

/**
 * HoverProvider that shows a short inline explanation when the user
 * hovers over their current selection. This is a read-only learning overlay.
 * It never modifies editor text.
 */
export class InlineExplainHoverProvider implements vscode.HoverProvider {
  constructor(private readonly _inlineService: InlineExplainService) {}

  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken
  ): vscode.Hover | null {
    const preview = this._inlineService.currentPreview;

    if (!preview) {
      return null;
    }

    if (preview.uri !== document.uri.toString()) {
      return null;
    }

    if (!preview.range.contains(position)) {
      return null;
    }

    const md = new vscode.MarkdownString();
    md.isTrusted = { enabledCommands: ['vybeTutor.showMoreFromInline'] };
    md.supportHtml = false;

    md.appendMarkdown(`**🎓 Vybe Tutor**\n\n`);
    md.appendMarkdown(`${preview.preview}\n\n`);
    md.appendMarkdown(`[Show more in Vybe Tutor](command:vybeTutor.showMoreFromInline)`);

    return new vscode.Hover(md, preview.range);
  }
}
