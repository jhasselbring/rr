"use strict";
/** Import Libs */
const WebSocket = require('ws');
const flag = require('flags');

flag.defineString('listen', "localhost:7770", 'Run app as client and listen to the provided socket.');
flag.parse();
let server = flag.get('listen');

(server => {
    var ws = {};
    console.log("Listening to: " + server);
    function createConnection(){
        ws = new WebSocket('ws://' + server);
    }
    createConnection();
    ws.on('message', data =>  {
        console.log(JSON.parse(data));
    });
    ws.on('close', () =>  {
        createConnection();
        ws.on('message', data =>  {
            console.log(JSON.parse(data));
        });
    });
})(server);
