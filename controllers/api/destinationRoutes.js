const router = require('express').Router();
const { Destination, User, Trip } = require('../../models');

// Route to get all destinations
// router.get('/', async (req, res) => {
//     try {
//         const destinationData = await Destination.findAll();
//         res.status(200).json(destinationData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// Route to get destinations by id
router.get('/:id', async (req, res) => {
    try {
        const destinationData = await Destination.findByPk(req.params.id, {
            include: [{ model: Trip }, { model: User, through: Trip, as: 'destination_travellers' }]
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
        const destinationData = await Destination.create(req.body);
        res.status(200).json(destinationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to delete destinations
router.delete('/:id', async (req, res) => {
    try {
        const destinationData = await Destination.destroy({
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