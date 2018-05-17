'use strict';

const
  apiRoute = require('./api/index');

console.log('passeSurLindex');

function init(server) {
  server.get('*', function (req, res, next) {
    console.log('Request was made to: ' + req.originalUrl);
    return next();
  });

 // https://stackoverflow.com/questions/34847972/how-to-handle-angular2-route-path-in-nodejs
 //  server.all('*', (req, res) => {
 //    console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
 //    res.status(200).sendFile("index.html", {"root": 'C:/dev/AngularBee/angularBeeV2/dist'});
 //  });

  server.use('/api', apiRoute);
}

module.exports = {
  init: init,
};
