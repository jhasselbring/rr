/** Import Libs */
const {app, Menu, Tray} = require('electron');

let tray = null;
app.on('ready', () => {
    tray = new Tray(__dirname + '/desktop.png');
    tray.setToolTip('You are broadcasting your resources');
    tray.displayBalloon({
        icon: __dirname + '/desktop.png',
        title: "RR",
        content: "You are now broadcasting your resources."
    });
    const contextMenu = Menu.buildFromTemplate([
        {label: 'Exit', type: 'normal', click: ()=>{app.quit()}},

    ]);
    tray.setContextMenu(contextMenu);
    main();
});

function main() {
    const flag = require('flags');

    /* Client stuff */
    flag.defineString('listen', false, 'Run app as client and listen to the provided socket.');

    /* Server stuff */
    flag.defineInteger('port', 7770, "Set the port where server is going to listen to.");
    flag.defineInteger('freq', 1000, "Set how often the service will broadcast its information(ms).");

    flag.parse();

    let port = flag.get('port');
    let mode = (flag.get('listen') !== false) ? 'client' : 'server';
    let server = flag.get('listen');
    let freq = flag.get('freq');

    const flags = {
        server,
        port,
        mode,
        freq,
    };

    if (flags.mode === 'server') {
        service(flags);
    } else {
        client(flags);
    }
}

function service(flags) {
    const WebSocket = require('ws');
    const uuid = require('uuid');
    const os = require('os-utils');
    let clients = [];
    (flags => {
        const wss = new WebSocket.Server({
            port: flags.port,
            perMessageDeflate: {
                zlibDeflateOptions: {
                    // See zlib defaults.
                    chunkSize: 1024,
                    memLevel: 7,
                    level: 3
                },
                zlibInflateOptions: {
                    chunkSize: 10 * 1024
                },
                // Other options settable:
                clientNoContextTakeover: true, // Defaults to negotiated value.
                serverNoContextTakeover: true, // Defaults to negotiated value.
                serverMaxWindowBits: 10, // Defaults to negotiated value.
                // Below options specified as default values.
                concurrencyLimit: 10, // Limits zlib concurrency for perf.
                threshold: 1024 // Size (in bytes) below which messages
                // should not be compressed.
            }
        });

        function broadcast() {
            let pl = {};
            pl.platform = os.platform();
            pl.countCPUs = os.cpuCount();
            pl.freemem = parseFloat((os.freemem()).toFixed(2));
            pl.totalmem = parseFloat((os.freemem()).toFixed(2));
            pl.freememPercentage = parseFloat((os.totalmem() * 100).toFixed(2));
            pl.sysUptime = os.sysUptime();
            pl.processUptime = parseInt(os.processUptime().toFixed(0));
            os.cpuUsage(v => {
                pl.cpuUsage = parseFloat((v * 100).toFixed(2));
            });
            console.log(pl);
            clients.forEach(ws => {
                ws.send(JSON.stringify(pl));
            })
        }

        wss.on('connection', (ws, req) => {
            let id = uuid.v4();
            ws.id = id;
            clients.push(ws);
            ws.on('close', (code, reason) => {
                clients.forEach((v, i) => {
                    console.log('Removed client: ' + id);
                    if (v.id === id) {
                        clients.splice(i, 1);
                    }
                })
            });
        });
        setInterval(broadcast, flags.freq);
    })(flags);
}

function client(flags) {
    (server => {
        const WebSocket = require('ws');
        var ws = {};
        console.log("Listening to: " + server);

        function createConnection() {
            ws = new WebSocket('ws://' + server);
        }

        createConnection();
        ws.on('message', data => {
            console.log(JSON.parse(data));
        });
        ws.on('close', () => {
            createConnection();
            ws.on('message', data => {
                console.log(JSON.parse(data));
            });
        });
    })(flags.server);
}