'use strict';

const
  express = require('express'),
  participateController = require('../../controllers/api/participateController');

let router = express.Router();

router.post('/training/:trainingId/subscribe', participateController.subscribeTraining);
router.post('/training/:trainingId/unsubscribe', participateController.unsubscribeTraining);


module.exports = router;
