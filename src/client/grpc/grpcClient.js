const grpc = require('@grpc/grpc-js');
const messages = require('./psyneulink_pb');
const services = require('./psyneulink_grpc_pb');


const grpcClientFactory = (function(){
    function GRPCClient() {
        this._client = new services.ServeGraphClient('localhost:50051', grpc.credentials.createInsecure());

        this.initClient = () => {
            return new services.ServeGraphClient('localhost:50051', grpc.credentials.createInsecure());
        }

        this.loadModel = (path, callback, errorCallback) => {
            const request = new messages.ModelPath();
            request.setPath(path);
            this._client.loadModel(request, (err, response) => {
                if (err) {
                    if (errorCallback) {
                        errorCallback(err);
                    } else {
                        console.log(err);
                    }
                } else {
                    if (callback) {
                        callback(response);
                    } else {
                        console.log(response);
                        console.log(response.getResponse());
                        console.log(response.getMessage());
                    }
                }
            });
        }

        this.apiCall = (data, callback, errorCallback) => {
            const _json = {
                'method': data.method,
                'params': data.params,
            }
            const request = new messages.PNLJson();
            request.setGenericjson(JSON.stringify(_json));
            this._client.pNLApi(request, (err, response) => {
                if (err) {
                    if (errorCallback) {
                        errorCallback(err);
                    } else {
                        console.log(err);
                    }
                } else {
                    if (callback) {
                        callback(response);
                    } else {
                        console.log(response);
                        console.log(response.getResponse());
                        console.log(response.getMessage());
                    }
                }
            });
        }

        this.updateModel = (model, callback, errorCallback) => {
            const request = new messages.GraphJson();
            request.setModeljson(JSON.stringify(model));
            this._client.updateModel(request, (err, response) => {
                if (err) {
                    if (errorCallback) {
                        errorCallback(err);
                    } else {
                        console.log(err);
                    }
                } else {
                    if (callback) {
                        callback(response);
                    } else {
                        console.log(response);
                        console.log(response.getResponse());
                        console.log(response.getMessage());
                    }
                }
            });
        }

        this.runModel = (model, callback, errorCallback) => {
            const request = new messages.InputJson();
            request.setExecutablenode(model.executable)
            request.setInputdata(JSON.stringify(model))
            this._client.runModel(request, (err, response) => {
                if (err) {
                    if (errorCallback) {
                        errorCallback(err);
                    } else {
                        console.log(err);
                    }
                } else {
                    if (callback) {
                        callback(response);
                    } else {
                        console.log(response);
                        console.log(response.getResponse());
                        console.log(response.getMessage());
                    }
                }
            });
        }

        this.saveModel = (payload, callback, errorCallback) => {
            const request = new messages.ModelData();
            request.setPath(payload.path);
            request.setModeljson(JSON.stringify(payload.model));
            this._client.saveModel(request, (err, response) => {
                if (err) {
                    if (errorCallback) {
                        errorCallback(err);
                    } else {
                        console.log(err);
                    }
                } else {
                    if (callback) {
                        callback(response);
                    } else {
                        console.log(response);
                        console.log(response.getResponse());
                        console.log(response.getMessage());
                    }
                }
            });
        }

        this.stopServer = (callback, errorCallback) => {
            const request = new messages.NullArgument()
            this._client.stopServer(request, (err, response) => {
                if (err) {
                    if (errorCallback) {
                        errorCallback(err);
                    } else {
                        console.log(err);
                    }
                } else {
                    if (callback) {
                        callback(response);
                    } else {
                        console.log(response);
                        console.log(response.getResponse());
                        console.log(response.getMessage());
                    }
                }
            });
        }
    }

    var instance;
    return {
        getInstance: function(){
            if (instance == null) {
                instance = new GRPCClient();
                instance.constructor = null;
            }
            return instance;
        }
    };
})();

exports.grpcClientFactory = grpcClientFactory;
