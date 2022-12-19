import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, exit } from 'node:process';

import { loginMessage, logoutMessage } from './consts.js';
import { currentDirectory } from './currentDirectory.js';

import cd from './cd.js';
import ls from './ls.js';
import cat from './cat.js';
import add from './add.js';
import rn from './rn.js';
import cp from './cp.js';
import rm from './rm.js';
import mv from './mv.js';
import osInfo from './os.js';
import myHash from './hash.js';
import compress from './compress.js';
import decompress from './decompress.js';

const start = async () => {
    const myConsole = readline.createInterface({
        input,
        output,
        prompt: '>',
      });
    output.write(loginMessage);
    currentDirectory(1);

    myConsole.on('line', (line) => {
        const command = line.split(' ')[0];
        const args = line.replace(command, '').trim();
        switch (command) {
            case 'up':
                cd('..');
                break;
            case 'cd':
                cd(args);
                break;
            case 'ls':
                ls();
                break;
            case 'cat':
                cat(args);
                break;
            case 'add':
                add(args);
                break;
            case 'rn':
                rn(args);
                break;
            case 'cp':
                cp(args);
                break;
            case 'rm':
                rm(args);
                break;
            case 'mv':
                mv(args);
                break;
            case 'os':
                osInfo(args);
                break;
            case 'hash':
                myHash(args);
                break;
            case 'compress':
                compress(args);
                break;
            case 'decompress':
                decompress(args);
                break;
            case '.exit':
                exit();
                // break;
            default:
                console.log(`invalid command '${line.trim()}'`);
                break;
        }
        myConsole.prompt();
      }).on('close', () => {
        process.exit();
      });
}

process.on('exit', (code) => {
    console.log(logoutMessage);
});

await start();