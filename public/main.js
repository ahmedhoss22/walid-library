const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { PDFPrinter } = require('pdf-to-printer');

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

// ipcMain.on('print-pdf', async (event, pdfUrl) => {
//   console.log(pdfUrl); 

//   if (!mainWindow) return; 
//   console.log('Window URL:', mainWindow.webContents.getURL());

//   // mainWindow.loadURL(pdfUrl)

//   mainWindow.webContents.print({
//     silent: false, 
//     pageSize: 'A4', 
//     landscape: false, 
//     pdf: pdfUrl  

//   }, (success, error) => {
//     if (success) {
//       console.log('Printed successfully');
//     } else {
//       console.error('Failed to print:', error);
//     }
//   });
// });


// ipcMain.on('print-pdf', async (event, pdfUrl) => {
//   console.log('PDF URL:', pdfUrl);

//   if (!mainWindow) {
//     console.error('Main window is not available');
//     return;
//   }

//   // Load the PDF URL into the main window
//   mainWindow.loadURL(pdfUrl);

//   mainWindow.webContents.on('did-finish-load', () => {
//     console.log("web content finished !!");
//     // Once the PDF is loaded, print it
//     mainWindow.webContents.print({
//       silent: false,
//       pageSize: 'A4',
//       landscape: false
//     }, (success, error) => {
//       if (success) {
//         console.log('Printed successfully');
//       } else {
//         console.error('Failed to print:', error);
//       }
//     });
//   });
// });
ipcMain.on('print-pdf', async (event, pdfUrl) => {
  console.log('PDF URL:', pdfUrl);

  if (!mainWindow) {
    console.error('Main window is not available');
    return;
  }

  // Load the HTML page with the PDF viewer component
  mainWindow.loadURL(`file://${__dirname}/pdfViewer.html?pdfUrl=${encodeURIComponent(pdfUrl)}`);

  // Wait for the window to finish loading
  mainWindow.webContents.on('did-finish-load', () => {
    console.log("Web content finished loading");
    
    // Once the PDF content is loaded and displayed, initiate the printing process
    mainWindow.webContents.print({
      silent: false,
      pageSize: 'A4',
      landscape: false
    }, (success, error) => {
      if (success) {
        console.log('Printed successfully');
      } else {
        console.error('Failed to print:', error);
      }
    });
  });
});