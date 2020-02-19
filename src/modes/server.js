"use strict";
console.log('Server');
/** Import Libs */
const WebSocket = require('ws');
const uuid = require('uuid');
const os = require('os-utils');

let clients = {};

module.exports = flags => {
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
            console.log(pl);
        });
    }

    wss.on('connection', (ws, req) => {
        let id = uuid.v4();
        clients[id].push(ws);
        ws.on('close', (code, reason) => {
            delete clients[id];
        });
    });
    setInterval(broadcast, flags.freq);
};