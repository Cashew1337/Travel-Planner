const router = require('express').Router();
const withAuth = require('../utils/auth')
const { Op } = require('sequelize');
const { Destination, Itinerary, Trip, User } = require('../models');
const date = new Date();
let date_new = new Date();
let date_3 = new Date(date_new.setMonth(date_new.getMonth() + 3));

console.log(date.toISOString().split('T')[0], date_3.toISOString().split('T')[0]);

router.get('/', async (req, res) => {
    console.log('you have arrived')
    try {
        const tripData = await Trip.findAll({
            where: {
                startDate: {
                    [Op.between]: [date.toISOString().split('T')[0], date_3.toISOString().split('T')[0]]
                }
            },
            include: [{ model: Destination }]
        });
        // console.log(date, date_3);

        const trips = tripData.map((trip) => trip.get({ plain: true }));
        console.log(trips);

        res.render('homepage', {
            trips,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/destinations', async (req, res) => {
    try {
        const destinationData = await Destination.findAll({
            include: [
                {
                    model: Trip,
                    attributes: ['name', 'id']
                }
            ]
        });
        // console.log(date, date_3);

        const destinations = destinationData.map((destination) => destination.get({ plain: true }));

        // console.log(destinations)

        res.render('destinations', {
            destinations,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/destination/:id', async (req, res) => {
    try {
        const destinationData = await Destination.findByPk(req.params.id, {
            include: [
                {
                    model: Trip,
                    attributes: ['name']
                },
            ],
        });

        const destination = destinationData.get({ plain: true })

        res.render('destination', {
            ...destination,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/trips/:id', async (req, res) => {
    try {
        const tripData = await Trip.findByPk(req.params.id, {
            include: [
                {
                    model: Destination,
                    attributes: ['name'],
                },
                {
                    model: Itinerary,
                    attributes: ['events']
                },
            ],
        });

        const trips = tripData.get({ plain: true });
        console.log(tripData);


// console.log(trips.itineraries)
        res.render('trips', {
            ...trips,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/profile', withAuth, async (req, res) => {
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
        console.log(err)
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

router.get('/register', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;