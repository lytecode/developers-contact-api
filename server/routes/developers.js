const Joi = require('joi');
const express = require('express');
const db = require('../config/db');
const Developer = require('../models/developer');
const router = express.Router();

//Get All developers
router.get('/developers', (req, res) => {
    Developer.find((err, developers) => {
        if (err) return res.status(404).send({ message: 'No developer in the db' });

        res.send(developers);
    });
});


//Get a conatact by id
router.get('/developers/:id', (req, res) => {
    Developer.findById({ _id: req.params.id }, (err, developer) => {
        if (err || !developer) return res.status(404).json({ message: 'No contact with the given id found' });


        res.status(200).send(developer);

    });
});


//Add a developer details
router.post('/developers', (req, res) => {

    const Schema = Joi.object().keys({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        phoneNumber: Joi.string().min(11).max(14).required(),
        devType: Joi.string().required(),
        address: Joi.string().required()
    });

    const { error } = Joi.validate(req.body, Schema);

    if (error) return res.status(400).send(error.details[0].message);


    const developer = new Developer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        devType: req.body.devType,
        address: req.body.address
    });

    developer.save();
    res.status(201).send(developer);
});


//remove a developer details
router.delete('/developers/:id', (req, res) => {
    Developer.findByIdAndRemove({ _id: req.params.id }, (err) => {
        if (err) return res.status(404).json();

        res.status(200).json();
    });
});

//update a developer's details
router.put('/developers/:id', (req, res) => {
    //update only address and devType
    Developer.findById({ _id: req.params.id }, (err, developer) => {
        if (err) return res.status(404).send('The contact with the given id does not exist');

        const updateSchema = Joi.object().keys({
            phoneNumber: Joi.string().min(11).max(14),
            devType: Joi.string().required(),
            address: Joi.string().required()
        });

        const { error } = Joi.validate(req.body, updateSchema);

        if (error) return res.status(400).send(error.details[0].message);

        //update the contact details
        developer.phoneNumber = req.body.phoneNumber;
        developer.address = req.body.address;
        developer.devType = req.body.devType;

        developer.save();

        res.send(developer);
    });
});



module.exports = router;