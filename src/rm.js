import { invalidOperationMessage } from './consts.js';
import { stdout } from 'node:process';
import fs from 'fs';
import { writeFile } from 'node:fs/promises';
import { currentDirectory } from './currentDirectory.js';
import { checkArgs } from './helper.js';

const rm = async (path) => {
    const trimPath = checkArgs(path);

    try {
        fs.unlink(trimPath, (err) => {
            if (err) {
                stdout.write(invalidOperationMessage);
                currentDirectory();
            } else {
                currentDirectory();
            }
        })
    } catch (err) {
        stdout.write(invalidOperationMessage);
        await currentDirectory();
    }
};

export default rm;