const appStates = require('../src/messageTypes').appStates;
const stateTransitions = require('../src/messageTypes').stateTransitions;

const appStateFactory = (function(){
    function AppState() {
        const states = appStates;
        const statesArray = Object.keys(states);
        const psyneulinkHandler = require('../src/client/interfaces/psyneulinkHandler').psyneulinkHandlerFactory.getInstance();
        this.currentState = states.APP_STARTED;

        this.checkAppState = function(checkedState) {
            if (statesArray.indexOf(this.currentState) >= statesArray.indexOf(checkedState)) {
                return true;
            }
            return false;
        }

        this.checkServer = function() {
            if (this.checkAppState(states.VIEWER_DEP_INSTALLED)) {
                psyneulinkHandler.runServer();
            } else {
                psyneulinkHandler.stopServer();
            }
        };

        this.isDev = function() {
            return true;
        };

        this.getState = function() {
            return this.currentState;
        };

        this.resetState = function() {
            this.currentState = states.APP_STARTED;
            this.checkServer();
        };

        this.resetAfterCondaSelection = function() {
            psyneulinkHandler.stopServer();
            this.currentState = states.CONDA_ENV_SELECTED;
        };

        this.transitions = {
            [stateTransitions.FRONTEND_READY]: {
                next() {
                    if (this.currentState === states.APP_STARTED) {
                        this.currentState = states.FRONTEND_STARTED;
                        return true;
                    } 
                    console.error('The current state is ' + this.currentState + '. The state machine is not in the correct state to use the transition ' + stateTransitions.FRONTEND_READY + '.');
                    return false;
                }
            },
            [stateTransitions.SELECT_CONDA_ENV]: {
                next() {
                    if (this.currentState === states.FRONTEND_STARTED) {
                        this.currentState = states.CONDA_ENV_SELECTED;
                        return true;
                    }
                    console.error('The current state is ' + this.currentState + '. The state machine is not in the correct state to use the transition ' + stateTransitions.SELECT_CONDA_ENV + '.');
                    return false;
                }
            },
            [stateTransitions.FOUND_PNL]: {
                next() {
                    if (this.currentState === states.CONDA_ENV_SELECTED || this.currentState === states.PNL_NOT_FOUND) {
                        this.currentState = states.PNL_FOUND;
                        return true;
                    }
                    console.error('The current state is ' + this.currentState + '. The state machine is not in the correct state to use the transition ' + stateTransitions.FOUND_PNL + '.');
                    return false;
                }
            },
            [stateTransitions.NOT_FOUND_PNL]: {
                next() {
                    if (this.currentState === states.CONDA_ENV_SELECTED) {
                        this.currentState = states.PNL_NOT_FOUND;
                        return true;
                    }
                    console.error('The current state is ' + this.currentState + '. The state machine is not in the correct state to use the transition ' + stateTransitions.NOT_FOUND_PNL + '.');
                    return false;
                }
            },
            [stateTransitions.INSTALL_VIEWER_DEP]: {
                next() {
                    if (this.currentState === states.PNL_FOUND) {
                        this.currentState = states.VIEWER_DEP_INSTALLED;
                        return true;
                    }
                    console.error('The current state is ' + this.currentState + '. The state machine is not in the correct state to use the transition ' + stateTransitions.INSTALL_VIEWER_DEP + '.');
                    return false;
                }
            },
            [stateTransitions.START_SERVER]: {
                next() {
                    if (this.currentState === states.VIEWER_DEP_INSTALLED) {
                        this.currentState = states.SERVER_STARTED;
                        return true;
                    }
                    console.error('The current state is ' + this.currentState + '. The state machine is not in the correct state to use the transition ' + stateTransitions.START_SERVER + '.');
                    return false;
                }
            },
            [stateTransitions.STOP_SERVER]: {
                next() {
                    if (this.currentState === states.SERVER_STARTED) {
                        this.currentState = states.SERVER_STOPPED;
                        return true;
                    }
                    console.error('The current state is ' + this.currentState + '. The state machine is not in the correct state to use the transition ' + stateTransitions.STOP_SERVER + '.');
                    return false;
                }
            },
            [stateTransitions.RESTART_SERVER]: {
                next() {
                    if (this.currentState === states.SERVER_STOPPED) {
                        this.currentState = states.SERVER_STARTED;
                        return true;
                    }
                    console.error('The current state is ' + this.currentState + '. The state machine is not in the correct state to use the transition ' + stateTransitions.RESTART_SERVER + '.');
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