"use strict";
/** Fire up the app mode */
const flags = require("./includes/flags.js");
require('./modes/'+ flags.mode + '.js')(flags);