const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const placesController = require('../controllers/places-controller');

// GET
router.get('/:id', placesController.getPlaceById);
router.get('/user/:id', placesController.getPlacesByUserId);

// POST
router.post('/',
[
check('title').not().isEmpty(),
check('description').isLength({min: 5}),
check('address').not().isEmpty()
]
, placesController.createPlace);

// PATCH
router.patch('/:id',
[
check('title').not().isEmpty(),
check('description').isLength({min: 5})
]
, placesController.updatePlace);

// DELETE
router.delete('/:id', placesController.deletePlace);

module.exports = router;