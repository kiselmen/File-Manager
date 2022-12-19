import { stdout, chdir } from 'node:process';
import { currentDirectory } from './currentDirectory.js';
import { invalidOperationMessage } from './consts.js';
import { checkArgs } from './helper.js';

const cd = async (path) => {

    if (!path) {
        stdout.write(invalidOperationMessage);
        await currentDirectory();
        return;
    }   

    const destination = checkArgs(path);
    try {
        chdir(destination);
        await currentDirectory();
    } catch (err) {
        stdout.write(invalidOperationMessage);
        await currentDirectory();
    }
};

export default cd;
