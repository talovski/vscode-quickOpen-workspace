import * as vscode from "vscode";

import { findRootDir } from "./utils";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("quickOpen.workspace", async () => {
      const activeFilePath =
        vscode.window.activeTextEditor?.document.uri.fsPath;

      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

      if (!workspaceFolder || !activeFilePath) {
        vscode.commands.executeCommand("workbench.action.quickOpen");

        return;
      }

      const rootPath = findRootDir(activeFilePath);

      if (!rootPath) {
        vscode.commands.executeCommand("workbench.action.quickOpen");

        return;
      }

      const searchPath = `${rootPath}/`.replace(
        `${workspaceFolder.uri.fsPath}/`,
        "",
      );

      vscode.commands.executeCommand("workbench.action.quickOpen", searchPath);
    }),
  );
}
