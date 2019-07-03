'use strict';

const
  express = require('express'),
  participateController = require('../../controllers/api/participateController');

let router = express.Router();

router.post('/training/subscribe/:trainingId', participateController.subscribeTraining);
router.post('/training/unsubscribe/:trainingId', participateController.unsubscribeTraining);
router.get('/training/isSubscribe/:trainingId', participateController.isParticipateTraining);
router.get('/training/userTraining/', participateController.ParticipateUserTraining);


module.exports = router;
