const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ensure userController methods are defined and properly imported
if (userController && userController.signup && userController.login) {
  router.post('/signup', userController.signup);
  router.post('/signin', userController.login);
} else {
  console.error('User controller methods are not defined properly');
}

module.exports = router;
