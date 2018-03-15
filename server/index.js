'use strict';
//TODO It's like this one is for the root of my server folder, so i'll just need to call create and start function in the server.js in da root of ma pwoject ratafarie
const //Dependencies
      express = require('express'),
      path = require('path'),
      http = require('http'),
      bodyParser = require('body-parser');

module.exports = () => {
    let server = express(),
        create,
        start;

    create = (config) => {
        let routes = require('./routes/index');

        //Server settings
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);

        //Middleware that parses json
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: false}));

        // Point static path to dist
        server.use(express.static('dist'));

        // Catch all other routes and return the index file
        server.get('/', (req, res) => {
          res.sendFile("index.html", {"root": 'C:/dev/AngularBee/angularBeeV2/dist'});
        });

        //Set up routes by deferring that responsibility to the index.js within the routes folder.
        routes.init(server);
    };

    start = () => {
         let hostname = server.get('hostname'),
             port = server.get('port');

         server.listen(port, () => {
             console.log('Express server listening on - http://' + hostname + ':' + port);
         });
    };

    return{
      create: create,
      start: start
    }
};
