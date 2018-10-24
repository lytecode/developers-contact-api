//set the environment variable to use a test database
process.env.DB = 'mongodb://localhost/dev-contact_test'

console.log(process.env.DB);

const mongoose = require('mongoose');
const Developer = require('../models/developer');
const app = require('../app');

//import dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Developer', () => {
    //empty the database before each test
    beforeEach((done) => {
        Developer.deleteMany({}, (err) => {
            done();
        });
    });


    //Let's test the GET route
    describe('GET /developers', () => {
        it('should get all developers contact', (done) => {
            chai.request(app)
                .get('/api/v1/developers')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(0);

                    done();
                });
        });
    });



});