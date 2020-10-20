const { create } = require('domain');
const { app, session, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const userAgent = 'Mozilla/5.0 (X11; CrOS armv7l 13099.85.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.110 Safari/537.36';

function createWindow () {
    setSessionParams();
    Menu.setApplicationMenu(null);

    const win = new BrowserWindow({
        show: false,
        title: "Geforce NOW",
        webPreferences: {
            nodeIntegration: false
        },
        icon: path.join('.','assets/icons/gfn64.png')
    })

    win.on('close', function (event) {
        if(!app.isQuiting){
            event.preventDefault();
            win.hide();
        }
    
        return false;
    });    

    createTray(win);
    win.loadURL('https://play.geforcenow.com/mall/');
    win.maximize();
}

function createTray(win) {
    let trayIconPath = path.join('.','assets/icons/gfn32.png');
    let trayIcon = new Tray(trayIconPath);

    const trayMenuTemplate = [
        {
            label: 'Show',
                click: function () {
                win.show();
            }
        },
        
        {
            label: 'Hide',
            click: function () {
                win.hide();
            }
        },
        
        {
            label: 'Quit',
            click: function () {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]    
    let trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
    trayIcon.setContextMenu(trayMenu);

    app.on('before-quit', function (evt) {
        trayIcon.destroy();
    });
    
}

function setSessionParams() {
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['User-Agent'] = userAgent;
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });
}

app.whenReady().then(createWindow)

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})