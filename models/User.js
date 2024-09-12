const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    email: { type: String, required: true, unique: true, validate: [validator.isEmail, 'Email inválido']},
    registrationNumber: { type: String, required: true },
    currentPeriod: { type: String, required: true },
    password: { type: String, required: true}
});

const User = mongoose.model('user', userSchema);

module.exports = User;
