/* global require, process, __dirname */

const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

const ipc = require('./electron/ipcMain')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1024,
    minHeight: 768
  })

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  ipc.init(mainWindow)
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
