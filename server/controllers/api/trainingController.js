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
  let name = req.body.name,
      desccription = req.body.description,
      duration = req.body.duration,
      date = req.body.date,
      hour = req.body.hour,
      place = req.body.place,
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
          return res.status(500).json({'error': 'unable to verify user'})
        })
    }
  ], function(newTraining){

  });
};
