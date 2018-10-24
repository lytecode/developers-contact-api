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
            "address": "Lagos",
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
            "address": "Lagos",
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


// Test for GET /developers/id getting a particular developer by id
describe('GET /developers/:id', () => {
    it('it should return a developer details by id', (done) => {
        chai.request(app)
            .get('/api/v1/developers/5bd0436ed64ddc09acaf92c1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('developer');
                done();
            });
    });
    it('it should return 404 if no developer is found', (done) => {
        chai.request(app)
            .get('/api/v1/developers/5bd02c979494a60bacd0ce97') //wrong id
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eql("No contact with the given id found");
                done();
            });
    });
});


//Test for ( PUT /developers/id ) updating a developer contact details by id
describe('PUT /developers/id', () => {
    it('it should not update a developer without firstName, lastName, phoneNumber, devType or address field', (done) => {
        chai.request(app)
            .put('/api/v1/developers/5bd0436ed64ddc09acaf92c1')
            .send({
                "lastName": "Mbonu",
                "devType": "frontend",
                "phoneNumber": "08138247755",
                "address": "Tokyo",
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });
    it('should not update a developer detail if the id cannot be found or is incorrect', (done) => {
        chai.request(app)
            .put('/api/v1/developers/5bd02c979494a60ba')
            .send({
                "firstName": "Basil",
                "lastName": "Mbonu",
                "devType": "Backend",
                "phoneNumber": "08138247755",
                "address": "Lagos, Nigeria",
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('message').a('string');
                done();
            })
    });
    it('should update a developer detail if all field are available', (done) => {
        chai.request(app)
            .put('/api/v1/developers/5bd0436ed64ddc09acaf92c1')
            .send({
                "firstName": "Basil",
                "lastName": "Mbonu",
                "devType": "Backend",
                "phoneNumber": "08138247755",
                "address": "Lagos, Nigeria",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('developer');
                done();
            })
    });
});


// Test for delete developer by id
describe('DELETE /developers/:id', () => {
    it('it should not delete a developer if the given id is not found', (done) => {
        chai.request(app)
            .delete('/api/v1/developers/5bd02c97900000000000') //wrong id
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message').a('string');
                done();
            });
    });
    it('it should delete a developer with a given id', (done) => {
        chai.request(app)
            .delete('/api/v1/developers/5bd0436ed64ddc09acaf92c1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').a('string');
                done();
            });
    });
});



// });