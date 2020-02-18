'use strict';
const assert = require('assert');
const app = require('../src/main.js');

process.argv.push('--port=1234');

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});