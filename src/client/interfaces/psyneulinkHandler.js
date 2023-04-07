const os = require('os');
const { resolve } = require("path");
const logOutput = require("./utils").logOutput;
const killProcess = require("./utils").killProcess;
const spawnCommand = require("./utils").spawnCommand;
const executeCommand = require("./utils").executeCommand;
const spawnSyncCommand = require("./utils").spawnSyncCommand;

const psyneulinkHandlerFactory = (function(){
    function PsyneulinkHandler() {
        this.condaEnv = null;
        this.psyneulinkInstalled = false;
        this.serverProc = null;

        this.isPsyneulinkInstalled = async () => {
            const pipPsyneuLink = await this.runCommand("pip show psyneulink");
            this.psyneulinkInstalled = pipPsyneuLink.includes("Name: psyneulink");
            return this.psyneulinkInstalled;
        }

        this.getCondaEnvs = async () => {
            const condaEnvList = await this.runCommand("conda env list");
            const allEnvs = condaEnvList.split("\n").slice(2, -1).filter(
                (item) => { return item !== "" }).map(
                    (item) => { return item.split(" ")[0] });
            return allEnvs;
        }

        this.getCondaEnv = () => {
            return this.condaEnv;
        }

        this.runCommand = async (command) => {
            if (this.condaEnv) {
                command = `conda run -n ${this.condaEnv} ${command}`;
            }
            const result = await executeCommand(command);
            return result;
        }

        this.installViewerDependencies = async () => {
            let result = await this.runCommand("pip install -r requirements.txt");
            logOutput(Date.now() + " INFO: " + result + "\n", true);
        }

        this.installPsyneulink = async () => {
            let result = await this.runCommand("pip install psyneulink");
            logOutput(Date.now() + " INFO: " + result + "\n", true);
        }

        this.installPsyneulinkDev = async (folder) => {
            let result = await this.runCommand("cd " + folder + " && pip install -e .");
            logOutput(Date.now() + " INFO: " + result + "\n", true);
        }


        this.setCondaEnv = async (condaEnv) => {
            const condaEnvList = await this.getCondaEnvs();
            if (condaEnvList.includes(condaEnv)) {
                this.condaEnv = condaEnv;
            } else {
                throw new Error(`Conda environment ${condaEnv} not found.`);
            }
        }

        this.runServer = () => {
            if (this.serverProc) {
                return;
            }
            const pythonServer = "python " + resolve(__dirname, "../../server/rpc_server.py");
            this.serverProc =  spawnCommand(pythonServer, [], { condaEnv: this.condaEnv, isWin: os.platform() === "win32" });

            logOutput(Date.now() + " START: Starting Python RPC server \n", true);
            
            this.serverProc.on('error', function (err) {
                logOutput(Date.now() + " ERROR: " + err + "\n", true);
            });
            this.serverProc.stdout.setEncoding('utf8');
            this.serverProc.stdout.on('data', function (data) {
                logOutput(Date.now() + " INFO: " + data + "\n", true);
            });
            this.serverProc.stderr.setEncoding('utf8');
            this.serverProc.stderr.on('data', function (data) {
                logOutput(Date.now() + " ERROR: " + data + "\n", true);
            });
        }

        this.stopServer = async () => {
            if (this.serverProc) {
                killProcess(this.serverProc.pid);
                this.serverProc = null;
            }
        }

        // this.stopServer = async () => {
        //     if (this.serverProc) {
        //         try {
        //             if (os.platform() === "win32") {
        //                 spawnSyncCommand(
        //                     "taskkill",
        //                     [
        //                         "/PID",
        //                         this.serverProc.pid,
        //                         '/F',
        //                         '/T'
        //                     ], 
        //                     {
        //                         condaEnv: this.condaEnv,
        //                         isWin: os.platform() === "win32"
        //                     }
        //                 );
        //                 this.serverProc = null
        //                 logOutput(Date.now() + " END: RPC python server stopped\n", true);
        //             } else {
        //                 // process.kill(this.childProc.pid);
        //                 // this.childProc.kill();
        //                 const killOutput = spawnSyncCommand(
        //                     "kill", 
        //                     [this.serverProc.pid], 
        //                     {
        //                         condaEnv: this.condaEnv,
        //                         isWin: os.platform() === "win32"
        //                     }
        //                 );
        //                 logOutput(Date.now() + " END: RPC python server stopped\n", true);
        //                 for (const key in killOutput) {
        //                     logOutput(Date.now() + " END: " + key + ": " + killOutput[key] + "\n", true);
        //                 }
        //                 this.serverProc = null;
        //             }
        //         }
        //         catch (e) {
        //             logOutput(Date.now() + " ERROR: Error in stopping the server\n", true);
        //         }
        //     }
        // }   
    }

    var instance;
    return {
        getInstance: function(){
            if (instance == null) {
                instance = new PsyneulinkHandler();
                instance.constructor = null;
            }
            return instance;
        }
    };
})();

exports.psyneulinkHandlerFactory = psyneulinkHandlerFactory;