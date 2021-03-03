const express = require('express');

const router = express.Router();

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
  console.log(place);
  console.log('hello from GET in places');
  res.json({place});
});

module.exports = router;