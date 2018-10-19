'use strict';

const
      express = require('express'),
      users = require('./userRoute'),
      training = require('./trainingsRoute'),
      participate = require('./participateRoute'),
      certifications = require('./certificationsRoute');

let router = express.Router();

router.use('/users', users);
router.use('/training', training);
router.use('/participate', participate);
router.use('/certifications', certifications);


module.exports = router;
