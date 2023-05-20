const grpc = require('@grpc/grpc-js');
const messages = require('./psyneulink_pb');
const services = require('./psyneulink_grpc_pb');

class GRPCClient {
    constructor(){
        this._client = this.initClient();

        this.linkPnl = this.linkPnl.bind(this);
        this.loadModel = this.loadModel.bind(this);
        this.initClient = this.initClient.bind(this);
    }

    initClient = function() {
        return new services.ServeGraphClient('localhost:50051', grpc.credentials.createInsecure());
    }

    loadModel = function(path, callback, errorCallback) {
        const request = new messages.ModelPath();
        request.setPath(path);

        this._client.loadModel(request, (err, response) => {
            if (err) {
                if (errorCallback) {
                    errorCallback(err);
                } else {
                    console.error(err);
                }
            } else {
                if (callback) {
                    callback(response);
                } else {
                    console.log(response);
                    console.log(response.getResponse());
                    console.log(response.getMessage());
                    console.log(messages.ResponseMessage['UP_AND_RUNNING']);
                }
            }
        });
    }
}

exports.GRPCClient = new GRPCClient();
