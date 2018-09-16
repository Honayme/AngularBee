
const bCrypt = require('bcrypt-nodejs'),
      passport = require('passport'),
      user = require('../../database/models/user');



module.exports = function(passport, user) {

  let  User = user;
  let  LocalStrategy = require('passport-local').Strategy;

  passport.use('local-signup', new LocalStrategy(

    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

  ));

};

function(req, email, password, done) {

  let generateHash = function(password) {

    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

  };

}




