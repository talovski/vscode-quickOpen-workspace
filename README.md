# Monorepo Navigator

Adds commands to open files or seach inside them in relative workspace in monorepo.

Let's say your monorepo has this structure:

```
pkgs
	design-system
		button
		grid
		modal
```

When you open `Button.tsx` file, you can use commands from this extension to narrow down Quick Open (cmd + p), or Find in files (cmd + shift + f) to only seach within `button` monorepo package.

## How to use commands:

- Open the command palette
- Run `Monorepo Naviagator: Quick Open` or `Monorepo Navigator: Find in files`.

## Demo

![Multi-step sample](https://raw.githubusercontent.com/Dwlad90/vscode-quickopen-workspace/master/preview.gif)

## How it works

The extension uses the [`workbench.action.quickOpen` and `workbench.action.findInFiles`](https://code.visualstudio.com/api/references/commands) commands to insert the path to the closest package relative to the currently open file.

## VS Code API

### `vscode` module

- [`workbench.action.quickOpen`](https://code.visualstudio.com/api/references/commands)
- [`workbench.action.findInFiles`](https://code.visualstudio.com/api/references/commands)

## How to run locally

- Run `npm install` in terminal to install dependencies
- Run the `Run Extension` target in the Debug View. This will:
  - Start a task `npm: watch` to compile the code
  - Run the extension in a new VS Code window

## Credits

Icon by [Iconic Panda](https://www.flaticon.com/authors/iconic-panda) on FlatIcon.
