'use strict';

const
  express = require('express'),
  trainingController = require('../../controllers/api/trainingController');

let router = express.Router();

// router.post('/register', userController.register);
// router.post('/login', userController.login);
router.post('/create', trainingController.createTraining);
router.get('/all', trainingController.getAllTraining);
router.get('/detail', trainingController.getDetailTraining);
router.get('/trainingUser', trainingController.getUserTraining);
// router.put('/profile', userController.updateUserProfile);


module.exports = router;
