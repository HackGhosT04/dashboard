import { app, BrowserWindow } from 'electron';
import path from 'path';

// Manually define __dirname for ES module context
const __dirname = path.dirname(new URL(import.meta.url).pathname);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')  
    }
  });

  // During development, load from the Vite server
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');  // Vite dev server URL
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));  // Production build
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
