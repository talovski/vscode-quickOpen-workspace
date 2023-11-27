# QuickOpen Workspace

This is a simple extension that opens `Quick access` menu with predefined workspace path.

- Open the command palette
- Run "Quick Open Presets"
- Pick one of the presets and see it run

## Demo

![Multi-step sample](https://raw.githubusercontent.com/Dwlad90/vscode-quickopen-workspace/master/preview.gif)

## How it works

The extension uses the [`workbench.action.quickOpen`](https://code.visualstudio.com/api/references/commands) command to suggest files.

## VS Code API

### `vscode` module

- [`workbench.action.quickOpen`](https://code.visualstudio.com/api/references/commands)

# How to run locally

- Run `npm install` in terminal to install dependencies
- Run the `Run Extension` target in the Debug View. This will:
	- Start a task `npm: watch` to compile the code
	- Run the extension in a new VS Code window
