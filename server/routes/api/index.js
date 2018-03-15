'use strict';

const
  express = require('express'),
  users = require('./userRoute');

let router = express.Router();

router.use('/users', users);


module.exports = router;
