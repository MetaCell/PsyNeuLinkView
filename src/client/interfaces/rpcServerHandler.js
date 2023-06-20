let {PythonShell} = require('python-shell')

class RPCServerHandler {
    constructor(){
        this.validateInterpreterPath = "Just a test from the rpc server handler";

        this.setString = this.setString.bind(this);
        this.showString = this.showString.bind(this);
    }

    setString = function (string) {
        this.validateInterpreterPath = string;
    }

    showString = function () {
        console.log(this.validateInterpreterPath);
    }
}

exports.RPCServerHandler = new RPCServerHandler();
