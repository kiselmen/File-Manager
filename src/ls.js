import { stdout } from "process";
import path from "path";
import fs, { readdir } from "fs";
import { cwd } from 'node:process';
import { currentDirectory } from './currentDirectory.js';
import { InvalidInputMessage } from './consts.js';

const sort = ( a, b ) => {
    const nameA = a.toLowerCase();
    const nameB = b.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
};

const ls = async () => {
    const directoriesArray = [];
    const filesArray = [];
    const hidderFilesArray = [];

    readdir(process.cwd(), async (err, files) => {
    
        if (err) {
        stdout.write(`${err.message}\n`);
        stdout.write(InvalidInputMessage);
        } else {
            stdout.write(`\n`);
            for (const file of files) {
                const filePath = path.join(`${cwd()}`, file);
                try {
                    const stats = await fs.promises.stat(filePath, (err, stats) => {
                        if (err) throw err;
                        return stats;
                    });
                    if (stats.isDirectory()) {
                        directoriesArray.push(`${path.parse(file).name}`);
                    };
                    if (stats.isFile()) {
                        filesArray.push(`${path.parse(file).name}.${path.extname(file).slice(1)}`);
                    };
                } catch (err) {
                    hidderFilesArray.push(`${path.parse(file).name}`);
                }
            }
        
        }
        directoriesArray.sort((a, b) => sort(a,b));
        filesArray.sort((a, b) => sort(a,b));
        hidderFilesArray.sort((a, b) => sort(a,b));
        const filesAllArray = [];
        directoriesArray.forEach((fileName) => filesAllArray.push({ name: fileName, type: 'directory' }));
        filesArray.forEach((fileName) => filesAllArray.push({ name: fileName, type: 'file' }));
        hidderFilesArray.forEach((fileName) => filesAllArray.push({ name: fileName, type: 'hidden' }));
        console.table(filesAllArray);
        await currentDirectory();
    });
};

export default ls;