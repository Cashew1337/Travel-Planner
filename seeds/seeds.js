const sequelize = require('../config/connection');
const { User, Destination, Trip } = require('../models');

const userData = require('./userData.json');
const DestinationData = require('./destinationData.json');
const TripData = require('./tipData.json');

const seedDatabase = async () => {
    try {
      await User.bulkCreate(usersData); // insert the users data into the database
      await Trip.bulkCreate(tripsData); // insert the trips data into the database
      await Destination.bulkCreate(destinationsData); //insert destinations into data base 
  
      console.log('Database seeding complete');
    } catch (error) {
      console.log(error);
    }
  };
  
  seedDatabase();