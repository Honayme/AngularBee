'use strict';

const
  express = require('express'),
  certificationsController = require('../../controllers/api/certificationsController');

let router = express.Router();

/**
 * Create a certification
 *
 * @name Create a certification
 * @route {POST} /certifications/create
 */
router.post('/create', certificationsController.createCertification);
router.get('/all', certificationsController.getAllCertifications);
router.get('/detail/:id', certificationsController.getDetailCertification);
router.put('/update', certificationsController.updateCertification);
router.delete('/delete/:id', certificationsController.deleteCertification);

module.exports = router;
