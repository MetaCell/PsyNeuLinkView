const appStates = require('../src/nodeConstants').appStates;
const stateTransitions = require('../src/nodeConstants').stateTransitions;

const appStateFactory = (function(){
    function AppState() {
        const states = appStates;
        const statesArray = Object.keys(states);
        const psyneulinkHandler = require('../src/client/interfaces/psyneulinkHandler').psyneulinkHandlerFactory.getInstance();
        let currentState = states.APP_STARTED;

        this.checkAppState = function(checkedState) {
            if (statesArray.indexOf(currentState) >= statesArray.indexOf(checkedState)) {
                return true;
            }
            return false;
        }

        this.checkServer = async function() {
            if (this.checkAppState(states.VIEWER_DEP_INSTALLED)) {
                await psyneulinkHandler.runServer();
            } else {
                psyneulinkHandler.stopServer();
            }
        };

        this.isDev = function() {
            return true;
        };

        this.getState = function() {
            return currentState;
        };

        this.resetState = function() {
            currentState = states.APP_STARTED;
            this.checkServer();
        };

        this.resetAfterCondaSelection = function() {
            psyneulinkHandler.stopServer();
            currentState = states.FRONTEND_STARTED;
        };

        this.transitions = {
            [stateTransitions.FRONTEND_READY]: {
                async transitionActions() {
                    // do something
                    return true;
                },
                async next() {
                    if (currentState === states.APP_STARTED && this.transitionActions()) {
                        currentState = states.FRONTEND_STARTED;
                        return true;
                    }
                    console.error('The current state is ' + currentState + '. The state machine is not in the correct state to use the transition ' + stateTransitions.FRONTEND_READY + '.');
                    return false;
                }
            },
            [stateTransitions.FOUND_PNL]: {
                async transitionActions() {
                    if (psyneulinkHandler.isPsyneulinkInstalled()) {
                        return true;
                    }
                    return false;
                },
                async next() {
                    if (currentState === states.FRONTEND_STARTED && this.transitionActions()) {
                        currentState = states.DEPENDENCIES_FOUND;
                        return true;
                    }
                    console.error('The current state is ' + currentState + '. The state machine is not in the correct state to use the transition ' + stateTransitions.FOUND_PNL + '.');
                    return false;
                }
            },
            [stateTransitions.INSTALL_VIEWER_DEP]: {
                async transitionActions() {
                    if (await psyneulinkHandler.installViewerDependencies()) {
                        return true;
                    }
                    return false;
                },
                async next() {
                    if (currentState === states.DEPENDENCIES_FOUND && await this.transitionActions()) {
                        currentState = states.VIEWER_DEP_INSTALLED;
                        return true;
                    }
                    console.error('The current state is ' + currentState + '. The state machine is not in the correct state to use the transition ' + stateTransitions.INSTALL_VIEWER_DEP + '.');
                    return false;
                }
            },
            [stateTransitions.START_SERVER]: {
                async transitionActions() {
                    if (await psyneulinkHandler.runServer()) {
                        return true;
                    }
                    return false;
                },
                async next() {
                    if (currentState === states.VIEWER_DEP_INSTALLED && await this.transitionActions()) {
                        currentState = states.SERVER_STARTED;
                        return true;
                    }
                    console.error('The current state is ' + currentState + '. The state machine is not in the correct state to use the transition ' + stateTransitions.START_SERVER + '.');
                    return false;
                }
            },
            [stateTransitions.STOP_SERVER]: {
                async transitionActions() {
                    if (psyneulinkHandler.stopServer()) {
                        return true;
                    }
                    return false;
                },
                async next() {
                    if (currentState === states.SERVER_STARTED && this.transitionActions()) {
                        currentState = states.SERVER_STOPPED;
                        return true;
                    }
                    console.error('The current state is ' + currentState + '. The state machine is not in the correct state to use the transition ' + stateTransitions.STOP_SERVER + '.');
                    return false;
                }
            },
            [stateTransitions.RESTART_SERVER]: {
                async transitionActions() {
                    if (await psyneulinkHandler.runServer()) {
                        return true;
                    }
                    return false;
                },
                async next() {
                    if (currentState === states.SERVER_STOPPED && this.transitionActions()) {
                        currentState = states.SERVER_STARTED;
                        return true;
                    }
                    console.error('The current state is ' + currentState + '. The state machine is not in the correct state to use the transition ' + stateTransitions.RESTART_SERVER + '.');
                    return false;
                }
            },
        };
    }

    var instance;
    return {
        getInstance: function(){
            if (instance == null) {
                instance = new AppState();
                instance.constructor = null;
            }
            return instance;
        }
    };
})();

exports.appStateFactory = appStateFactory;
