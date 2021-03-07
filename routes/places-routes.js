const express = require('express');
const router = express.Router();

const placesController = require('../controllers/places-controller');

// GET
router.get('/:id', placesController.getPlaceById);
router.get('/user/:id', placesController.getPlaceByUserId);

// POST
router.post('/', placesController.createPlace);

// PATCH
router.patch('/:id', placesController.updatePlace);

// DELETE
router.delete('/:id', placesController.deletePlace);

module.exports = router;