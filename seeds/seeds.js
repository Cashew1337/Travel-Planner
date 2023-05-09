const sequelize = require('../config/connection');
const { User, Destination, Trip, Itinerary } = require('../models');

const UserData = require('./userData.json');
const DestinationData = require('./destinationData.json');
const TripData = require('./tripData.json');
const ItineraryData = require('./itineraryData.json');
const { log } = require('console');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('syncing')
    await User.bulkCreate(UserData, {
      individualHooks: true,
      returning: true,
    }); // insert the users data into the database
    await Destination.bulkCreate(DestinationData); //insert destinations into data base
    await Trip.bulkCreate(TripData); // insert the trips data into the database 

    let modifiedItin = ItineraryData.map((itin) => {
      itin.events = JSON.stringify(itin.events)
      return itin;
    });


    await Itinerary.bulkCreate(modifiedItin);

    console.log('Database seeding complete');
  } catch (err) {
    console.error(err)
  }
};

seedDatabase();