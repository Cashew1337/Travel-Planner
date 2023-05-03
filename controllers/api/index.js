const router = require('express').Router();
const destinationRoutes = require('./desitnationRoutes');
const tripRoutes = require('./tripRoutes');
const userRoutes = require('./userRoutes');

router.use('/destinations', destinationRoutes);
router.use('/users', userRoutes);
router.use('/trips', tripRoutes);

module.exports = router;