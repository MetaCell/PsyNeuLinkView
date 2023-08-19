const os = require('os');
const { resolve } = require("path");
const sleep = require("./utils").sleep;
const logOutput = require("./utils").logOutput;
const killProcess = require("./utils").killProcess;
const spawnCommand = require("./utils").spawnCommand;
const executeCommand = require("./utils").executeCommand;
const executeSyncCommand = require("./utils").executeSyncCommand;
const parseArguments = require("./utils").parseArguments;

const environments = require("../../nodeConstants").environments;

const psyneulinkHandlerFactory = (function(){
    function PsyneulinkHandler() {
        this.condaEnv = executeSyncCommand('conda info').split("\n").filter((item) => { return item.includes("active environment") })[0].split(":")[1].trim();
        // this.serverProc = null;
        this.psyneulinkInstalled = false;
        this.environment = parseArguments(process.argv)['--mode'] || environments.PROD;

        this.isPsyneulinkInstalled = () => {
            const pipPsyneuLink = this.runSyncCommand("pip show psyneulink");
            this.psyneulinkInstalled = pipPsyneuLink.includes("Name: psyneulink");
            return this.psyneulinkInstalled;
        }

        this.getCondaEnvs = async () => {
            const condaEnvList = await this.runSyncCommand("conda env list");
            const allEnvs = condaEnvList.split("\n").slice(2, -1).filter(
                (item) => { return item !== "" }).map(
                    (item) => { return item.split(" ")[0] });
            return allEnvs;
        }

        this.getCondaEnv = () => {
            return this.condaEnv;
        }

        this.getRunningEnv = () => {
            const results = executeSyncCommand("conda info");
            const env = results.split("\n").filter((item) => { return item.includes("active environment") })[0].split(":")[1].trim();
            return env;
        }

        this.runCommand = async (command) => {
            if (this.condaEnv) {
                command = `conda run -n ${this.condaEnv} ${command}`;
            }
            const result = await executeCommand(command);
            return result;
        }

        this.runSyncCommand = (command) => {
            if (this.condaEnv) {
                command = `conda run -n ${this.condaEnv} ${command}`;
            }
            const result = executeSyncCommand(command);
            return result;
        }

        this.installViewerDependencies = () => {
            try {
                let result = this.runSyncCommand("pip install -r requirements.txt");
                logOutput(Date.now() + " INFO: " + result + "\n", true);
                return true;
            } catch (error) {
                logOutput(Date.now() + " ERROR: " + error + "\n", true);
                return false;
            }
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
                this.condaEnv = "";
                console.error("The conda environment " + condaEnv + " does not exist.");
            }
        }

        this.runServer = async () => {
            try {
                // TODO - remove this when we have a proper server
                if (this.environment === environments.DEV) {
                    this.serverProc = 'DEVELOPMENT MODE';
                    logOutput(Date.now() + " START: Starting Python RPC server IN DEVELOPMENT MODE\n", true);
                    return true;
                }

                if (this.serverProc) {
                    return;
                }
                const pythonServer = "python " + resolve(__dirname, "../../server/rpc_server.py");
                this.serverProc =  spawnCommand(pythonServer, [], { condaEnv: this.condaEnv, isWin: os.platform() === "win32" });
                let serverStarted = false;
                while (!serverStarted) {
                    const buffer = this.serverProc.stdout.read();
                    if (buffer !== null && buffer.toString().includes("### PsyNeuLinkViewer Server UP ###")) {
                        serverStarted = true;
                    }
                    await sleep(2000);
                }
                logOutput(Date.now() + " START: Starting Python RPC server \n", true);

                this.serverProc.on('error', function (err) {
                    logOutput(Date.now() + " ERROR: " + err + "\n", true);
                });

                this.serverProc.stdout.on('data', function (data) {
                    logOutput(Date.now() + " INFO: " + data + "\n", true);
                    if (data.toString().includes("### PsyNeuLinkViewer Server UP ###")) {
                        serverStarted = true;
                    }
                });

                this.serverProc.stderr.on('data', function (data) {
                    logOutput(Date.now() + " ERROR: " + data + "\n", true);
                });
                return true;
            } catch (error) {
                logOutput(Date.now() + " ERROR: " + error + "\n", true);
                return false;
            }
        }

        this.stopServer = async () => {
            try {
                if (this.environment === environments.DEV) {
                    this.serverProc = 'DEVELOPMENT MODE';
                    logOutput(Date.now() + " STOP: Simulation of the development server STOPPED\n", true);
                    return true;
                }

                if (this.serverProc !== null && this.serverProc !== undefined) {
                    killProcess(this.serverProc.pid);
                    logOutput(Date.now() + " STOP: Server STOPPED with pid " + this.serverProc.pid + "\n", true);
                    this.serverProc = null;
                }
                return true;
            } catch (error) {
                logOutput(Date.now() + " ERROR: " + error + "\n", true);
                return false
            }
        }
    }

    var instance;
    return {
        getInstance: function(){
            if (instance == null || instance === undefined) {
                instance = new PsyneulinkHandler();
                instance.constructor = null;
            }
            return instance;
        }
    };
})();

exports.psyneulinkHandlerFactory = psyneulinkHandlerFactory;
