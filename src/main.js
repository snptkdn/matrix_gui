const { app, Menu, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

let mainWindow;

function createWindow() {
    //mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow = new BrowserWindow({
      webPreferences: {
      nodeIntegration: true
      }
    });
    mainWindow.maximize();

    mainWindow.loadFile("index.html");

    // 開発ツールを有効化
    mainWindow.webContents.openDevTools();

    Menu.setApplicationMenu(null);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
