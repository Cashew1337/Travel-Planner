const Destination = require('./Destination');
const Trip = require('./Trip');
const User = require('./User');

User.hasMany(Trip, {
  foreignKey: 'userId'
});

Destination.belongsToMany(User, {
  through: {
    model: Trip,
    unique: false
  },
  as: 'location_travellers'
});

module.exports = { User, Destination, Trip };
