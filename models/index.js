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
  