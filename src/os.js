import { currentDirectory } from './currentDirectory.js';
import { InvalidInputMessage } from './consts.js';
import os from "os";
import { stdout } from 'node:process';

const res = (content) => {
    stdout._write(content);
    currentDirectory();
}

const cpus = () => {
    const cpus = os.cpus();
     
    const res = [];
    cpus.forEach(el => {
        const info = el.model.split(' @ ');
        res.push({model: info[0], clock_rate: info[1]});
    })
    stdout._write(`Overall amount of CPUS ${res.length}.`+ '\n');
    console.table(res);
    currentDirectory();
}

const osInfo = (method) => {
    switch (method) {
        case '--cpus':
            cpus(); 
            break;
        case '--homedir':
            res(`${os.homedir}\n`);
            break;
        case '--username':
            const userInfo = os.userInfo();
            res(`${userInfo.username}\n`);
            break;
        case '--architecture':
            res(`${os.arch()}\n`);
            break;
        case '--EOL':
            res(`${os.EOL}\n`);
            break;
        default:
            stdout.write(InvalidInputMessage);
            currentDirectory();
            break;
    }
};

export default osInfo;