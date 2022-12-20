import { invalidOperationMessage, InvalidInputMessage } from './consts.js';
import { stdout } from 'node:process';
import fs from 'fs';
import { currentDirectory } from './currentDirectory.js';
import { lotOfArgs } from './helper.js';

const cp = async (args) => {
    const newArgs = lotOfArgs(args);
    if (newArgs.length !== 2) {
        stdout.write(InvalidInputMessage);
        currentDirectory();
    } else {
        try {
            fs.access(newArgs[1], fs.F_OK, (err) => {
                if(err) {
                    const readStream = fs.createReadStream(newArgs[0]);
                    const writeStream = fs.createWriteStream(newArgs[1]);
                    readStream.on('error', () => {
                        stdout.write(invalidOperationMessage);
                        currentDirectory();
                    });
                    writeStream.on('error', () => {
                        stdout.write(invalidOperationMessage);
                        currentDirectory();
                    });
                    writeStream.on('finish', () => {
                        currentDirectory();
                    });
                    readStream.pipe(writeStream);
                } else {
                    stdout.write(InvalidInputMessage);
                    currentDirectory();
                }
            })
        } catch (err) {
            stdout.write(InvalidInputMessage);
            currentDirectory();
        }
    }
};

export default cp;