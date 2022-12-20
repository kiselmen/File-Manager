import { invalidOperationMessage, InvalidInputMessage } from './consts.js';
import fs from 'fs';
import zlib from 'zlib';
import { basename, resolve } from 'path';
import { pipeline } from 'stream/promises';
import { currentDirectory } from './currentDirectory.js';
import { cwd, stdout } from 'node:process';
import { lotOfArgs } from './helper.js';

const decompress = async (args) => {
    const newArgs = lotOfArgs(args);
    if (newArgs.length !== 2) {
        stdout.write(InvalidInputMessage);
        currentDirectory();
    } else {
        try {
            const [ fileSource, fileDestination ] = newArgs;
            const zipFileName = resolve(cwd(), fileSource);
            const filaNameWithExt = basename(zipFileName).replace('.br','');
            const fileDestinationWithExt = resolve(cwd(), fileDestination, filaNameWithExt);
    
            fs.access(fileDestinationWithExt, fs.F_OK, (err) => {
                
                if(err) {
    
                    fs.access(fileDestination, fs.F_OK, (err) => {
                        if(err) {
                            stdout.write(invalidOperationMessage);
                            currentDirectory();
                        } else {
                            pipeline(
                                fs.createReadStream(zipFileName),
                                zlib.createBrotliDecompress(),
                                fs.createWriteStream(fileDestinationWithExt)
                            );
                            currentDirectory();
                        }
                    });
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

export default decompress;