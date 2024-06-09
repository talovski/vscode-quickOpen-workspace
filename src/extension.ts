import * as vscode from "vscode";

import { findRootDir } from "./utils";

function findSearchPath(
  editor: vscode.TextEditor,
  action: "quickOpen" | "findInFiles"
) {
  const activeFilePath = vscode.window.activeTextEditor?.document.uri.fsPath;
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

  const fallbackAction =
    action === "quickOpen"
      ? "workbench.action.quickOpen"
      : "workbench.action.findInFiles";

  if (!workspaceFolder || !activeFilePath) {
    vscode.commands.executeCommand(fallbackAction);

    return;
  }

  const rootPath = findRootDir(activeFilePath);

  if (!rootPath) {
    vscode.commands.executeCommand(fallbackAction);

    return;
  }

  const searchPath = `${rootPath}/`.replace(
    `${workspaceFolder.uri.fsPath}/`,
    ""
  );

  return searchPath;
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "monorepoNavigator.quickOpen",
      cmdOpenFileInRelativeWorkspace
    ),
    vscode.commands.registerTextEditorCommand(
      "monorepoNavigator.findInFiles",
      cmdFindInFilesInRelativeWorkspace
    )
  );
}

function cmdOpenFileInRelativeWorkspace(
  editor: vscode.TextEditor,
  _edit: vscode.TextEditorEdit
) {
  const path = findSearchPath(editor, "quickOpen");
  return vscode.commands.executeCommand("workbench.action.quickOpen", path);
}

function cmdFindInFilesInRelativeWorkspace(
  editor: vscode.TextEditor,
  _edit: vscode.TextEditorEdit
) {
  const path = findSearchPath(editor, "findInFiles");

  return vscode.commands.executeCommand("workbench.action.findInFiles", {
    query: "",
    filesToInclude: path,
  });
}
