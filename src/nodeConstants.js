const appStates = {
    APP_STARTED: 'APP_STARTED',
    FRONTEND_STARTED: 'FRONTEND_STARTED',
    DEPENDENCIES_FOUND: 'DEPENDENCIES_FOUND',
    VIEWER_DEP_INSTALLED: 'VIEWER_DEP_INSTALLED',
    SERVER_STARTED: 'SERVER_STARTED',
    SERVER_STOPPED: 'SERVER_STOPPED',
};

const stateTransitions = {
    FRONTEND_READY: 'frontend_ready',
    FOUND_PNL: 'pnl_found',
    INSTALL_VIEWER_DEP: 'install_viewer_dep',
    START_SERVER: 'start_server',
    STOP_SERVER: 'stop_server',
    RESTART_SERVER: 'restart_server',
}

const messageTypes = {
    ERROR: 'error',
    WARNING: 'warning',
    OPEN_FILE: 'open_file',
    SAVE_FILE: 'save_file',
    SAVE_FILE_AS: 'save_file_as',
    SET_APP_STATE: 'set_app_state',
    RELOAD_APPLICATION: 'reload_application',
    CONDA_ENV_SELECTED: 'conda_env_selected',
    SELECT_CONDA_ENV: 'select_conda_env',
    OPEN_CONDA_SELECTION: 'open_conda_selection',
    INSTALL_PSYNEULINK: 'install_psyneulink',
    PNL_FOUND: 'pnl_found',
    PNL_NOT_FOUND: 'pnl_not_found',
    SERVER_STARTED: 'server_started',
    FRONTEND_READY: stateTransitions.FRONTEND_READY,
    INSTALL_VIEWER_DEP: stateTransitions.INSTALL_VIEWER_DEP,
}

const enviroments = {
    DEV: 'development',
    PROD: 'production'
}

exports.appStates = appStates;
exports.enviroments = enviroments;
exports.messageTypes = messageTypes;
exports.stateTransitions = stateTransitions;