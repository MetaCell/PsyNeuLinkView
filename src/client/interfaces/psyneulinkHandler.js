const os = require('os');
const { resolve } = require("path");
const logOutput = require("./utils").logOutput;
const killProcess = require("./utils").killProcess;
const spawnCommand = require("./utils").spawnCommand;
const executeCommand = require("./utils").executeCommand;
const parseArguments = require("./utils").parseArguments;

const enviroments = require("../../nodeConstants").enviroments;

const psyneulinkHandlerFactory = (function(){
    function PsyneulinkHandler() {
        this.condaEnv = null;
        this.serverProc = null;
        this.psyneulinkInstalled = false;
        this.environment = parseArguments(process.argv)['--mode'] || enviroments.PROD;

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
            try {
                let result = await this.runCommand("pip install -r requirements.txt");
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
                throw new Error(`Conda environment ${condaEnv} not found.`);
            }
        }

        this.runServer = () => {
            try {
                // TODO - remove this when we have a proper server
                if (this.environment === enviroments.DEV) {
                    this.serverProc = 'DEVELOPMENT MODE';
                    logOutput(Date.now() + " START: Starting Python RPC server IN DEVELOPMENT MODE\n", true);
                    return true;
                }

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
                return true;
            } catch (error) {
                logOutput(Date.now() + " ERROR: " + error + "\n", true);
                return false;
            }
        }

        this.stopServer = async () => {
            try {
                if (this.environment === enviroments.DEV) {
                    this.serverProc = 'DEVELOPMENT MODE';
                    logOutput(Date.now() + " INFO: Server started with pid " + this.serverProc + "\n", true);
                    return true;
                }

                if (this.serverProc) {
                    killProcess(this.serverProc.pid);
                    this.serverProc = null;
                }
                logOutput(Date.now() + " INFO: Server started with pid " + this.serverProc.pid + "\n", true);
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
            if (instance == null) {
                instance = new PsyneulinkHandler();
                instance.constructor = null;
            }
            return instance;
        }
    };
})();

exports.psyneulinkHandlerFactory = psyneulinkHandlerFactory;