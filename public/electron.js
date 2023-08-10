const fs = require("fs");
const os = require("os");
const _ = require('lodash');
const path = require("path");
const debug = require('electron-debug');
const isDev = require("electron-is-dev");
// TODO: implement autoupdater to check for new versions of pnl viewer
// const { autoUpdater } = require("electron-updater");
const { app, dialog, ipcMain, nativeImage, BrowserWindow, Menu, Tray } = require("electron");

const appPath = app.getAppPath();
const { rpcMessages } = require("../src/nodeConstants");
const messageTypes = require('../src/nodeConstants').messageTypes;
const appState = require('./appState').appStateFactory.getInstance();
const stateTransitions = require('../src/nodeConstants').stateTransitions;
const rpcAPIMessageTypes = require('../src/nodeConstants').rpcAPIMessageTypes;
const adjustedAppPath = isDev ? appPath : path.join(appPath, '../app.asar.unpacked');
const grpcClient = require('../src/client/grpc/grpcClient').grpcClientFactory.getInstance();
const psyneulinkHandler = require('../src/client/interfaces/psyneulinkHandler').psyneulinkHandlerFactory.getInstance();

const {
  default: installExtension,
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS
} = require("electron-devtools-installer");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let debounceCheck = true;
let inputFile = undefined;
let fileWatcher = undefined;
let updateInProgress = false;


function watch(filepath, callback = (e) => {}) {
  if (filepath.startsWith('~')) {
      filepath = path.join(os.homedir(), filepath.slice(1, filepath.length))
  }
  if (fileWatcher !== undefined) {
      fileWatcher.close()
  }
  fileWatcher = fs.watch(filepath, _.debounce((e) => {
    if (updateInProgress === false) {
      if (debounceCheck === true) {
        debounceCheck = false;
      } else {
        callback(e);
      }
    }
  }, 500))
}

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    icon: path.join(__dirname, 'logo.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: false,
      preload: path.join(isDev ? __dirname : `${adjustedAppPath}/build/`, 'preload.js')
    }
  });

  // TODO: https://github.com/electron/electron/issues/21445
  let trayIcon = new Tray(nativeImage.createFromPath(path.join(__dirname, 'trayIcon.png')));
  const trayMenuTemplate = [
    {
      label: 'PsyNeuLink Documentation',
      click: async () => {
        const { shell } = require('electron')
        await shell.openExternal('https://princetonuniversity.github.io/PsyNeuLink/')
      }
    },
    {
      label: 'Open an issue',
      click: async () => {
        const { shell } = require('electron')
        await shell.openExternal('https://github.com/MetaCell/PsyNeuLinkView/issues/new')
      }
    },
    {
      label: 'Close PsyNeuLink Viewer',
      click: function () {
        if (process.platform !== "darwin") {
          app.quit();
        }
      }
    }
  ]

  let trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
  trayIcon.setContextMenu(trayMenu);

  var splash = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    center: true,
  });

  splash.loadURL(`file://${__dirname}/splash.html`);
  splash.center();

  win.once('ready-to-show', () => {
    splash.close();
    win.show();
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    debug();
    win.webContents.once("dom-ready", async () => {
      await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
          .then((name) => console.log(`Added Extension:  ${name}`))
          .catch((err) => console.log("An error occurred: ", err))
          .finally(() => {
              win.webContents.openDevTools({mode: "detach"});
          });
      }
    );
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  const isMac = process.platform === 'darwin';

  const template = [
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    {
      label: 'File',
      submenu: [
        {
          id: 'open-dialog',
          label: 'Open model',
          enabled: false,
          accelerator: 'CmdOrCtrl+O',
          click: () => {
          const files = dialog.showOpenDialogSync(win, {
            properties: ['openFile'],
            filters: [
              { name: 'Python files', extensions: ['py'] },
            ]
          });

          const openFiles = (file) => {
            // Send to the renderer the path of the file to open/
            win.webContents.send("fromMain", {type: messageTypes.OPEN_FILE, payload: file});
            // GRPC call
            watch(file, (e) => {
              win.webContents.send("fromMain", {type: messageTypes.FILE_UPDATED, payload: file});
            })
          }

          if (files) { openFiles(files[0]); }
        }},
        {
          id: 'save-dialog',
          label: 'Save model',
          enabled: true,
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            let files = dialog.showSaveDialogSync(win, {
              title: 'Save to File…',
              filters: [
                { name: 'All Files', extensions: ['py'] }
              ]
            });
            if(files) {
              win.webContents.send("fromRPC", {type: rpcMessages.BACKEND_ERROR, payload: {
                message: 'Saving models is not yet supported.',
                stack: 'File should be saved at ' + files
              }});
            }
          }
        },
        isMac ? { role: 'close', label: 'Close viewer' } : { role: 'quit', label: 'Close PsyNeuLink Viewer' },
      ]
    },
    {
      label: 'PNL Settings',
      submenu: [
        {
          id: 'select-conda-env',
          label: 'Select Conda Environment', accelerator: 'CmdOrCtrl+K', click: () => {

            win.webContents.send("fromMain", {type: messageTypes.SELECT_CONDA_ENV, payload: undefined});
        }},
        {
          id: 'select-pnl-folder',
          label: 'Select PsyNeuLink local repository', accelerator: 'CmdOrCtrl+U', click: async () => {
          const dir = dialog.showOpenDialogSync(win, {
            properties: ['openDirectory'],
          });

          const openPNLFolder = async (dir) => {
            // Send to the renderer the path of the file to open
            appState.resetAfterCondaSelection();
            await psyneulinkHandler.installPsyneulinkDev(dir);
            await checkDependenciesAndStartServer();
          }

          if (dir) {
            await openPNLFolder(dir[0]);
          }
        }},
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ])
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'PsyNeuLink Documentation',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://princetonuniversity.github.io/PsyNeuLink/')
          }
        },
        {
          label: 'Open an issue',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://github.com/MetaCell/PsyNeuLinkView/issues/new')
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  let myItem = Menu.getApplicationMenu().getMenuItemById('open-dialog');
  if (appState.getState() < 2) {
    myItem.enabled = false;
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('close', () => {
  psyneulinkHandler.stopServer();
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.dock.setIcon(path.join(__dirname, 'logo.png'));
  app.dock.bounce();
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// ### PsyNeuLinkView specific code ###

async function checkDependenciesAndStartServer() {
  let counter = 0;
  let transitions = [stateTransitions.FOUND_PNL, stateTransitions.INSTALL_VIEWER_DEP, stateTransitions.START_SERVER];

  while (counter < transitions.length) {
    let conditionMet = await appState.transitions[transitions[counter]].next();
    switch (transitions[counter]) {
      case stateTransitions.FOUND_PNL:
        if (conditionMet) {
          win.webContents.send("fromMain", {type: messageTypes.PNL_FOUND, payload: psyneulinkHandler.getCondaEnv()});
        } else {
          win.webContents.send("fromMain", {type: messageTypes.PNL_NOT_FOUND, payload: undefined});
        }
        break;
      case stateTransitions.INSTALL_VIEWER_DEP:
        if (conditionMet) {
          win.webContents.send("fromMain", {type: messageTypes.INSTALL_VIEWER_DEP, payload: undefined});
        } else {
          win.webContents.send("fromRPC", {type: rpcMessages.BACKEND_ERROR, payload: {
            message: 'Viewer dependencies installation error',
            stack: 'There has been an error installing the viewer dependencies, please check the logs in your home folder.'
          }});
        }
        break;
      case stateTransitions.START_SERVER:
        if (conditionMet) {
          const request = {
            'method': rpcAPIMessageTypes.GET_INITIAL_VALUES,
            'params': undefined,
          }
          // eslint-disable-next-line no-loop-func
          grpcClient.apiCall(request, (response) => {
              const parsedResponse = JSON.parse(response.getGenericjson())
              win.webContents.send("fromMain", {type: messageTypes.SERVER_STARTED, payload: parsedResponse});
              Menu.getApplicationMenu().getMenuItemById('open-dialog').enabled = true;
          // eslint-disable-next-line no-loop-func
          }, (error) => {
            win.webContents.send("fromRPC", {type: rpcMessages.BACKEND_ERROR, payload: error});
          });
        }
        break;
      default:
        break;
      }
    counter++;
  }
}

// Events from the renderer process that needs to be handled by the main thread.
ipcMain.on("toMain", async (event, args) => {
  switch (args.type) {
    case messageTypes.RELOAD_APPLICATION:
      // Message from the frontend, specifically the App component that instantiate the entire frontend application
      // a reload event is set in the componentDidMount method of the App component to capture that event and propagate it to the main thread.
      appState.resetState();
      break;
    case messageTypes.INSTALL_PSYNEULINK:
      appState.resetAfterCondaSelection();
      await psyneulinkHandler.installPsyneulink();
      await checkDependenciesAndStartServer();
      break;
    case messageTypes.FRONTEND_READY:
      appState.transitions[stateTransitions.FRONTEND_READY].next();
      await checkDependenciesAndStartServer();
      break;
    case messageTypes.CONDA_ENV_SELECTED:
      if (args.payload !== psyneulinkHandler.getCondaEnv()) {
        appState.resetAfterCondaSelection();
        await psyneulinkHandler.setCondaEnv(args.payload);
        await checkDependenciesAndStartServer();
      }
      break;
    case messageTypes.OPEN_INPUT_FILE:
      const input_files = dialog.showOpenDialogSync(win, {
        properties: ['openFile'],
        filters: [
          { name: 'Python files', extensions: ['py'] },
        ]
      });

      const openInputFiles = (file) => {
        inputFile = file;
        win.webContents.send("fromMain", {type: messageTypes.INPUT_FILE_SELECTED, payload: file});
      }

      if (input_files) { openInputFiles(input_files[0]); }
      break;
    default:
      break;
  }
});

// Events from the renderer process that needs to be handled by the main thread.
ipcMain.on("toRPC", async (event, args) => {
  switch (args.type) {
    case rpcMessages.LOAD_MODEL:
      grpcClient.loadModel(args.payload, (response) => {
        const model = response.getModeljson();
        win.webContents.send("fromRPC", {type: rpcMessages.MODEL_LOADED, payload: model});
      }, (error) => {
        win.webContents.send("fromRPC", {type: rpcMessages.BACKEND_ERROR, payload: error});
      });
      break;
    case rpcMessages.UPDATE_PYTHON_MODEL:
      updateInProgress = true;
      grpcClient.updateModel(args.payload, (response) => {
        updateInProgress = false;
        debounceCheck = true;
        if (response.getResponse() === 2) {
          win.webContents.send("fromRPC", {type: rpcMessages.BACKEND_ERROR, payload: response});
        } else {
          win.webContents.send("fromRPC", {type: rpcMessages.PYTHON_MODEL_UPDATED, payload: response});
        }
      }, (error) => {
        updateInProgress = false;
        win.webContents.send("fromRPC", {type: rpcMessages.BACKEND_ERROR, payload: error});
      });
      break;
    case rpcMessages.RUN_MODEL:
      updateInProgress = true;
      grpcClient.runModel(args.payload, (response) => {
        updateInProgress = false;
        debounceCheck = true;
        const resultCode = response.getResponse();
        const results = response.getMessage();
        if (resultCode === 2) {
          win.webContents.send("fromRPC", {type: rpcMessages.BACKEND_ERROR, payload: response});
        } else {
          win.webContents.send("fromRPC", {type: rpcMessages.SEND_RUN_RESULTS, payload: results});
        }
      }, (error) => {
        win.webContents.send("fromRPC", {type: rpcMessages.BACKEND_ERROR, payload: error});
      });
      break;
    default:
      break;
  }
});
