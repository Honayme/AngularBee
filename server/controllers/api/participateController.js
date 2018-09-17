'use strict';

const
  jwtHelper   = require('../../helpers/jwtHelper'),
  models     = require('../../database/models'),
  asyncLib   = require('async'),
  unsubscribe = 0,
  subscribe    = 1;

let subscribeTraining,
    unsubscribeTraining;


subscribeTraining = (req, res) =>{
  // Getting auth header
  let headerAuth  = req.headers['authorization'];
  let userId      = jwtHelper.getUserId(headerAuth);

  let trainingId = parseInt(req.params.trainingId);

  console.log("training id est " + trainingId);
  console.log("user id est " + userId);
  if(trainingId <=0){
    return res.status(400).json({'error': 'invalid parameters'});
  }
//TODO if availiable sit are less or equal to 0 don't retire 1 sit
  asyncLib.waterfall([
    function(done) {
      models.Training.findOne({
        where: {id: trainingId}
      })
      .then(function(trainingFound){
        done(null, trainingFound);
      })
      .catch(function(err){
        console.log(err);
        return res.status(500).json({ 'error': 'unable to verify training'})
      });
    },
    function(trainingFound, done){
      if(trainingFound) {
        models.User.findOne({
          where: { id: userId}
        })
        .then(function(userFound){
          done(null, trainingFound, userFound);
        })
        .catch(function(err){
          console.log(err);
          return res.status(500).json({ 'error': 'unable to verify user'})
        });
      }else{
        res.status(404).json({ 'error': 'the training doesn\'t exist'});
      }
    },
    function(trainingFound, userFound, done){
      if(userFound){
        models.Participate.findOne({
          where: {
            userId: userId,
            trainingId: trainingId
          }
        })
        .then(function(userAlreadyParticipate){
          done(null, trainingFound, userFound, userAlreadyParticipate);
        })
        .catch(function(err){
          console.log(err);
          return res.status(500).json({ 'error': 'unable to verify if the user already participate to the training'});
        })
      }else{
        res.status(404).json({ 'error': 'the user doesn\'t exist'})
      }
    },
    function(trainingFound, userFound, userAlreadyParticipate, done){
      if(!userAlreadyParticipate){
        trainingFound.addUser(userFound, { isSubscribe: subscribe })
          .then(function (alreadyParticipate){
            done(null, trainingFound, userFound);
          })
          .catch(function (err){
            console.log(err);
            return res.status(500).json({ 'error' : 'unable to set user participation'});
          })
      }else {
        if (userAlreadyParticipate.isSubscribe === unsubscribe || userAlreadyParticipate.isSubscribe === null) {
          userAlreadyParticipate.update({
            isSubscribe: subscribe,
          }).then(function() {
            done(null, trainingFound, userFound);
          }).catch(function(err) {
            console.log(err);
            res.status(500).json({ 'error': 'cannot update user reaction' });
          });
        } else {
          res.status(409).json({ 'error': 'user already participate ' });
        }
      }
    },
    function(trainingFound, userFound, done){
      trainingFound.update({
        availableSeat: trainingFound.availableSeat - 1,
      }).then(function(){
        console.log(trainingFound);
        done(trainingFound);
      }).catch(function(err){
        console.log(err);
        res.status(500).json({ 'error': 'can\'t update the training\'s available seat'});
      });
    },
  ], function(trainingFound) {
      if(trainingFound){
        return res.status(201).json(trainingFound);
      }else{
        return res.status(500).json({'error': 'can\'t update available seat'})
      }
    }
  )
};


unsubscribeTraining = (req, res) => {
  // Getting auth header
  let headerAuth  = req.headers['authorization'];
  let userId      = jwtHelper.getUserId(headerAuth);

  let trainingId = parseInt(req.params.trainingId);

  if(trainingId <=0){
    return res.status(400).json({'error': 'invalid parameters'});
  }

  asyncLib.waterfall([
      function(done) {
        models.Training.findOne({
          where: {id: trainingId}
        })
          .then(function(trainingFound){
            done(null, trainingFound);
          })
          .catch(function(err){
            console.log(err);
            return res.status(500).json({ 'error': 'unable to verify training'})
          });
      },
      function(trainingFound, done){
        if(trainingFound) {
          models.User.findOne({
            where: { id: userId}
          })
            .then(function(userFound){
              done(null, trainingFound, userFound);
            })
            .catch(function(err){
              console.log(err);
              return res.status(500).json({ 'error': 'unable to verify user'})
            });
        }else{
          res.status(404).json({ 'error': 'the training doesn\'t exist'});
        }
      },
      function(trainingFound, userFound, done){
        if(userFound){
          models.Participate.findOne({
            where: {
              userId: userId,
              trainingId: trainingId
            }
          })
            .then(function(userAlreadyParticipate){
              done(null, trainingFound, userFound, userAlreadyParticipate);
            })
            .catch(function(err){
              console.log(err);
              return res.status(500).json({ 'error': 'unable to verify if the user already participate to the training'});
          })
        }else{
          res.status(404).json({ 'error': 'the user doesn\'t exist'})
        }
      },
      function(trainingFound, userFound, userAlreadyParticipate, done){
        if(userAlreadyParticipate){
          userAlreadyParticipate.destroy()
            .then(function (doNotParticipate){
              done(null, trainingFound, userFound);
            })
            .catch(function (err){
              console.log(err);
              return res.status(500).json({ 'error' : 'cannot remove user participation'});
            })
        }else{
          res.status(409).json({'error': 'the user has already unsubscribe to the training'})
        }
      },
      function(trainingFound, userFound, done){
        trainingFound.update({
          availableSeat: trainingFound.availableSeat + 1,
        }).then(function(){
          done(trainingFound);
        }).catch(function(err){
          console.log(err);
          res.status(500).json({ 'error': 'can\'t update the training\'s available seat'});
        });
      },
    ], function(trainingFound) {
      if(trainingFound){
        return res.status(201).json(trainingFound);
      }else{
        return res.status(500).json({'error': 'can\'t update available seat'})
      }
    }
  )
};

module.exports = {
  subscribeTraining,
  unsubscribeTraining
};
