const sequelize = require('../config/connection');
const { User, Destination, Trip, Itinerary } = require('../models');

const UserData = require('./userData.json');
const DestinationData = require('./destinationData.json');
const TripData = require('./tipData.json');
const ItineraryData = require('./itineraryData.json')

const seedDatabase = async () => {
    try {
      await User.bulkCreate(UserData); // insert the users data into the database
      await Trip.bulkCreate(TripData); // insert the trips data into the database
      await Destination.bulkCreate(DestinationData); //insert destinations into data base 
      await Itinerary.bulkCreate(ItineraryData);
  
      console.log('Database seeding complete');
    } catch (error) {
      console.log(error);
    }
  };
  
  seedDatabase();