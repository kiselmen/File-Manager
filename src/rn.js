import { invalidOperationMessage, InvalidInputMessage } from './consts.js';
import { rename } from 'node:fs';
import { currentDirectory } from './currentDirectory.js';
import { lotOfArgs } from './helper.js'
import { stdout } from "process";

const rn = async (args) => {

    const newArgs = lotOfArgs(args);
    if (newArgs.length !== 2) {
        stdout.write(InvalidInputMessage);
    } else {
        try {
            rename (newArgs[0], newArgs[1], (err) => {
                if (err) stdout.write(invalidOperationMessage);
                currentDirectory();
            })
        } catch (err) {
            stdout.write(InvalidInputMessage);
            currentDirectory();
        }
    }
};

export default rn;