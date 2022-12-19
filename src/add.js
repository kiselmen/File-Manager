import { invalidOperationMessage } from './consts.js';
import { cwd, stdout } from 'node:process';
import fs from 'fs';
import { writeFile } from 'node:fs/promises';
import { currentDirectory } from './currentDirectory.js';
import { checkArgs } from './helper.js';

const add = async (path) => {
    const trimPath = checkArgs(path);

    const filePath = `${cwd()}/${trimPath}`;
    try {
        fs.access(filePath, fs.F_OK, (err) => {
            if (err) {
                fs.open(filePath, 'w', (err) => {
                    if (err) {
                        stdout.write(invalidOperationMessage);
                        currentDirectory();
                    } else {
                        writeFile(filePath, '');
                        currentDirectory();
                    }
                });
            } else {
                stdout.write(invalidOperationMessage);
                currentDirectory();
            }
        })
    } catch (err) {
        stdout.write(invalidOperationMessage);
        await currentDirectory();
    }
};

export default add;