'use strict';

const
  express = require('express'),
  userController = require('../../controllers/api/UserController');

let router = express.Router();

router.get('/', userController.getUsers);
router.get('/all', userController.getUsers);
router.get('/signin', userController.signin);
// router.get('/users/:id', userController.getUsersWithId());

module.exports = router;
