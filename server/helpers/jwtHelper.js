const jwt = require('jsonwebtoken'),
  SECRET = 'secret'; //TODO https://www.youtube.com/watch?v=F0HLIe3kNvM


const generateUserToken = (userData) => {
  return jwt.sign({
      userId: userData.id
    },
    SECRET,
    {
      expiresIn: '1h'
    })
};

const parseAuthorization = (authorization) => {
  return (authorization != null) ? authorization.replace('Bearer ', '') : null;
};

const getUserId = (authorization) => {
  let userId = -1;
  let token = module.exports.parseAuthorization(authorization); // Module.exports pour préciser qu'on est dans le même module
  if(token != null){
    try{
      let jwtToken = jwt.verify(token, SECRET);
      if(jwtToken != null)
        userId = jwtToken.userId;
    } catch(err) {
      console.log(err);
    }
  }
  return userId
};

module.exports = {
  generateUserToken,
  parseAuthorization,
  getUserId
};

