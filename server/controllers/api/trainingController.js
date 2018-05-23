'use strict';

const bcrypt     = require('bcrypt'),
      jwtUtils   = require('../../utils/jwtHelper'),
      models     = require('../../models/models'),
      asyncLib   = require('async');

let createTraining,
    getAllTraining;
    // getDetailTraining,
    // getUserTraining,
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
  }).then(function(advert) {
    if (advert) {
      res.status(200).json(advert);
    } else {
      res.status(404).json({ "error": "no advert found" });
    }
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({ "error": "invalid fields" });
  });
};


module.exports = {
  createTraining,
  getAllTraining
};
