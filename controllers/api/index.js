const router = require('express').Router();
const { appendFile } = require('fs');
const destinationRoutes = require('./destinationRoutes');
const tripRoutes = require('./tripRoutes');
const userRoutes = require('./userRoutes');
const profileRoutes = require('./profileRoutes');


router.use('/destinations', destinationRoutes);
router.use('/users', userRoutes);
router.use('/trips', tripRoutes);
router.use('/profile', profileRoutes);


module.exports = router;