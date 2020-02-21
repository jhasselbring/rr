"use strict";
const flag = require('flags');

flag.defineString('listen', false, 'Run app as client and listen to the provided socket.');

/* Server stuff */
flag.defineInteger('port', 80, "Set the port where server is going to listen to.");
flag.defineInteger('freq', 1000, "Set how often the service will broadcast its information(ms).");

flag.parse();

let port = flag.get('port');
let mode = (flag.get('listen') !== false) ? 'client': 'server';
let server = flag.get('listen');
let freq = flag.get('freq');

const flags = {
    server,
    port,
    mode,
    freq,
};