const express = require('express');

const router = express.Router();

const HttpError = require('../models/http.error');

const DUMMY_DATA = [
  {
    id: '1',
    title: 'My house',
    description: 'were I live',
    location: {
      lat:57.6978115,
      lgn:12.2831768
    },
    address: 'Legendvägen 36',
    creator: 'u1'
  }
];

router.get('/:id', (req, res, next) => {

  const placeId = req.params.id;
  console.log(placeId);
  const place = DUMMY_DATA.find(p => {
    return p.id === placeId;
  });

  if(!place) {
    return next(new HttpError('Could not find a place with provided id', 404));
  }

  console.log(place);
  console.log('/:id');
  res.json({place});
});

router.get('/user/:id', (req, res, next) => {
  const userId = req.params.id;
  const place = DUMMY_DATA.find( up => {
    return up.creator === userId;
  });

  if(!place) {
    return next(new HttpError('Could not find a place with provided user id', 404));
   }
 
  console.log('/user/:id');
  res.json({place})
});

module.exports = router;