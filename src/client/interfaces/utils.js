const fs = require('fs');
const os = require('os');
const psTree = require('ps-tree');
const kill  = require('tree-kill');
const log_file = fs.createWriteStream(os.homedir() + '/psyneulinkviewer.log', {flags : 'w'});
const log_stdout = process.stdout;

const { exec, execSync, spawn, spawnSync } = require("child_process");

const executeCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout? stdout : stderr);
        });
    });
}

const executeSyncCommand = (command) => {
    try {
        const results = execSync(command).toString();
        return results;
    } catch (error) {
        return error.toString();
    }
}

const spawnCommand = (command, args, options) => {
    const { condaEnv, isWin } = options;
    if (condaEnv && condaEnv !== "") {
        const childProc = spawn("conda", ["run", "--no-capture-output", "-n", condaEnv, command, ...args], {
            shell: true,
            detached: !isWin,
            stdio: ["pipe", "pipe", "pipe"],
            encoding: 'utf-8'
        });
        return childProc;
    } else {
        const childProc = spawn(command, args, {
            shell: true,
            detached: !isWin,
            stdio: ["pipe", "pipe", "pipe"],
            encoding: 'utf-8'
        });
        return childProc;
    }
}


const spawnSyncCommand = (command, args, options) => {
    const { condaEnv, isWin } = options;
    if (condaEnv && condaEnv !== "") {
        const childProc = spawnSync("conda", ["run", "--no-capture-output", "-n", condaEnv, command, ...args], {
            shell: true,
            detached: !isWin
        });
        return childProc;
    } else {
        const childProc = spawnSync(command, args, {
            shell: true,
            detached: !isWin
        });
        return childProc;
    }
}

const killProcess = (pid) => {
    psTree(pid, function (err, children) {
        spawn('kill', ['-9'].concat(children.map(function (p) { return p.PID })));
    });
}

const logOutput = (data, isDev) => {
    if (isDev) {
        log_stdout.write(data);
    }
    log_file.write(data);
}

const parseArguments = (args) => {
    const parsedArgs = {};
    args.forEach(arg => {
        const [key, value] = arg.split('=');
        parsedArgs[key] = value;
    });
    return parsedArgs;
}

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

exports.sleep = sleep;
exports.logOutput = logOutput;
exports.killProcess = killProcess;
exports.spawnCommand = spawnCommand;
exports.executeCommand = executeCommand;
exports.parseArguments = parseArguments;
exports.spawnSyncCommand = spawnSyncCommand;
exports.executeSyncCommand = executeSyncCommand;
