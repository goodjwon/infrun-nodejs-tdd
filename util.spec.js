const utils = require('./util');
const should = require('should');


describe('util.js module 에 대문자 함수', () => {
    it('문자열을 첫 문자를 대문자로 변경한다.', () => {
        const result = utils.captalise('hello');
        result.should.be.equal('Hello');
    })
})