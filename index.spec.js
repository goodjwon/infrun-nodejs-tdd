const app = require('./index');
const request = require('supertest');

describe('GET /user는, ', () => {
    it('...', (done) => {
        request(app)
            .get('/users')
            .end((err, res) => {
                console.log(res.body);
                done();
            })
    })
});