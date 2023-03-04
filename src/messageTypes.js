const messageTypes = {
    ERROR: 'error',
    WARNING: 'warning',
    OPEN_FILE: 'open_file',
    SAVE_FILE: 'save_file',
    SAVE_FILE_AS: 'save_file_as',
    // to be removed later
    NEXT_STATE: 'next_state',
    SET_APP_STATE: 'set_app_state',
    FRONTEND_READY: 'frontend_ready',
    RELOAD_APPLICATION: 'reload_application',
}

const appStates = {
    APP_STARTED: 'APP_STARTED',
    FRONTEND_STARTED: 'FRONTEND_STARTED',
    CONDA_ENV_SELECTED: 'CONDA_ENV_SELECTED',
    PNL_INSTALLED: 'PNL_INSTALLED',
    PNL_RUNNING: 'PNL_RUNNING',
};

exports.appStates = appStates;
exports.messageTypes = messageTypes;