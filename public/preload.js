const { contextBridge, ipcRenderer } = require('electron');

const validChannels = {
    send: ['example-send-channel'], // Add any channels you wish to send messages to the main process
    receive: ['example-receive-channel'], // Add channels you listen on from the main process
    sendReceive: ['dialog:openMultiFileSelect'] // Example for send and receive
};

contextBridge.exposeInMainWorld('electronAPI', {
    send: (channel, data) => {
        if (validChannels.send.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    on: (channel, func) => {
        if (validChannels.receive.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
    invoke: (channel, data) => {
        if (validChannels.sendReceive.includes(channel)) {
            return ipcRenderer.invoke(channel, data);
        }
    }
});
