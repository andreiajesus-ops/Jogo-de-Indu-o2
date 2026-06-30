const { app, BrowserWindow } = require("electron");
const path = require("path");

function criarJanela() {

    const win = new BrowserWindow({
        width: 1920,
        height: 1080,

        fullscreen: true,
        autoHideMenuBar: true,

        icon: path.join(__dirname, "icone.ico"),

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile("index.html");
}

app.whenReady().then(criarJanela);

app.on("window-all-closed", () => {
    app.quit();
});