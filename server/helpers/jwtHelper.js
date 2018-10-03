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

checkAuthenticated = (req, res) => {
  if(!req.header('authorization')){
    return res.status(401).send({message: 'Unauthorized. Missing Auth Header'})
  }

  let token = req.header('authorization').split(' ')[1];
  let payload = jwt.decode(token, SECRET);

  if(!payload){
    return res.status(401).send({message: 'Unauthorized. Missing Auth Header Invalid'})
  }

  req.userId = payload.sub;

};

module.exports = {
  generateUserToken,
  parseAuthorization,
  getUserId,
  checkAuthenticated,
};

