const HttpError = require('../models/http.error');
const uuid = require('uuid/v4');

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

const getPlaceById = (req, res, next) => {

  const placeId = req.params.id;
  console.log(placeId);
  const place = DUMMY_DATA.find(p => {
    return p.id === placeId;
  });

  if(!place) {
    return next(new HttpError('Could not find a place with provided id', 404));
  }

  res.json({place});
}

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.id;
  const place = DUMMY_DATA.find( up => {
    return up.creator === userId;
  });

  if(!place) {
    return next(new HttpError('Could not find a place with provided user id', 404));
   }
 
  console.log('/user/:id');
  res.json({place})
}

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuid(),
    title, 
    description,
    location: coordinates,
    address,
    creator
  }

  DUMMY_DATA.push(createdPlace);
  res.status(201).json({place: createdPlace});
}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;

exports.createPlace = createPlace;