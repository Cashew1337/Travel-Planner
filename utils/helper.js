const { json } = require("sequelize")

module.exports = {
    parseJson: (itineraryString) =>{
    return JSON.parse(itineraryString)


    },
    plusOne: (tripIndex) => {
        return tripIndex + 1
    },
    tripPic: (destination) => {
        return [destination.imageUrl];
    }
}