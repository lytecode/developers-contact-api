const mongoose = require('mongoose');
const db = mongoose.connection;


mongoose.connect(process.env.DB || 'mongodb://localhost/dev-contact', { useNewUrlParser: true });
db.on('connected', () => console.log('db connected successfully'));
db.on('error', () => console.log('Ooops! something went wrong with db connection'));


module.exports = db;