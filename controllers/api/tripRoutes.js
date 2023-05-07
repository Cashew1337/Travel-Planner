const router = require('express').Router();
const { Trip, Itinerary } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const tripData = await Trip.create(req.body);

        res.status(200).json(tripData)
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const tripData = await Trip.destroy({
            where: { id: req.params.id }
        });
        if (!tripData) {
            res.status(400).json({ message: 'No trip found with this id' });
            return;
        }
        res.status(200).json(tripData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const tripData = await Trip.findByPk(req.params.id, {
            include: [{}]
        })
    } catch (err) {
        
    }
})

module.exports = router;