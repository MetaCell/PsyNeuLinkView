const executeCommand = require("./utils").executeCommand;
const appState = require('../../../public/appState').appStateFactory.getInstance()

const psyneulinkHandlerFactory = (function(){
    function PsyneulinkHandler() {
        this.condaEnv = null;
        this.psyneulinkInstalled = false;

        this.isPsyneulinkInstalled = () => {
            const pipPsyneuLink = this.runCommand("pip show psyneulink");
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

        this.runCommand = async (command) => {
            if (this.condaEnv) {
                command = `conda run -n ${this.condaEnv} ${command}`;
            }
            const result = await executeCommand(command);
            return result;
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