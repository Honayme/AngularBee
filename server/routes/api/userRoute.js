'use strict';

const
  express = require('express'),
  userController = require('../../controllers/api/userController');

let router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.getUserProfile);
// router.get('/users/:id', userController.getUsersWithId());

module.exports = router;
