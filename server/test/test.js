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
    //empty the test database before each test
    beforeEach((done) => {
        Developer.deleteMany({}, (err) => {
            done();
        });
    });


    //Confirm that the DB is empty before starting each test
    describe('GET /developers', () => {
        it('should get all developers contact', (done) => {
            chai.request(app)
                .get('/api/v1/developers')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('developers');
                    res.body.should.have.property('developers').a('array');
                    res.body.developers.length.should.be.eql(0);

                    done();
                });
        });
    });


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
            let developer = new Developer({
                "firstNmae": "Torti",
                "lastName": "Chigozirim",
                "devType": "Backend",
                "phoneNumber": "08130000555",
                "address": "Lagos",
            });
            developer.save((err, developer) => {
                chai.request(app)
                    .get(`/api/v1/developers/${developer._id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('developer');
                        done();
                    });
            });
        });
        it('it should return 404 if no developer is found', (done) => {
            chai.request(app)
                .get('/api/v1/developers/22') //wrong id
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
            let developer = new Developer({
                "firstNmae": "Torti",
                "lastName": "Chigozirim",
                "devType": "Backend",
                "phoneNumber": "081355251525",
                "address": "Lagos",
            });
            developer.save((err, developer) => {
                chai.request(app)
                    .put('/api/v1/developers/' + developer._id)
                    .send({ //no fist name
                        "lastName": "Chigozirim",
                        "devType": "FullStack",
                        "phoneNumber": "07030000000",
                        "address": "Lagos",
                    })
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        done();
                    });
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
            let developer = new Developer({
                "firstName": "Basil",
                "lastName": "Mbonu",
                "devType": "ios",
                "phoneNumber": "08138247755",
                "address": "Lagos, Tokyo",
            });
            developer.save((err, developer) => {
                chai.request(app)
                    .put('/api/v1/developers/' + developer._id)
                    .send({
                        "firstName": "Basil",
                        "lastName": "Mbonu",
                        "devType": "fullstack",
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

            })
        });
    });


    // Test for { GET /category/?category=backend } getting developers details by category
    describe('GET /category/?category', () => {
        it('it should return empty developrs array if the category provided does not exist ', (done) => {
            chai.request(app)
                .get('/api/v1//category/?category=piano')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('developers').a('array');
                    done();
                });
        });
        it('it should return developer(s) detail if the category provided exist ', (done) => {
            chai.request(app)
                .get('/api/v1//category/?category=backend')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('developers');
                    done();
                });
        });
    });


    // Test for delete developer by id
    describe('DELETE /developers/:id', () => {
        it('it should not delete a developer if the given id is not found', (done) => {
            let developer = new Developer({
                "firstName": "Basil",
                "lastName": "Mbonu",
                "devType": "Backend",
                "phoneNumber": "08138247755",
                "address": "Lagos, Tokyo",
            });
            developer.save((err, developer) => {
                chai.request(app)
                    .delete('/api/v1/developers/' + developer._id + 10) //wrong id
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').a('string');
                        done();
                    });
            });
        });
        it('it should delete a developer with a given id', (done) => {
            let developer = new Developer({
                "firstName": "Tik",
                "lastName": "Tak",
                "devType": "ios",
                "phoneNumber": "08138243455",
                "address": "Accra, Ghana",
            });
            developer.save((err, developer) => {
                chai.request(app)
                    .delete('/api/v1/developers/' + developer._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').a('string');
                        done();
                    });
            })
        });
    });



});