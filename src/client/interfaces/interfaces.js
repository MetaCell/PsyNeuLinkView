const AppStateHandler = require('../../../public/appState').appStateFactory.getInstance();
const PsyneulinkHandler = require('./psyneulinkHandler').psyneulinkHandlerFactory.getInstance();
const GRPCClient = require('../grpc/grpcClient').grpcClientFactory.getInstance();

var interfaces = {
    'AppStateHandler': AppStateHandler,
    'PsyneulinkHandler': PsyneulinkHandler,
    'GRPCClient': GRPCClient,
};

exports.interfaces = interfaces;
