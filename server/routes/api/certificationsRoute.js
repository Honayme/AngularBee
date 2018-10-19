'use strict';

const
  express = require('express'),
  certificationsController = require('../../controllers/api/certificationsController');

let router = express.Router();

router.post('/create', certificationsController.createCertifications);
router.get('/all', certificationsController.getAllCertifications);
router.get('/detail/:id', certificationsController.getDetailCertifications);
router.put('/update', certificationsController.updateCertifications);
router.delete('/delete/:id', certificationsController.deleteCertifications);

module.exports = router;
