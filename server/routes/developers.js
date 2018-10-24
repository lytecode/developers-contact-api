const Joi = require('joi');
const express = require('express');
const db = require('../config/db');
const Developer = require('../models/developer');
const router = express.Router();

//Get All developers
router.get('/developers', (req, res) => {
    Developer.find((err, developers) => {
        if (err) return res.status(404).json({ message: 'No developer in the db' });

        res.json(developers);
    });
});


//Get a conatact by id
router.get('/developers/:id', (req, res) => {
    Developer.findById({ _id: req.params.id }, (err, developer) => {
        if (err || !developer) return res.status(404).json({ message: 'No contact with the given id found' });


        res.status(200).json({ developer });

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

    if (error) return res.status(400).json({ message: error.details[0].message });


    const developer = new Developer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        devType: req.body.devType,
        address: req.body.address
    });

    developer.save();
    res.status(201)
        .json({ message: "Contact successfully added!", developer });
});


//remove a developer details
router.delete('/developers/:id', (req, res) => {
    Developer.deleteOne({ _id: req.params.id }, (err, developer) => {
        if (err) return res.status(404).json({ message: 'Contact not found' });

        res.status(200).json({ "message": 'Contact deleted successfully', developer });
    });
});

//update a developer's details
router.put('/developers/:id', (req, res) => {
    Developer.findById({ _id: req.params.id }, (err, developer) => {
        if (err) return res.status(404).json({ message: 'The contact with the given id does not exist' });

        const Schema = Joi.object().keys({
            firstName: Joi.string().min(3).required(),
            lastName: Joi.string().min(3).required(),
            phoneNumber: Joi.string().min(11).max(14).required(),
            devType: Joi.string().required(),
            address: Joi.string().required()
        });

        const { error } = Joi.validate(req.body, Schema);

        if (error) return res.status(400).json({ message: error.details[0].message });

        //update the contact details
        developer.firstName = req.body.firstName;
        developer.lastName = req.body.lastName;
        developer.phoneNumber = req.body.phoneNumber;
        developer.address = req.body.address;
        developer.devType = req.body.devType;

        developer.save();

        res.json({ message: 'Contact updated successfully!', developer });
    });
});

router.get('/category/', (req, res) => {

    let category = req.query.category.toLowerCase().trim();

    if (!category) return res.status(400).json({ message: 'Bad Request' });

    Developer.find({ devType: category }, (err, developers) => {
        if (err) return res.status(404).json({ message: 'Error occurred' });

        res.json({ developers });
    });
});



module.exports = router;