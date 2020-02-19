'use strict';
const assert = require('assert');
require('./config');
const flags = require('../src/includes/flags');

describe('Flags', function() {
    it('Port is 3000', function() {
        assert.equal(flags.port, '3000');
    });
    it('10.9.9.13 is allowed and is second on the list', function() {
        assert.equal(flags.ips.indexOf('10.9.9.13'), 1);
    });
    it('Frequency is every 5 seconds', function() {
        assert.equal(flags.freq, 5000);
    });
    it('CPU is visible', function() {
        assert.equal(flags.cpua, true);
    });
    it('Individual cores are private', function() {
        assert.equal(flags.cpuc, false);
    });
    it('RAM is visible', function() {
        assert.equal(flags.ram, true);
    });
    it('Server mode', function() {
        assert.equal(flags.mode, 'server');
    });
});