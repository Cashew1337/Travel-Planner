const router = require('express').Router();
const { Destination, Itinerary, Trip, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const tripData = await Trip.findAll({
            where: {
                startDate: {
                    $between: [
                        Date.now(), Date.setMonth(Date.getMonth() + 3)
                    ]
                }
            }
        });

        const trips = tripData.map((trip) => trip.get({ plain: true }));

        res.render('homepage', {
            trips,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/trip/:id', async (req, res) => {
    try {
        const tripData = await Trip.findByPk(req.params.id, {
            include: [
                {
                    model: Destination,
                    attributes: ['name'],
                },
            ],
        });

        const trip = tripData.get({ plain: true });

        res.render('trips', {
            ...trip,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/profile', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Trip }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});