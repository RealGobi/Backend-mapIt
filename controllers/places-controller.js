const HttpError = require('../models/http.error');
const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const Place = require('../models/place');

const getCoordsForAddress = require('../util/location');

let DUMMY_DATA = [
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


const getPlaceById = async (req, res, next) => {

  const placeId = req.params.id;
  console.log(placeId);
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError('Could not find a place', 500);
    return next(error);
  }

  if(!place) {
    return next(new HttpError('Could not find a place with provided id', 404));
  }
  res.json({place: place.toObject({getters:true})});
}

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let places;

  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError('Could not find a place(s) for user.', 500);
    return next(error);
  }

  if(!places) {
    return next(new HttpError('Could not find places with provided user id.', 404));
   }
 
  res.json({ places: places.map(place => place.toObject({ getters:true })) })
}

const createPlace = async (req, res, next) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    console.log(errors);
   return next(new HttpError('Unable to add a place, please check your data.', 422));
  }

  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title, 
    description,
    address,
    location: coordinates,
    image: 'https://sv.wikipedia.org/wiki/Portal:Huvudsida#/media/Fil:Terrakottaarm%C3%A9n-1.jpg',
    creator
  });

  try {
    await createdPlace.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('Faild to create place', 500);
    return next(error);
  }

  res.status(201).json({place: createdPlace});
}

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if(!errors.isEmpty()) {
    throw new HttpError('Unable to update, please check your data.', 422)
  }

  const { title, description } = req.body;
  const id = req.params.id;
  let place;

  try {
    place = await Place.findById(id);
  } catch (err) {
    const error = new HttpError('Update not successful, code 1', 500);
    return next(error);
  }


  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError('Update not successful, code 2', 500);
    return next(error);
  }

  res.status(200).json({place: place.toObject({getters:true})});
};

const deletePlace = (req, res, next) => {
  const id = req.params.id;
  if(!DUMMY_DATA.find(p => p.id === id)) {
    throw new HttpError('Unable to delete, no place with that id found.', 422)
  }
  DUMMY_DATA = DUMMY_DATA.filter(p => p.id !== id);
  res.status(200).json({msg: 'Deleted!'})
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;

exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;