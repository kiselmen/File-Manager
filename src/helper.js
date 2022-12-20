const checkArgs = (args) => {
    if (args[0] === '"' || args[0] === "'") {
        return args.slice(1, -1);
    } 
    return args;
}

const lotOfArgs = (args) => {
    let clearArgs =[];
    if (args.indexOf('" "') !== -1) {
        const forSeparate = args.trim().slice(1,-1);
        clearArgs = forSeparate.split('" "');
    } else if (args.indexOf("' '") !== -1) {
        const forSeparate = args.trim().slice(1,-1);
        clearArgs = forSeparate.split("' '");
    } else {
        clearArgs = args.split(' ');
    }    
    return clearArgs;
}

export { checkArgs, lotOfArgs };