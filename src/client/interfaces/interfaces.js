const AppStateHandler = require('../../../public/appState').appStateFactory.getInstance();
const PsyneulinkHandler = require('./psyneulinkHandler').psyneulinkHandlerFactory.getInstance();

var interfaces = {
    'AppStateHandler': AppStateHandler,
    'PsyneulinkHandler': PsyneulinkHandler,
    'RPCServerHandler': require('./rpcServerHandler').RPCServerHandler,
};

exports.interfaces = interfaces;