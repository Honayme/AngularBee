'use strict';

const
  express = require('express'),
  userController = require('../../controllers/api/userController');

let router = express.Router();

router.post('/register', userController.register);
// router.get('/users/:id', userController.getUsersWithId());

module.exports = router;
