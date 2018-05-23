'use strict';

const
      express = require('express'),
      users = require('./userRoute'),
      training = require('./trainingsRoute');

let router = express.Router();

router.use('/users', users);
router.use('/training', training);


module.exports = router;
