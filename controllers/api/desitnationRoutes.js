const router = require('express').Router();
const { Desitnation, User, Trip } = require('../../models');

// Route to get all destinations
router.get('/', async (req, res) => {
    try {
        const destinationData = await Desitnation.findAll();
        res.status(200).json(destinationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get destinations by id
router.get('/:id', async (req, res) => {
    try {
        const destinationData = await Desitnation.findByPk(req.params.id, {
            include: [{ model: User, through: Trip, as: 'destination_travellers' }]
        });

        if (!destinationData) {
            res.status(404).json({ message: 'No destination found with that id' });
            return;
        }

        res.status(200).json(destinationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to post new destination
router.post('/', async (req, res) => {
    try {
        const destinationData = await Desitnation.create(req.body);
        res.status(200).json(destinationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to delete destinations
router.delete('/:id', async (req, res) => {
    try {
        const destinationData = await Desitnation.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!destinationData) {
            res.status(404).json({ message: 'No destination found with that id' });
            return;
        }

        res.status(200).json(destinationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;