const messageTypes = {
    ERROR: 'error',
    WARNING: 'warning',
    OPEN_FILE: 'open_file',
    SAVE_FILE: 'save_file',
    SAVE_FILE_AS: 'save_file_as',
    SET_APP_STATE: 'set_app_state',
    FRONTEND_READY: 'frontend_ready',
    RELOAD_APPLICATION: 'reload_application',
    SELECT_CONDA_ENV: 'select_conda_env',
    CONDA_ENV_SELECTED: 'conda_env_selected',
    PNL_FOUND: 'pnl_found',
    PNL_NOT_FOUND: 'pnl_not_found',
}

const appStates = {
    APP_STARTED: 'APP_STARTED',
    FRONTEND_STARTED: 'FRONTEND_STARTED',
    CONDA_ENV_SELECTED: 'CONDA_ENV_SELECTED',
    PNL_FOUND: 'PNL_FOUND',
    PNL_NOT_FOUND: 'PNL_NOT_FOUND',
    VIEWER_DEP_INSTALLED: 'VIEWER_DEP_INSTALLED',
    SERVER_STARTED: 'SERVER_STARTED',
    SERVER_STOPPED: 'SERVER_STOPPED',
};

exports.appStates = appStates;
exports.messageTypes = messageTypes;