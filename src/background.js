'use strict'
const electron = require('electron')
import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let imageWindow
let settingsWindow

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true })
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({  webPreferences: {webSecurity: false} , icon: 'assets/content-icon.png'})
  win.maximize()

  imageWindow = new BrowserWindow({ width: 400, height: 400, parent: win, show: false})
  settingsWindow = new BrowserWindow({ width: 400, height: 400, parent: win, show: false})

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    /*
    let view = new BrowserView({
      webPreferences: {
        nodeIntegration: false
      }
    })
    win.setBrowserView(view)
    view.setBounds({ x: 0, y: 0, width: 600, height: 600 })
    view.webContents.loadURL('https://translate.google.com/')
    */
    imageWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/#/image')
    settingsWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/#/settings')

    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  imageWindow.on('close', (event) =>{
    event.preventDefault()
    imageWindow.hide()
  })

  settingsWindow.on('close', (event) =>{
    event.preventDefault()
    settingsWindow.hide()
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools()
  }
  let displays = electron.screen.getAllDisplays()
  console.log(displays)
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('toggle-image', (event, args) =>{
  imageWindow.webContents.send('image', args)
  imageWindow.show()
})

ipcMain.on('toggle-settings', () =>{
  settingsWindow.isVisible() ? settingsWindow.hide() : settingsWindow.show()
})