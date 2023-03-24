const appStateFactory = (function(){
    function AppState() {
        const states = {
            APP_STARTED: 0,
            FRONTEND_STARTED: 1,
            PNL_INSTALLED: 2,
            PNL_RUNNING: 3,
        };
        this.currentState = states.APP_STARTED;

        this.getState = function() {
            return this.currentState;
        };

        this.getStates = function() {
            return states;
        };

        this.resetState = function() {
            this.currentState = states.APP_STARTED;
        };

        this.setState = function(state) {
            let _states = Object.keys(states);
            if (_states[state] in states && states[_states[state - 1]] === this.currentState) {
                this.currentState = states[_states[state]];
            } else {
                // throw new Error('The state given ' + state + 'is not the following state of the state machine. The current state is ' + this.currentState + '.');
                console.error('The state given ' + state + 'is not the following state of the state machine. The current state is ' + this.currentState + '.');
            }
        };

        this.setNextState = function() {
            let _states = Object.keys(states);
            if (this.currentState === states.PNL_RUNNING) {
                return;
            }
            if (_states[this.currentState + 1] in states) {
                this.currentState = states[_states[this.currentState + 1]];
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