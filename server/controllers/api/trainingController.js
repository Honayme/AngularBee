'use strict';

const
      jwtHelper   = require('../../helpers/jwtHelper'),
      models     = require('../../database/models'),
      asyncLib   = require('async'),
      moment     = require('moment');

let createTraining,
    getAllTraining,
    getDetailTraining,
    getUserTraining,
    updateTraining,
    deleteTraining;

createTraining = (req, res) => {
  // Getting auth header
  let headerAuth  = req.headers['authorization'];
  let userId      = jwtHelper.getUserId(headerAuth);

  //TODO Get the picture
  //Param
  let name          = req.body.name,
      description   = req.body.description,
      duration      = req.body.duration,
      date          = req.body.date,
      hour          = req.body.hour,
      place         = req.body.place,
      totalSeat     = req.body.totalSeat,
      picture       = req.body.picture,
      theme         = req.body.theme;


  if (name == null || description == null || duration == null || date == null || hour == null || place == null || totalSeat == null || theme == null ) {
    return res.status(400).json({'error': 'missing parameters'})
  }

  if (name.length >= 40 || name.length <= 5) {
    return res.status(400).json({'error': 'Name must contain min 5 and max 40 letters'})
  }

  if (totalSeat <= 0) {
    return res.status(400).json({'error': 'Total seat must be a positive number'})
  }

  if (place.length >= 40 || place.length <= 0) {
    return res.status(400).json({'error': 'Place must contain min 5 and max 40 letters'})
  }

  if (description.length >= 500 || description.length <= 10) {
    return res.status(400).json({'error': 'description must contain min 10 and max 500 letters'})
  }

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
      if(userFound && moment(date, "YYYYMMDD").fromNow() > moment().format()){
        models.Training.create({
          name          : name,
          description   : description,
          duration      : duration,
          date          : date,
          hour          : hour,
          place         : place,
          availableSeat : totalSeat,
          totalSeat     : totalSeat,
          picture       : picture,
          theme         : theme,
          UserId        : userFound.id
        })
          .then(function(newTraining){
            done(newTraining);
          });
      } else {
        res.status(404).json({'error' : 'user not found or the date is before now'});
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
    attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
    limit:      (!isNaN(limit)) ? limit : null,
    offset:     (!isNaN(offset)) ? offset : null,
    include: [{
      model: models.User,
      attributes: [ 'firstname']
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
  let trainingId  = req.params.id;



  models.Training.findAll({
    order:      [(order != null) ? order.split(':') : ['name', 'ASC']],
    attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
    limit:      (!isNaN(limit)) ? limit : null,
    offset:     (!isNaN(offset)) ? offset : null,
    include: [{
      model: models.User,
      attributes: [ 'firstname' ]
    }],
    where: {id : trainingId}
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
  let userId     = jwtHelper.getUserId(headerAuth);

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

updateTraining = (req, res) => {

//Getting auth header
  let headerAuth  = req.headers['authorization'];
  let userId      = jwtHelper.getUserId(headerAuth);

  // Params
  let id          = req.body.id,
      name        = req.body.name,
      description = req.body.description,
      duration    = req.body.duration,
      date        = req.body.date,
      hour        = req.body.hour,
      place       = req.body.place,
      totalSeat   = req.body.totalSeat,
      picture     = req.body.picture,
      theme       = req.body.theme;

  if (name == null || description == null || duration == null || date == null || hour == null || place == null || totalSeat == null || theme == null  ) {
    return res.status(400).json({'error': 'missing parameters'})
  }

  if (name.length >= 40 || name.length <= 5) {
    return res.status(400).json({'error': 'Name must contain min 5 and max 40 letters'})
  }

  if (totalSeat <= 0) {
    return res.status(400).json({'error': 'Total seat must be a positive number'})
  }

  if (place.length >= 40 || place.length <= 0) {
    return res.status(400).json({'error': 'Place must contain min 5 and max 40 letters'})
  }

  if (description.length >= 500 || description.length <= 10) {
    return res.status(400).json({'error': 'description must contain min 10 and max 500 letters'})
  }

  asyncLib.waterfall([
    function(done) {
      models.Training.findOne({
        attributes: ['id','userId', 'name', 'description', 'duration', 'date', 'hour', 'place', 'totalSeat', 'availableSeat'],
        where: { id : id,
          userId: userId
        }
      }).then(function (trainingFound) {
        done(null, trainingFound);
      })
        .catch(function(err) {
          console.log(err);
          return res.status(500).json({ 'error': 'unable to found advert' });
        });
    },
    function(trainingFound, done) {
    console.log(moment(date, "YYYYMMDD").fromNow() > moment().format());
      if(trainingFound
        && trainingFound.totalSeat - trainingFound.availableSeat <= totalSeat
        && moment(date, "YYYYMMDD").fromNow() > moment().format()) {
        trainingFound.update({
          name: (name ? name : trainingFound.name),
          description: (description ? description : trainingFound.description),
          duration: (duration ? duration : trainingFound.duration),
          date: (date ? date : trainingFound.date),
          hour: (hour ? hour : trainingFound.hour),
          place: (place ? place : trainingFound.place),
          totalSeat: (totalSeat ? totalSeat : trainingFound.totalSeat),
          availableSeat: (totalSeat ? totalSeat - (trainingFound.totalSeat - trainingFound.availableSeat ) : trainingFound.availableSeat),
          picture: (picture ? picture : trainingFound.picture),
          theme: (theme ? theme : trainingFound.theme),
        }).then(function() {
          done(trainingFound);
        }).catch(function(err) {
          console.log("2nd function during the update " + err);
          res.status(500).json({ 'error': 'cannot update advert' });
        });
      } else {
        res.status(404).json({ 'error': 'advert not found or new number of total seat don\'t fit the actual available seat or date is before now'  });
      }
    },
  ], function(trainingFound) {
    if (trainingFound) {
      return res.status(201).json(trainingFound);
    } else {
      return res.status(500).json({ 'error': 'cannot update advert' });
    }
  });

};

deleteTraining = (req, res) => {
//Getting auth header
  let headerAuth  = req.headers['authorization'];
  let userId      = jwtHelper.getUserId(headerAuth);

  // Params
  let id  = req.params.id;


  asyncLib.waterfall([
    function(done) {
      models.Training.findOne({
        attributes: ['id','userId'],
        where: { id : id,
          userId: userId
        }
      }).then(function (trainingFound) {
        console.log(trainingFound);
        done(null, trainingFound);
      })
        .catch(function(err) {
          console.log(err);
          return res.status(500).json({ 'error': 'unable to destroy training' });
        });
    },
    function(trainingFound, done) {
      if(trainingFound) {
        trainingFound.destroy({
          where: { id : id,
            userId: userId
          }
        }).then(function() {
          done(trainingFound);
        }).catch(function(err) {
          console.log("2nd function during the destroy " + err);
          res.status(500).json({ 'error': 'cannot destroy advert' });
        });
      } else {
        res.status(404).json({ 'error': 'advert not found' });
      }
    },
  ], function(trainingFound) {
    if (trainingFound) {
      return res.status(201).json(trainingFound);
    } else {
      return res.status(500).json({ 'error': 'cannot destroy advert' });
    }
  });

};



module.exports = {
  createTraining,
  getAllTraining,
  getDetailTraining,
  getUserTraining,
  updateTraining,
  deleteTraining
};
