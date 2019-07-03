'use strict';
// import {Training} from "../../../src/app/trainings/training";

/**
 * Participate Controller
 * @module participateController
 * @require jwtHelper
 * @require models
 * @require asyncLib
 */
//TODO Use the isSubscribe attribute in DB to know who is participating and who has canceled
const
  jwtHelper   = require('../../helpers/jwtHelper'),
  models     = require('../../database/models'),
  asyncLib   = require('async'),
  unsubscribe = 0,
  subscribe   = 1;

let subscribeTraining,
    unsubscribeTraining,
    isParticipateTraining,
    ParticipateUserTraining;

/**
 * @function subscribeTraining
 * @desc Make a user participate to a training if he is authenticated
 * @param req
 * @param res
 * @returns {Object} Training
 */
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
      if(!userAlreadyParticipate && trainingFound.availableSeat > 0){
        trainingFound.addUser(userFound)
          .then(function (alreadyParticipate){
            done(null, trainingFound, userFound);
          })
          .catch(function (err){
            console.log(err);
            return res.status(500).json({ 'error' : 'unable to set user participation'});
          })
      }else {
        res.status(409).json({ 'error': 'user already participate or there is no more available seat' });
      }
    },
    function(trainingFound, userFound, done){
      if(trainingFound.availableSeat > 0){
        trainingFound.update({
          availableSeat: trainingFound.availableSeat - 1,
        }).then(function(){
          done(trainingFound);
        }).catch(function(err){
          res.status(500).json({ 'error': 'can\'t update the training\'s available seat'});
        });
      }else{
        res.status(409).json({ 'error': 'There is no more available seat' });
      }
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

/**
 * @function unsubscribeTraining
 * @desc Make a user unsubscribe to a training if he is authenticated and if he subscribe to it in a first place
 * @param req
 * @param res
 * @returns {Object} Training
 */
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

/**
 * @function unsubscribeTraining
 * @desc Let know if a user is already participating in training
 * @param req
 * @param res
 * @returns {Object} Training
 */
isParticipateTraining = (req, res) => {
  // Getting auth header
  let headerAuth  = req.headers['authorization'],
      userId      = jwtHelper.getUserId(headerAuth),
      trainingId  = parseInt(req.params.trainingId);

  let participate = false;

  console.log("training id est " + trainingId);
  console.log("user id est " + userId);
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
              if(userAlreadyParticipate){
                participate = true;
              }
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
    ], function(trainingFound) {
      if(participate){
        return res.status(201).json(participate);
      }else{
        return res.status(201).json(participate)
      }
    }
  )
};

/**
 * @function unsubscribeTraining
 * @desc Send back the training for which the user have been subscribed
 * @param req
 * @param res
 * @returns {Object} Training
 */
ParticipateUserTraining = (req, res) => {
  // Getting auth header
  let headerAuth = req.headers['authorization'],
      userId = jwtHelper.getUserId(headerAuth);

      models.Participate.findAll({
        include: [{
          model: models.Training, as: 'training',
        }],
        where: {userId: userId}
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

module.exports = {
  subscribeTraining,
  unsubscribeTraining,
  isParticipateTraining,
  ParticipateUserTraining
};
