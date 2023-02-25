const fs = require("fs");
const path = require("path");
const debug = require('electron-debug');
const isDev = require("electron-is-dev");
const { app, dialog, ipcMain, BrowserWindow, Menu, Tray } = require("electron");

const appPath = app.getAppPath();
const adjustedAppPath = isDev ? appPath : path.join(appPath, '../app.asar.unpacked');

const messageTypes = require('../src/messageTypes').messageTypes;
const appStateFactory = require('./appState').appStateFactory;
const appState = appStateFactory.getInstance();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: false, // turn off node integration
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(isDev ? __dirname : `${adjustedAppPath}/build/`, 'preload.js')
    }
  });

  var splash = new BrowserWindow({
    width: 1200, 
    height: 800, 
    transparent: true, 
    frame: false, 
    alwaysOnTop: true 
  });

  splash.loadURL(`file://${__dirname}/splash.html`);
  splash.center();

  setTimeout(function () {
    splash.close();
    win.show();
  }, 2500);


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
  const isMac = process.platform === 'darwin'

  let trayIcon = new Tray(path.join(__dirname, 'logo.png'))

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
          label: 'Open', accelerator: 'CmdOrCtrl+O', click: () => {
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
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("toMain", (event, args) => {
  switch (args.type) {
    case messageTypes.NEXT_STATE:
      appState.setNextState();
      let myItem = Menu.getApplicationMenu().getMenuItemById('open-dialog');
      if (appState.getState() >= appState.getStates().PNL_INSTALLED) {
        myItem.enabled = true;
      }
      break;
    default:
      console.log("Unknown message type: " + args.type);
      break;
  }
});