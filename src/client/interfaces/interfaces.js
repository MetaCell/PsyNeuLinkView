const AppStateHandler = require('../../../public/appState').appStateFactory.getInstance();
const PsyneulinkHandler = require('./psyneulinkHandler').psyneulinkHandlerFactory.getInstance();

var interfaces = {
    'AppStateHandler': AppStateHandler,
    'PsyneulinkHandler': PsyneulinkHandler,
    'GRPCClient': require('../grpc/grpcClient').GRPCClient,
};

exports.interfaces = interfaces;
