const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User Name Is Required Field ...']
    },
    email: {
        type: String,
        required: [true, 'Email Is A Required Field ...'],
        unique: [true, 'That Email Already Under An Account ...'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password Is A Required Field ...'],
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);