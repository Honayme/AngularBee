'use strict';

const
  express = require('express'),
  trainingController = require('../../controllers/api/trainingController');

let router = express.Router();

router.post('/create', trainingController.createTraining);
router.get('/all', trainingController.getAllTraining);
router.get('/detail', trainingController.getDetailTraining);
router.get('/trainingUser', trainingController.getUserTraining);
router.put('/update', trainingController.updateTraining);
router.delete('/delete/:id', trainingController.deleteTraining);

module.exports = router;
