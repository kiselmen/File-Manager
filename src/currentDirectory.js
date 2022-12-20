import { cwd, stdout } from 'node:process';

const currentDirectory = async () => {
    stdout.write(`You are currently in ${cwd()}`+ '\n');
};

export { currentDirectory };