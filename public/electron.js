/**
 * Electron Main Process file
 */
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const ipc = electron.ipc;
const Menu = electron.Menu;
const Tray = electron.Tray;
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

// let appIcon = null;
let mWin;
let winWidth = 350;
let winHeight = 600;

/*ipc.on("put-in-tray", function (evt) {
  const iconName = process.platform === "win32" ? "favicon.ico" : "favicon.png";
  const iconPath = isDev ? path.join(__dirname, iconName) : `file://${path.join(__dirname, "../build/" + iconName)}`
  appIcon = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([{
    label: "Show Window",
    click: function () {
      evt.sender.send("tray-removed")
    }
  }]);
});

ipc.on("remove-tray", function () {
  appIcon.destroy();
});*/

function createWindow() {
  mWin = new BrowserWindow({width: winWidth, height: winHeight, minWindth: winWidth, maxWidth: winWidth, minHeight: winHeight, maxHeight: winHeight, icon: `${path.join(__dirname, "../build/favicon.ico")}`, center: true, resizable: false});

  const startURL = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`;

  mWin.loadURL(startURL);

  mWin.on("closed", () => (mWin = null));
  
}

// mWin.OpenDevTools({detach: true})

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mWin === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.