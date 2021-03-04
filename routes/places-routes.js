const express = require('express');
const router = express.Router();

const placesController = require('../controllers/places-controller');

// GET
router.get('/:id', placesController.getPlaceById);
router.get('/user/:id', placesController.getPlaceByUserId);

// POST
router.post('/', placesController.createPlace);


module.exports = router;