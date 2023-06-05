const router = require('express').Router();
const { Itinerary } = require("../../models");

router.get('/', async (req, res) => {
    console.log('you have arrived')
    try {
        const itineraryData = await Itinerary.findAll();

        const itineraries = itineraryData.map((itinerary) => itinerary.get({ plain: true }));
        console.log(itineraries);

        res.status(200).json(itineraries);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;