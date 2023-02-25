const appStateFactory = (function(){
    function AppState() {
        const states = {
            APP_STARTED: 0,
            CONDA_ENV_SELECTED: 1,
            PNL_INSTALLED: 2,
            PNL_RUNNING: 3,
            APP_STOPPED: 4,
        };
        var currentState = states.APP_STARTED;

        this.getState = function() {
            return currentState;
        };

        this.setNextState = function() {
            let _states = Object.keys(states);
            if (_states[currentState + 1] in states) {
                currentState = states[_states[currentState + 1]];
            }
        };

        this.getStates = function() {
            return states;
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