"use strict";
const flag = require('flags');

flag.defineString('listen', false, 'Run app as client and listen to the provided socket.');

/* Server stuff */
flag.defineStringList ('allowed-ips', '0.0.0.0', "Set list of IPs that are allowed to listen.");
flag.defineInteger('port', 8080, "Set the port where server is going to listen to.");
flag.defineInteger('freq', 1000, "Set how often the service will broadcast its information(ms).");
flag.defineBoolean('cpu-average', true, "Broadcast CPU average.");
flag.defineBoolean('cpu-cores', true, "Broadcast individual cores.");
flag.defineBoolean('ram', true, "Broadcast RAM");

flag.parse();

let port = flag.get('port');
let ips = flag.get('allowed-ips');
let mode = (flag.get('listen') === false) ? 'server': 'client';
let server = flag.get('listen');
let freq = flag.get('freq');
let cpua = flag.get('cpu-average');
let cpuc = flag.get('cpu-cores');
let ram = flag.get('ram');

module.exports = {
    server,
    port,
    ips,
    mode,
    freq,
    cpua,
    cpuc,
    ram
};