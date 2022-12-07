const { app, globalShortcut, Notification, session, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const userAgent = 'Mozilla/5.0 (X11; CrOS x86_64 13982.82.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.157 Safari/537.36';
app.commandLine.appendSwitch("enable-features", "VaapiVideoDecoder");

function createWindow () {
    setSessionParams();
    Menu.setApplicationMenu(null);

    const mainWindow = new BrowserWindow({
        show: false,
        title: "Geforce NOW",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: false,
            nodeIntegration: false,
            nativeWindowOpen: false
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
    mainWindow.loadURL('https://play.geforcenow.com/');
    mainWindow.maximize();

    setKeyHandling();
}

function setKeyHandling() {
    globalShortcut.register('F11', () => {
        let currentWindow = BrowserWindow.getFocusedWindow();
        let newFullscreenMode = !currentWindow.isFullScreen();
        currentWindow.setFullScreen(newFullscreenMode);
    });
    globalShortcut.register('CommandOrControl+Alt+Shift+Left', () => {
        let currentWindow = BrowserWindow.getFocusedWindow();
        currentWindow.webContents.goBack();
    });
    globalShortcut.register('CommandOrControl+Alt+Shift+Right', () => {
        let currentWindow = BrowserWindow.getFocusedWindow();
        currentWindow.webContents.goForward();
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
            label: 'Reload',
            click: function () {
                mainWindow.reload();
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

app.on("browser-window-created", function (e, window) {
    window.webContents.setUserAgent(userAgent);
});