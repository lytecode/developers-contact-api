const express = require('express');
const db = require('../config/db');
const Developer = require('../models/developer');
const router = express.Router();

//Get All developers
router.get('/developers', (req, res) => {
    Developer.find((err, developers) => {
        if (err) res.status(404).send({ message: 'No developer in the db' });
        res.send(developers);
    });
});

//Add a developer details
router.post('/developers', (req, res) => {
    const dev = new Developer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        devType: req.body.devType,
        address: req.body.address
    });

    dev.save();
    res.status(201).send();
})

module.exports = router;