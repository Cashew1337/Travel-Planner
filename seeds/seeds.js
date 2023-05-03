const sequelize = require('../config/connection');
const { User, Destination, Trip, Itinerary } = require('../models');

const UserData = require('./userData.json');
const DestinationData = require('./destinationData.json');
const TripData = require('./tripData.json');
const ItineraryData = require('./itineraryData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: false });
  console.log('syncing')
      // await User.bulkCreate(UserData); // insert the users data into the database
      await Destination.bulkCreate(DestinationData); //insert destinations into data base
      await Trip.bulkCreate(TripData); // insert the trips data into the database 
      // await Itinerary.bulkCreate(ItineraryData);
  
      console.log('Database seeding complete');
    
  };
  
  seedDatabase();