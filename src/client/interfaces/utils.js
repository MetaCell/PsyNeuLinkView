const fs = require('fs');
const os = require('os');
const log_file = fs.createWriteStream(os.homedir() + '/psyneulinkviewer.log', {flags : 'w'});
const log_stdout = process.stdout;

const { exec, spawn } = require("child_process");

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

const spawnCommand = (command, args, options) => {
    const { condaEnv, isWin } = options;
    if (condaEnv && condaEnv !== "") {
        const childProc = spawn("conda", ["run", "-n", condaEnv, command, ...args], {
            shell: true,
            detached: !isWin
        });
        return childProc;
    } else {
        const childProc = spawn(command, args, {
            shell: true,
            detached: !isWin
        });
        return childProc;
    }
}


const spawnSyncCommand = (command, args, options) => {
    const { condaEnv, isWin } = options;
    if (condaEnv && condaEnv !== "") {
        const childProc = spawn("conda", ["run", "-n", condaEnv, command, ...args], {
            shell: true,
            detached: !isWin
        });
        return childProc;
    } else {
        const childProc = spawn(command, args, {
            shell: true,
            detached: !isWin
        });
        return childProc;
    }
}

const logOutput = (data, isDev) => {
    if (isDev) {
        log_stdout.write(data);
    }
    log_file.write(data);
}

exports.logOutput = logOutput;
exports.spawnCommand = spawnCommand;
exports.executeCommand = executeCommand;
exports.spawnSyncCommand = spawnSyncCommand;