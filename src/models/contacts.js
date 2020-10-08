const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: String,
    lastname: String, 
    phonenumber: String, 
    email: String,
    gender: String,
    relevant: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('contacts', ContactSchema);