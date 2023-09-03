import { execSync } from "child_process";
import * as fs from "fs";
import { homedir } from "os";
import * as path from "path";
import * as vscode from "vscode";

export function isGitDir() {
  try {
    execSync("git rev-parse --is-inside-work-tree", {
      encoding: "utf8",
    });
    return true;
  } catch {
    return false;
  }
}

export function findGitRootDir() {
  return execSync("git rev-parse --show-toplevel", {
    encoding: "utf8",
  });
}

export function findRootDir(dir: string) {
  const isExist = fs.existsSync(path.join(dir, "package.json"));

  if (
    isExist ||
    (isGitDir() && findGitRootDir() === dir) ||
    dir === vscode.workspace.workspaceFolders?.[0].uri.fsPath ||
    dir === homedir()
  ) {
    return dir;
  } else {
    return findRootDir(path.join(dir, ".."));
  }
}
