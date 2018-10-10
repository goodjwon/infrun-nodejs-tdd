const app = require('./index');
const request = require('supertest');
const should = require('should')

describe('GET /user는, ', () => {
    describe('성공.', () => {
        it('유저를 배열로 담은 객체로 리턴함', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    console.log(res.body);
                    done();
                })
        });

        it('최대 limit 갯수만큼 응답 한다.', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.length(2)
                    console.log(res.body);
                    done();
                })
        })
    })

    describe('실패시', () => {
        it('limit 숫자형이 아니면 400을 리턴한다.', (done) => {
            request(app)
                .get('/users?limit=a')
                .expect(400)
                .end(done)
        })
    })
});

describe('GET /user/1는', () => {
    describe('성공시', () => {
        it('id가 1인 유저 객체를 반환한다.', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                })
        })
    })

    describe('실패시', () => {
        it('아이디가 숫자형이 아니면 400을 리턴한다.', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done)
        });

        it('id로 사용자를 찾을 수 없을 경우 404을 리턴한다.', (done) => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done)
        })
    })
});

describe('GET /user/1는', () => {
    describe('성공시', () => {
        it('204를 리턴한다.', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        })
    });
    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400을 리턴한다.', (done) => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        })
    });
});