import vscode from 'vscode';

function alert(message: string) {
    vscode.window.showErrorMessage(`Jederize: ${message}`);
}

export const AlertUtil = Object.freeze({ alert });
