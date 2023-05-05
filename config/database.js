// why is sequelize in green and not in blue?
const sequelize = require('sequelize');

require('dotenv').config();

// grab DB string from that file
const conn = process.env.DB_STRING;

// we create connection with that string with the createConnection method on the sequelize object
const connection = sequelize.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // options above suppress any warning messages
});

// creates simple schema for a user. The hash and salt are derived from the user's input
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
});

// we create model for that user based on the schema
const User = connection.model('User', UserSchema);

// Export the connection so we can use it in other files
module.exports = connection;