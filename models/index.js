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
const Destination = require('../models/Destination');
const Trip = require('../models/Trip');
const User = require('../models/User');
const Itinerary = require('../models/Itinerary')

User.belongsToMany(Destination, {
   
    through: {
      model: Trip,
      unique: false
    },
   
    as: 'planned_trips'
  });
  
    Destination.belongsToMany(User, {
    through: {
      model: Trip,
      unique: false
    },
    as: 'location_travellers'
  });
  
  module.exports = { User, Destination, Trip, Itinerary};