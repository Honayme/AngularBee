'use strict';

const
  express = require('express'),
  certificationsController = require('../../controllers/api/certificationsController');

let router = express.Router();

router.post('/create', certificationsController.createCertifications);

module.exports = router;
