'use strict';

const
  express = require('express'),
  userController = require('../../controllers/api/userController'),
  authHelper = require('../../helpers/jwtHelper');


let router = express.Router();

router.post('/register', userController.register);
router.post('/login',  userController.login);
router.get('/profile', authHelper.checkAuthenticated,  userController.getUserProfile);
router.put('/profile',  authHelper.checkAuthenticated, userController.updateUserProfile);

module.exports = router;
