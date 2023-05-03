const { Model, DataTypes } = require('sequelize');
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
        events: [
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                date: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                time: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                location: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                details: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            }
        ]
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
