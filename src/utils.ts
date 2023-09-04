import { execSync } from "child_process";
import * as fs from "fs";
import { homedir } from "os";
import * as path from "path";
import * as vscode from "vscode";

export function isGitDir(cwd?: string) {
  try {
    execSync("git rev-parse --is-inside-work-tree", {
      encoding: "utf8",
      cwd,
    });
    return true;
  } catch {
    return false;
  }
}

export function findGitRootDir(cwd?: string) {
  if (!isGitDir(cwd)) {
    return undefined;
  }
  return execSync("git rev-parse --show-toplevel", {
    encoding: "utf8",
    cwd,
  });
}

export function findRootDir(dir: string) {
  if (dir === homedir()) {
    return "~";
  }

  const isExist = fs.existsSync(path.join(dir, "package.json"));

  if (
    isExist ||
    findGitRootDir(dir) === dir ||
    dir === vscode.workspace.workspaceFolders?.[0].uri.fsPath
  ) {
    return dir;
  } else {
    return findRootDir(path.join(dir, ".."));
  }
}
