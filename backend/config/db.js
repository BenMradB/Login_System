require('dotenv').config();
const mongoose = require('mongoose');

const DB_URI = process.env.DATABASE_URI.replace('<password>', process.env.DATABASE_PASSWORD);

module.exports.connect = async () => {
    try {
        const con = await mongoose.connect(DB_URI);

        if (!con) return console.log('Connection With The Data Base Failed For Some Reason ...');

        return console.log('App Connected With The DataBase ...');
    } catch (err) {
        console.log(err);
        process.exit();
    }
};