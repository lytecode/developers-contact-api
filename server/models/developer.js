const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const developerSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    gender: String,
    devType: String,
    address: String
});

const Developer = mongoose.model('Developer', developerSchema);

module.exports = Developer;