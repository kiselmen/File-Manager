import { invalidOperationMessage, InvalidInputMessage } from './consts.js';
import fs from 'fs';
import zlib from 'zlib';
import { basename, resolve } from 'path';
import { pipeline } from 'stream/promises';
import { currentDirectory } from './currentDirectory.js';
import { cwd, stdout } from 'node:process';
import { lotOfArgs } from './helper.js';

const compress = async (args) => {
    const newArgs = lotOfArgs(args);
    if (newArgs.length !== 2) {
        stdout.write(InvalidInputMessage);
        currentDirectory();
    } else {
        try {
            const [ fileSource, fileDestination ] = newArgs;
            const fileSourceWithExt = resolve(cwd(), fileSource);
            const filaNameWithExt = basename(fileSourceWithExt);
            const zipFileName = resolve(cwd(), fileDestination, filaNameWithExt + '.br');
    
            fs.access(zipFileName, fs.F_OK, (err) => {
                
                if(err) {
    
                    pipeline(
                        fs.createReadStream(fileSourceWithExt),
                        zlib.createBrotliCompress(),
                        fs.createWriteStream(zipFileName)
                    );
                    currentDirectory();
    
                } else {
                    stdout.write(invalidOperationMessage);
                    currentDirectory();
                }
            })
        } catch (error) {
            stdout.write(invalidOperationMessage);
            currentDirectory();
        }
    }

};

export default compress;