'use strict';

const
  users = [{
    id: 1,
    surname: 'thomas',
    name: 'mirabile',
    ability: [
      'dev',
      'lead'
    ]
  }];


function getUsers(req, res) {
  res.json(users);
}

function getUsersWithId(req, res) {
  let id = req.params.id || 0,
    result = {};

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      result = users[i];
      break;
    }
  }

  res.json(result);
}

module.exports = {
  getUsers: getUsers,
  getUsersWithId: getUsersWithId
};
