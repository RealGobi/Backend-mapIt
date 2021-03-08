const express = require('express');
const userController = require('../controllers/user-controller');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', userController.getUsers);

//signup
router.post('/signup', 
[
   check('name').not().isEmpty(),
   check('email').normalizeEmail().isEmail(),
   check('password').isLength({min: 6}),
   ],
userController.signUpUser);

//login
router.post('/login', userController.logInUser);

module.exports = router;