'use strict';
/**
 * @file server.js
 * @desc The BeetoBee entry point App.<br />
 * <br />
 *
 * BeetoBee est une application web qui permeet étudiant de participer
 * aux formations organisées par la start up ainsi que
 * de se renseigner sur les ceritfications qu'ils leurs est possible de passer<br />
 * <br />
 *
 * Date de Création 10/09/2018<br />
 * Date de modification 10/05/2019<br />
 *
 * @version Alpha 1.0.0
 *
 * @author Thomas Mirabile            <thomas.mirabile@ynov.com>
 *
 */
const
  server = require('./server/index')(),
  config = require('./server/config/local');

server.create(config);
server.start();

