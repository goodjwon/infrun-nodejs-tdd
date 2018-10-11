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

describe('DELETE /user/1는', () => {
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


describe('POST /users/ 는', () => {
    describe('성공시', () => {
        let body;
        before((done) => {
            request(app)
                .post('/users')
                .send({name: 'hjhapyy77'})
                .expect(201)    //201를 리턴한다.
                .end((err, res) => {
                    body = res.body;
                    done();
                });

        });

        it('객채 리턴한다.', () => {
            body.should.have.property('id');
        });

        it('입력한 값을 반환한다.', () => {
            body.should.have.property('name', 'hjhapyy77')
        });
    });
    describe('실패시', () => {
        it('name 파라미터 누락시 400을 리턴한다.', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);
        });
        it('name 중복일 경우 409를 리턴한다.', (done) => {
            request(app)
                .post('/users')
                .send({name: 'hjhapyy77'})
                .expect(409)
                .end(done);
        })
    })
});

describe('PUT /users/:id', () => {
    describe('성공시', () => {
            it('변경된 name를 리턴한다.', (done) => {
                request(app)
                    .put('/users/3')
                    .send({name: 'sopia'})
                    .end((err, res) => {
                        res.body.should.have.property('name', 'sopia');
                        done();
                    })
            })
        }
    );

    describe('실패시', () => {
        it('정수가 아닌 id일 경우 400을 응답합니다.', (done) => {
            request(app)
                .put('/users/1')
                .send({})
                .expect(400)
                .end(done)
        });

        it('없는 유저의 경우 404을 응답합니다.', (done) => {
            request(app)
                .put('/users/999')
                .send({name: 'foo'})
                .expect(404)
                .end(done)
        });

        it('이름이 중복일 경우 409을 응답합니다.', (done) => {
            request(app)
                .put('/users/3')
                .send({name: 'sopia'})
                .expect(409)
                .end(done)
        });

    })
})