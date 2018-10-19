'use strict';

const
  jwtHelper   = require('../../helpers/jwtHelper'),
  models     = require('../../database/models'),
  asyncLib   = require('async'),
  moment     = require('moment');

let createCertifications,
  getAllCertifications,
  getDetailCertifications,
  getUserCertifications,
  updateCertifications,
  deleteCertifications;


createCertifications = (req, res) => {
  // Getting auth header
  let headerAuth = req.headers['authorization'];
  let userId = jwtHelper.getUserId(headerAuth);

  let title = req.body.title,
      editor = req.body.editor,
      expertiseField = req.body.expertiseField,
      desc = req.body.desc,
      validity = req.body.validity,
      cost = req.body.cost,
      costHt = req.body.costHt,
      costTtc = req.body.costTtc,
      examDetail = req.body.examDetail,
      examDuration = req.body.examDuration,
      examNumber = req.body.examNumber;

  console.log(userId);

  if (title == null || editor == null || expertiseField == null || desc == null || validity == null || cost == null || costTtc == null || examDetail == null || examDuration == null || examNumber == null ) {
    return res.status(400).json({'error': 'missing parameters'})
  }

  if (title.length >= 40 || title.length <= 5) {
    return res.status(400).json({'error': 'Title must contain min 5 and max 40 letters'})
  }

  if (costTtc < 0 || costHt < 0) {
    return res.status(400).json({'error': 'Cost must be a positive'})
  }

  asyncLib.waterfall([
    function(done){
     models.User.findOne({
       where: {id : userId}
     })
       .then(function(userFound){
         done(null, userFound);
       })
       .catch(function(err){
         console.log(err);
         return res.status(500).json({'error': 'unable to verify user'})
       })
    },
    function(userFound, done){
      if(userFound){
        models.Certifications.create({
          title : title,
          editor : editor,
          expertiseField : expertiseField,
          desc : desc,
          validity : validity,
          cost : cost,
          costHt : costHt,
          costTtc : costTtc,
          examDetail : examDetail,
          examDuration : examDuration,
          examNumber : examNumber
        })
          .then(function(newCertifications){
            done(newCertifications);
          });
      } else{
        res.status(404).json({'error' : 'user not found'})
      }
    },
  ], function(newCertifications){
    if(newCertifications){
      return res.status(201).json(newCertifications)
    }else{
      return res.status(500).json({'error': 'cannot create certifications'})
    }
  });

};

getAllCertifications = (req, res) => {
  let fields = req.query.fields,
      limit  = parseInt(req.query.limit),
      offset = parseInt(req.query.offset),
      order  = req.query.order;

  models.Certifications.findAll({
    order:  [(order != null) ? order.split(':') : ['title', 'ASC']],
    attributes: (fields !== '*' && fields != null ) ? fields.split(',') : null,
    limit:  (!isNaN(limit)) ? limit : null,
    offset:  (!isNaN(offset)) ? offset : null,
  }).then(function (certifications) {
    if (certifications) {
      res.status(200).json(certifications);
    } else {
      res.status(404).json({"error" : "no training found" });
    }
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({"error": "invalid fields"});
  });
};

getDetailCertifications = (req, res) => {
  let fields= req.query.fields,
      limit = parseInt(req.query.limit),
      offset = parseInt(req.query.offset),
      order = req.query.order,
      certificationsId = req.params.id;

  models.Certifications.findAll({
    order:  [(order != null) ? order.split(':') : ['title', 'ASC']],
    attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
    limit: (!isNaN(limit)) ? limit : null,
    offset: (!isNaN(offset)) ? offset : null,
    where: {id: certificationsId}
  }).then(function(certifications) {
    if(certifications){
      res.status(200).json(certifications);
    } else {
      res.status(404).json({ "error": "no certifications found"});
    }
  }).catch(function(err){
    console.log(err);
    res.status(500).json({ "error":  "invalid fields"})
  });

};


module.exports  = {
  createCertifications,
  getAllCertifications,
  getDetailCertifications,
  getUserCertifications,
  updateCertifications,
  deleteCertifications,
};
