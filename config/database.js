// why is sequelize in green and not in blue?
const sequelize = require('sequelize');
// const mongoose = require('mongoose')
require('dotenv').config();
// const { User } = require('../models')

// grab DB string from that file
// const conn = process.env.DB_STRING;

// we create connection with that string with the createConnection method on the sequelize object
const connection = new sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        useNewUrlParser: true,
        useUnifiedTopology: true
        // options above suppress any warning messages
    });

// creates simple schema for a user. The hash and salt are derived from the user's input
// const UserSchema = new mongoose.Schema({
//     username: String,
//     hash: String,
//     salt: String
// });

// we create model for that user based on the schema
// const User = connection.model('User', UserSchema);

// Export the connection so we can use it in other files
module.exports = connection;