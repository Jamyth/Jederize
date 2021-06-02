import vscode from 'vscode';
import { folderize } from './commands/folderize';

export const activate = (context: vscode.ExtensionContext) => {
    const _folderize = vscode.commands.registerCommand('jederize.folderize', folderize);

    context.subscriptions.push(_folderize);
};
