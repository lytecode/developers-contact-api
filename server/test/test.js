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

// describe('Developer', () => {
//     //empty the database before each test
//     beforeEach((done) => {
//         Developer.deleteMany({}, (err) => {
//             done();
//         });
//     });


//Let's test the GET route
// describe('GET /developers', () => {
//     it('should get all developers contact', (done) => {
//         chai.request(app)
//             .get('/api/v1/developers')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('array')
//                 res.body.length.should.be.eql(0);

//                 done();
//             });
//     });
// });


/* Test POST route */
describe('POST /developers', () => {
    it('it should not post a developer without firstName, lastName, phoneNumber, devType or address field', (done) => {
        const developer = {
            "firstName": "Basil",
            "lastName": "Mbonu",
            "phoneNumber": "08138247755",
            "address": "Tokyo",
        };

        chai.request(app)
            .post('/api/v1/developers')
            .send(developer)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('should POST a developer', (done) => {
        const developer = {
            "firstName": "Basil",
            "lastName": "Mbonu",
            "devType": "fullstack",
            "phoneNumber": "08138247755",
            "address": "Tokyo",
        };

        chai.request(app)
            .post('/api/v1/developers')
            .send(developer)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Developer successfully added!');
                res.body.developer.should.have.property('_id');
                res.body.developer.should.have.property('firstName');
                res.body.developer.should.have.property('lastName');
                res.body.developer.should.have.property('devType');
                res.body.developer.should.have.property('phoneNumber');
                res.body.developer.should.have.property('address');
                done();
            });
    });
});


// Test for getting all developers
describe('GET /developers', () => {
    it('it should get all developers', (done) => {
        chai.request(app)
            .get('/api/v1/developers')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('developers');
                done();
            });
    });
});






// });