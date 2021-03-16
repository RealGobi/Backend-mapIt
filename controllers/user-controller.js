const uuid = require('uuid/v4');
const HttpError = require('../models/http.error');
const { validationResult } = require('express-validator');
const User = require('../models/user');


const getUsers = async(req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError('Fetching users failed, please tyr agin.', 500);
    return next(error);
  }

  res.json({users: users.map(u => u.toObject({getters: true}))}); 
};

const signUpUser = async (req, res, next) => {

  const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return next(new HttpError('Unable to signup, please check your data, password min 6 character.', 422)); 
    }
  
  const { name, email, password } = req.body;

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
    places: []
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

const logInUser = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError('Login failed, please tyr agin.', 500);
    return next(error);
  }

  if(!existingUser || existingUser.password !== password) {
    const error = new HttpError('Login failed, please tyr agin.', 401);
    return next(error);
  }

  res.json({msg: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signUpUser = signUpUser;
exports.logInUser = logInUser;