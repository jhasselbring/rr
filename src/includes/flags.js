const flag = require('flags');

flag.defineInteger('port', 8080, );
flag.defineInteger('freq', 1000, );
flag.defineStringList ('allowed-ips', '0.0.0.0');
flag.defineBoolean('client-mode', false);
flag.defineBoolean('cpu-average', true);
flag.defineBoolean('cpu-cores', true);
// flag.defineInteger('age', 21, 'Your age in whole years');
// flag.defineNumber('height', 1.80, 'Your height in meters');
// flag.defineStringList('pets', []);
// flag.defineMultiString('hobby', []);

flag.parse();
let port = flag.get('port');
let ips = flag.get('allowed-ips');
let client = flag.get('client-mode');
let freq = flag.get('freq');
let cpua = flag.get('cpu-average');
let cpuc = flag.get('cpu-cores');

module.exports = {
    port,
    ips,
    client,
    freq,
    cpua,
    cpuc
};