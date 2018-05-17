'use strict';

//TODO http://docs.sequelizejs.com/manual/tutorial/querying.html#operators deprecated String
//TODO ES6 import : import bcrypt from 'bcrypt';
const bcrypt          = require('bcrypt'),
      jwtUtils       = require('../../utils/jwtHelper'),
      models          = require('../../models/models'),
      asyncLib        = require('async'),
      EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

let register,
    login,
    getUserProfile,
    updateUserProfile;

register = (req, res) => {

  let firstname   = req.body.firstname,
      lastname   = req.body.lastname,
      email      = req.body.email,
      password   = req.body.password;

  if (email == null || firstname == null || password == null || lastname) {
    return res.status(400).json({'error': 'missing parameters'})
  }

  if (firstname.length >= 15 || firstname.length <= 4) {
    return res.status(400).json({'error': 'Username must contain min 4 and max 15 letters'})
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({'error': 'Email is not valid'})
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({'error': 'Password must be between 4 and 8 digits long and include at least one numeric digit. '})
  }


  asyncLib.waterfall([
    //1st function
    function (done) {
      models.User.findOne({
        attributes: ['email'],
        where: {email: email}
      })
        .then(function (userFound) {
          done(null, userFound);
        })
        .catch(function (err) {
          console.log("1st function :" + err);
          return res.status(500).json({'error': 'unable to verify user'});
        });
    },
    //2nd function
    function (userFound, done) {
      if (!userFound) {
        bcrypt.hash(password, 5, function (err, bcryptedPassword) {
          done(null, userFound, bcryptedPassword);
        });
      } else {
        return res.status(409).json({'error': 'user already exist'});
      }
    },
    //3rd function
    function (userFound, bcryptedPassword, done) {
      models.User.create({
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: bcryptedPassword,
        birthdate : ''
      })
        .then(function (newUser) {
          done(newUser);
          console.log("New user has been created");
        })
        .catch(function (err) {
          console.log("3rd function " + err);
          return res.status(500).json({'error': 'cannot add user'});
        });
    }
  ], function (newUser) {
    if (newUser) {
      return res.status(201).json({
        'userId': newUser.id,
        'bcryptedPassword': newUser.password
      });
    } else {
      console.log("error when adding a user" + err);
      return res.status(500).json({'error': 'cannot add user'});
    }
  });
};
