const parseArgs = () => {
    const args = process.argv.slice(2).toString().trim();
    const userName = args.startsWith('--username') ? args.split('=').pop() : "Anonimus";
    return userName;
};

const username = parseArgs();

const loginMessage = `Welcome to the File Manager, ${username}!` + '\n';
const logoutMessage = '\n' + `Thank you for using File Manager, ${username}, goodbye!`;
const invalidOperationMessage = 'Operation failed' + '\n';
const InvalidInputMessage = 'Invalid input' + '\n';

export { username, loginMessage, logoutMessage, invalidOperationMessage, InvalidInputMessage };