const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const developerSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    devType: {
        type: String,
        enum: ['frontend', 'backend']
    },
    address: String
});

const developer = mongoose.model('Developer', developerSchema);

module.exports = developer;