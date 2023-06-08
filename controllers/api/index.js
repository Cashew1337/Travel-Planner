const router = require('express').Router();
const { appendFile } = require('fs');
const destinationRoutes = require('./destinationRoutes');
const tripRoutes = require('./tripRoutes');
const userRoutes = require('./userRoutes');


router.use('/destinations', destinationRoutes);
router.use('/users', userRoutes);
router.use('/trips', tripRoutes);


module.exports = router;