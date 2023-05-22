const { ipcRenderer } = require("electron");
const interfaces = require('../src/client/interfaces/interfaces').interfaces;

// // Expose protected methods that allow the renderer process to use
// // the ipcRenderer without exposing the entire object
// contextBridge.exposeInMainWorld(
//     "api", {
//         send: (channel, data, callback) => {
//             // whitelist channels
//             let validChannels = ["toMain"];
//             if (validChannels.includes(channel)) {
//                 ipcRenderer.send(channel, data);
//                 if (callback) {
//                     callback();
//                 }
//             }
//         },
//         receive: (channel, func) => {
//             let validChannels = ["fromMain"];
//             if (validChannels.includes(channel)) {
//                 // Deliberately strip event as it includes `sender`
//                 ipcRenderer.on(channel, (event, ...args) => func(...args));
//             }
//         },
//         invoke: (channel, data, callback) => {
//             // whitelist channels
//             let validChannels = ["fromRenderer"];
//             if (validChannels.includes(channel)) {
//                 ipcRenderer.invoke(channel, data).then(response => {
//                     if (callback){
//                         callback(response)
//                     }
//                     console.log(response)
//                 });
//             }
//         },
//         rpcMessage: (channel, data, callback) => {
//             // whitelist channels
//             let validChannels = ["rpcMessage"];
//             if (validChannels.includes(channel)) {
//                 ipcRenderer.invoke(channel, data).then(response => {
//                     if (callback){
//                         callback(response)
//                     }
//                     console.log(response)
//                 });
//             }
//         },
//     }
// );

window.api = {};

window.api.send = (channel, data, callback) => {
    // whitelist channels
    let validChannels = ["toMain"];
    if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
        if (callback) {
            callback();
        }
    }
}

window.api.receive = (channel, func) => {
    let validChannels = ["fromMain"];
    if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
}

window.interfaces = interfaces;
