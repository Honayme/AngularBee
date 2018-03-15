'use strict';

const
  server = require('./server/index')(),
  config = require('./server/config/local');

server.create(config);
server.start();

