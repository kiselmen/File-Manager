import { invalidOperationMessage } from './consts.js';
import { stdout, stderr } from 'node:process';
import fs from 'fs';
import { checkArgs } from './helper.js';
import { currentDirectory } from './currentDirectory.js';
import { createHash } from 'crypto';

const myHash = async (filePath) => {
    const file = checkArgs(filePath);
    try {
        fs.readFile(file, 'utf8', (err, data) => {
            if(err) {
                stdout.write(invalidOperationMessage);
                currentDirectory();
            } else {
                const hash = createHash('sha256').update(data).digest('hex');
                stdout.write(hash + '\n');
                currentDirectory();
            }
        })
    } catch (err) {
        stdout.write(invalidOperationMessage);
        currentDirectory();
    }
};

export default myHash;