"use strict";
const flag = require('flags');

flag.defineString('listen', false, 'Run app as client and listen to the provided socket.');

/* Server stuff */
flag.defineInteger('port', 8080, "Set the port where server is going to listen to.");
flag.defineInteger('freq', 1000, "Set how often the service will broadcast its information(ms).");

flag.parse();

let port = flag.get('port');
let mode = (flag.get('listen') === false) ? 'server': 'client';
let server = flag.get('listen');
let freq = flag.get('freq');

module.exports = {
    server,
    port,
    mode,
    freq,
};