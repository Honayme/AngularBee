'use strict';

const
      jwtUtils   = require('../../utils/jwtHelper'),
      models     = require('../../models/models'),
      asyncLib   = require('async');

let createTraining,
    getAllTraining,
    getDetailTraining,
    getUserTraining;
    // updateTraining,
    // deleteTraining;
createTraining = (req, res) => {
  // Getting auth header
  let headerAuth  = req.headers['authorization'];
  let userId      = jwtUtils.getUserId(headerAuth);

  //Param
  let name          = req.body.name,
      description  = req.body.description,
      duration      = req.body.duration,
      date          = req.body.date,
      hour          = req.body.hour,
      place         = req.body.place,
      availableSeat = req.body.availableSeat;

  //TODO ajouter des contraintes sur les paramètres si il y en a.

  asyncLib.waterfall([
    function(done){
      models.User.findOne({
        where : {id: userId}
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
        models.Training.create({
          name          : name,
          description   : description,
          duration      : duration,
          date          : date,
          hour          : hour,
          place         : place,
          availableSeat : availableSeat,
          UserId        : userFound.id
        })
          .then(function(newTraining){
            done(newTraining);
          });
      } else {
        res.status(404).json({'error' : 'user not found'});
      }
    },
  ], function(newTraining){
    if (newTraining){
      return res.status(201).json(newTraining);
    }else{
      return res.status(500).json({'error': 'cannot create training'});
    }
  });
};

getAllTraining = (req, res) =>{
  let fields  = req.query.fields;
  let limit   = parseInt(req.query.limit);
  let offset  = parseInt(req.query.offset);
  let order   = req.query.order;


  models.Training.findAll({
    order:      [(order != null) ? order.split(':') : ['name', 'ASC']],
    attributes: ['name'],
    limit:      (!isNaN(limit)) ? limit : null,
    offset:     (!isNaN(offset)) ? offset : null,
    include: [{
      model: models.User,
      attributes: [ 'firstname' ]
    }]
  }).then(function(training) {
    if (training) {
      res.status(200).json(training);
    } else {
      res.status(404).json({ "error": "no training found" });
    }
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({ "error": "invalid fields" });
  });
};

getDetailTraining= (req, res) => {
  let fields  = req.query.fields;
  let limit   = parseInt(req.query.limit);
  let offset  = parseInt(req.query.offset);
  let order   = req.query.order;


  models.Training.findAll({
    order:      [(order != null) ? order.split(':') : ['name', 'ASC']],
    attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
    limit:      (!isNaN(limit)) ? limit : null,
    offset:     (!isNaN(offset)) ? offset : null,
    include: [{
      model: models.User,
      attributes: [ 'firstname' ]
    }]
  }).then(function(training) {
    if (training) {
      res.status(200).json(training);
    } else {
      res.status(404).json({ "error": "no Training found" });
    }
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({ "error": "invalid fields" });
  });
};


getUserTraining = (req, res) => {
  let headerAuth = req.headers['authorization'];
  let userId     = jwtUtils.getUserId(headerAuth);

  let fields  = req.query.fields;

  asyncLib.waterfall([
    function(done) {
      models.User.findOne({
        where: { id: userId }
      })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          console.log("1st function when try to find user "+err);
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
    },
    function(userFound, done) {
      if (userFound) {
        models.Training.findAll({
          attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
          where: {userId: userId},
          include: [{
            model: models.User,
            attributes: ['firstname']
          }]
        })
          .then(function (userTrainingFound) {
            done(userTrainingFound);
          });
      } else {
        res.status(404).json({'error': 'user not found'});
      }
    }
  ], function(userTrainingFound) {
    if (userTrainingFound) {
      return res.status(201).json(userTrainingFound);
    } else {
      return res.status(500).json({ 'error': 'cannot find the required Training' });
    }
  });
};


module.exports = {
  createTraining,
  getAllTraining,
  getDetailTraining,
  getUserTraining
};
