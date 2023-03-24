const executeCommand = require("./utils").executeCommand;
const appState = require('../../../public/appState').appStateFactory.getInstance()

const psyneulinkHandlerFactory = (function(){
    function PsyneulinkHandler() {
        this.condaEnv = null;
        this.psyneulinkInstalled = false;

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

        this.setCondaEnv = async (condaEnv) => {
            const condaEnvList = await this.getCondaEnvs();
            if (condaEnvList.includes(condaEnv)) {
                this.condaEnv = condaEnv;
            } else {
                throw new Error(`Conda environment ${condaEnv} not found.`);
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