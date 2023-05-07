const Destination = require('../models/Destination');
const Trip = require('../models/Trip');
const User = require('../models/User');
const Itinerary = require('../models/Itinerary')

User.hasMany(Trip, {
  foreignKey: 'userId'
});

Trip.hasMany(User, {
  foreignKey: 'userId'
});

Destination.belongsToMany(User, {
  through: {
    model: Trip,
    unique: false
  },
  as: 'trip_destinations'
});

User.belongsToMany(Destination, {
  through: {
    model: Trip,
    unique: false
  },
  as: 'destination_travellers'
});

Destination.hasMany(Trip, {
  foreignKey: 'destinationId'
});

Trip.belongsTo(Destination, {
  foreignKey: 'destinationId'
});

Trip.hasMany(Itinerary, {
  foreignKey: 'tripId'
});

Itinerary.belongsTo(Trip, {
  foreignKey: 'tripId'
})

module.exports = { User, Destination, Trip, Itinerary };