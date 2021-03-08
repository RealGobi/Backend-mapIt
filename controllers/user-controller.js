const uuid = require('uuid/v4');
const HttpError = require('../models/http.error');
const { validationResult } = require('express-validator');


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

const signUpUser = ((req, res, next) => {

  const errors = validationResult(req);
    if(!errors.isEmpty()) {
      throw new HttpError('Unable to signup, please check your data, password min 6 character.', 422)
    }
  
  const { name, email, password } = req.body;
  const emailInDB = DUMMY_DATA.find(s => s.email === email);

  if(emailInDB) {
    throw new HttpError('Email alredy in databas.', 422)
  }

  const createUser = {
    id: uuid(),
    name, 
    email,
    password
  }

  DUMMY_DATA.push(createUser)
  res.status(201).json({user: createUser})
});

const logInUser = ((req, res, next) => {
  const { email, password } = req.body;

  const user = DUMMY_DATA.find(u => u.email === email);
  if(!user || user.password !== password) {
    throw new HttpError('No user with that email or password in databas.', 401)
  }
  res.json({msg: 'login'});
});

exports.getUsers = getUsers;
exports.signUpUser = signUpUser;
exports.logInUser = logInUser;