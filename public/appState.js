const appStates = require('../src/messageTypes').appStates;

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
            if (this.checkAppState(states.PNL_INSTALLED)) {
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

        this.getStates = function() {
            return states;
        };

        this.resetState = function() {
            this.currentState = states.APP_STARTED;
            this.checkServer();
        };

        this.setState = function(state) {
            let _states = Object.keys(states);
            if (_states[state] in states && states[_states[state - 1]] === this.currentState) {
                this.currentState = states[_states[state]];
                this.checkServer();
            } else {
                // throw new Error('The state given ' + state + 'is not the following state of the state machine. The current state is ' + this.currentState + '.');
                console.error('The state given ' + state + 'is not the following state of the state machine. The current state is ' + this.currentState + '.');
            }

        };

        this.setNextState = function() {
            let _states = Object.keys(states);
            if (this.currentState === states.PNL_RUNNING) {
                this.checkServer();
                return;
            }
            if (_states[this.currentState + 1] in states) {
                this.currentState = states[_states[this.currentState + 1]];
                this.checkServer();
            }
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