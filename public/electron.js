const fs = require("fs");
const path = require("path");
const debug = require('electron-debug');
const isDev = require("electron-is-dev");
const { app, dialog, ipcMain, nativeImage, BrowserWindow, Menu, Tray } = require("electron");

const appPath = app.getAppPath();
const adjustedAppPath = isDev ? appPath : path.join(appPath, '../app.asar.unpacked');

const appStates = require('../src/messageTypes').appStates;
const messageTypes = require('../src/messageTypes').messageTypes;
const stateTransitions = require('../src/messageTypes').stateTransitions;
const appState = require('./appState').appStateFactory.getInstance();
const psyneulinkHandler = require('../src/client/interfaces/psyneulinkHandler').psyneulinkHandlerFactory.getInstance();
const executeCommand = require('../src/client/interfaces/utils').executeCommand;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    icon: path.join(__dirname, 'logo.png'),
    webPreferences: {
      nodeIntegration: false, // turn off node integration
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
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
  
  let trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
  trayIcon.setContextMenu(trayMenu)

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

  const isPsyneulinkInstalled = await executeCommand('pip show psyneulink');
  console.log(isPsyneulinkInstalled);

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
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  const isMac = process.platform === 'darwin';

  const template = [
    // { role: 'appMenu' }
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
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [
        { 
          id: 'open-dialog',
          label: 'Open', 
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
            // Send to the renderer the path of the file to open
            win.webContents.send("fromMain", {type: messageTypes.OPEN_FILE, payload: file});
          }

          if (files) { openFiles(files[0]); }
        }},
        isMac ? { role: 'close' } : { role: 'quit' },
      ]
    },
    // { role: 'PsyNeuLinkViewMenu' }
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
            await prepareViewerDependencies();
          }

          if (dir) { 
            await openPNLFolder(dir[0]);
          }
        }},
      ]
    },
    // { role: 'viewMenu' }
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

async function checkPNLInstallation() {
  if (await psyneulinkHandler.isPsyneulinkInstalled()) {
    return true;
  }
  return false
}

async function continueFlowAfterPNLFound() {
  // TODO: install the python dependencies required, move the state machine and then start the server
  await psyneulinkHandler.installViewerDependencies();
  appState.transitions[stateTransitions.INSTALL_VIEWER_DEP].next();
  psyneulinkHandler.runServer();
  appState.transitions[stateTransitions.START_SERVER].next();
  win.webContents.send("fromMain", {type: messageTypes.SERVER_STARTED, payload: undefined});  
  Menu.getApplicationMenu().getMenuItemById('open-dialog').enabled = true;
}

async function prepareViewerDependencies() {
  if (await checkPNLInstallation()) {
    appState.transitions[stateTransitions.FOUND_PNL].next();
    win.webContents.send("fromMain", {type: messageTypes.PNL_FOUND, payload: psyneulinkHandler.getCondaEnv()});
    continueFlowAfterPNLFound();
  } else {
    win.webContents.send("fromMain", {type: messageTypes.PNL_NOT_FOUND, payload: undefined});
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
      await psyneulinkHandler.installPsyneulink();
      break;
    case messageTypes.FRONTEND_READY:
      appState.transitions[stateTransitions.FRONTEND_READY].next();
      await prepareViewerDependencies();
      break;
    case messageTypes.CONDA_ENV_SELECTED:
      if (args.payload !== psyneulinkHandler.getCondaEnv()) {
        psyneulinkHandler.stopServer();
        appState.resetAfterCondaSelection();
        await psyneulinkHandler.setCondaEnv(args.payload);
        await prepareViewerDependencies();
      }
      break;
    default:
      console.log("Unknown message type: " + args.type);
      break;
  }
});