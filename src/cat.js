import { invalidOperationMessage } from './consts.js';
import { stdout, stderr } from 'node:process';
import fs from 'fs';
import { checkArgs } from './helper.js';
import { currentDirectory } from './currentDirectory.js';

const cat = async (filePath) => {
    const file = checkArgs(filePath);
    try {
        fs.access(file, fs.F_OK, (err) => {
            if(err) {
                stdout.write(invalidOperationMessage);
            } else {
                const readStream = fs.createReadStream(file, 'utf-8');
                let data = '';
                readStream.on('data', chunk => data += chunk);
                readStream.on('end', () => {
                    stdout.write(data + '\n');
                    currentDirectory();
                });
                readStream.on('error', () => {
                    stderr._write(invalidOperationMessage);
                    currentDirectory();
                });
            }
        })
    } catch (err) {
        stdout.write(invalidOperationMessage);
        currentDirectory();
    }
};

export default cat;