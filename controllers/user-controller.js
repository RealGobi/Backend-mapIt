const uuid = require('uuid/v4');
const HttpError = require('../models/http.error');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const DUMMY_DATA = [
  {
    id: "u1",
    name: 'Jimmy',
    email: "jimmy@jimmy.se",
    password: 'test'
  }
];

const getUsers = ((req, res, next) => {
  res.status(200).json({users: DUMMY_DATA})
});

const signUpUser = async (req, res, next) => {

  const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return next(new HttpError('Unable to signup, please check your data, password min 6 character.', 422)); 
    }
  
  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError('Signingup failed, please tyr agin.', 500);
    return next(error);
  }
  if(existingUser) {
    const error = new HttpError('Email alredy in databas.', 422);
    return next(error);
  }

  const createUser = new User({
    name,
    email,
    image: 'https://en.wikipedia.org/wiki/File:Akha_cropped_hires.JPG',
    password,
    places
  });

  try {
    await createUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('Faild to create user', 500);
    return next(error);
  }
  res.status(201).json({user: createUser.toObject({ getters: true })})
};

const logInUser = ((req, res, next) => {
  const { email, password } = req.body;

  const user = DUMMY_DATA.find(u => u.email === email);
  if(!user || user.password !== password) {
    return next(new HttpError('No user with that email or password in databas.', 401));
  }
  res.json({msg: 'login'});
});

exports.getUsers = getUsers;
exports.signUpUser = signUpUser;
exports.logInUser = logInUser;