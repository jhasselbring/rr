"use strict";
/** Import Libs */
const WebSocket = require('ws');

module.exports = flags => {
    var ws = {};
    function createConnection(){
        ws = new WebSocket('ws://' + flags.server);
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
};