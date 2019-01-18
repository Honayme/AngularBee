'use strict';

const
      express = require('express'),
      users = require('./userRoute'),
      training = require('./trainingsRoute'),
      participate = require('./participateRoute'),
      certifications = require('./certificationsRoute'),
      authHelper = require('../../helpers/jwtHelper');

let router = express.Router();

router.use('/users', users);
router.use('/training',  authHelper.checkAuthenticated, training);
router.use('/participate',  authHelper.checkAuthenticated, participate);
router.use('/certifications',  authHelper.checkAuthenticated, certifications);


module.exports = router;
