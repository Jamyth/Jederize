import vscode from 'vscode';
import path from 'path';
import fs from 'fs';
import { AlertUtil } from '../util/AlertUtil';

const ext = ['js', 'jsx', 'ts', 'tsx', 'scss', 'less'];

export const folderize = (props: { path: string }) => {
    try {
        const sourcePath = props.path;
        const splitPath = sourcePath.split('.');
        const extension = splitPath.pop();

        if (!extension) {
            vscode.window.showErrorMessage('JFolderize: Not');
            return;
        }

        const targetDirectory = splitPath.join('');
        const newPath = path.join(targetDirectory, `index.${extension}`);

        if (fs.existsSync(targetDirectory) && fs.statSync(targetDirectory).isDirectory()) {
            AlertUtil.alert('There is a folder with same name !');
            return;
        }

        fs.mkdirSync(targetDirectory);
        if (ext.includes(extension)) {
            const content = fs.readFileSync(sourcePath, { encoding: 'utf-8' });
            const pathUpdateRegex = /\'.\//g;
            const newContent = content.replaceAll(pathUpdateRegex, "'../");
            fs.writeFileSync(newPath, newContent);
        } else {
            const content = fs.readFileSync(sourcePath);
            fs.writeFileSync(newPath, content);
        }
        fs.unlinkSync(sourcePath);
    } catch (error) {
        vscode.window.showErrorMessage(`JFolderize: Unexpected Error occurred, ${error}`);
    }
};
