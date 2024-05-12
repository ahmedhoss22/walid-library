const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { PDFPrinter } = require('pdf-to-printer');
const { spawn } = require('child_process');

let isDev;
try {
  isDev = require('electron-is-dev').default;
} catch (err) {
  isDev = import('electron-is-dev').then(module => module.default);
}

let mainWindow; // Declare mainWindow outside of the function

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
    }
  });

  // Ensure isDev is loaded before proceeding
  isDev = await isDev;

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      :
      `file://${path.join(__dirname, '../build/index.html')}`
  );
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    app.quit();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('ready', () => {
  // Start your Node.js server
  const serverProcess = spawn('node', ["C:\\Users\\lenovo\\Desktop\\library\\server\\server.js"]);

  serverProcess.stdout.on('data', (data) => {
    console.log(`Server stdout: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Server stderr: ${data}`);
  });

  serverProcess.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
  })
});