const { app, globalShortcut, Notification, session, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const userAgent = 'Mozilla/5.0 (X11; CrOS x86_64 13904.66.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36';

function createWindow () {
    setSessionParams();
    Menu.setApplicationMenu(null);

    const mainWindow = new BrowserWindow({
        show: false,
        title: "Geforce NOW",
        webPreferences: {
            nodeIntegration: false
        },
        icon: path.join(__dirname,'assets/icons/gfn64.png')
    })

    mainWindow.on('close', function (event) {
        if(!app.isQuiting){
            event.preventDefault();
            mainWindow.hide();
        }
    
        return false;
    });    

    createTray(mainWindow);
    mainWindow.loadURL('https://play.geforcenow.com/mall/');
    mainWindow.maximize();

    setKeyHandling();
}

function setKeyHandling() {
    globalShortcut.register('F11', () => {
        let currentWindow = BrowserWindow.getFocusedWindow();
        let newFullscreenMode = !currentWindow.isFullScreen();
        currentWindow.setFullScreen(newFullscreenMode);
    });
}

function createTray(mainWindow) {
    let trayIconPath = path.join(__dirname,'assets/icons/gfn32.png');
    let trayIcon = new Tray(trayIconPath);

    const trayMenuTemplate = [
        {
            label: 'Show',
            click: function () {
                mainWindow.show();
            }
        },
        
        {
            label: 'Hide',
            click: function () {
                mainWindow.hide();
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
});