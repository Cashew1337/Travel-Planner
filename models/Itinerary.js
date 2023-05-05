const { Model, DataTypes, STRING } = require('sequelize');
const sequelize = require('../config/connection');

class Itinerary extends Model { }

Itinerary.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        destinationId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dates: {
            type: DataTypes.STRING,
            allowNull: false
        },
        events: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'itinerary',
    }
);

module.exports = Itinerary
