const express = require('express');
const userController = require('../controllers/user-controller');

const router = express.Router();

router.get('/', userController.getUsers);

//signup
router.post('/signup', userController.signUpUser);

//login
router.post('/login', userController.logInUser);

module.exports = router;