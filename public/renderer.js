const { ipcRenderer } = require('electron');

document.getElementById('startServerButton').addEventListener('click', () => {
  ipcRenderer.send('start-server');
});

setTimeout(()=>{
  ipcRenderer.send('start-server');
},1000)