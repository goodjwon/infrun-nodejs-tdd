const utils = require('./util');
const assert = require('assert');

describe('util.js module 에 대문자 함수', () => {
    it('문자열을 첫 문자를 대문자로 변경한다.', () => {
        const result = utils.captalise('hello');
        assert.equal(result, 'Hello');
    })
})