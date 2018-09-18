'use strict';
const
      express     = require('express'),
      path        = require('path'),
      http        = require('http'),
      bodyParser  = require('body-parser'),
      mysql       = require('mysql'),
      dotenv      = require('dotenv').config(),
      cors        = require('cors');


module.exports = () => {
    let server = express(),
        create,
        start;

    create = (config) => {
      //Allow cors origin
      server.use(cors());
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

      server.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET, PUT, PATCH, POST, DELETE');
        res.header("Access-Control-Allow-Headers", "Content-Type");
        next();
      });

        //Set up routes by deferring that responsibility to the index.js within the routes folder.
        routes.init(server);

        const connection = mysql.createConnection({
          host     :  config.hostname,
          user     :  config.user,
          password :  config.password
        });

        connection.connect( (error) => {
          if(error){
            console.log('Error Connexion to database');
          }else{
            console.log('Connected to Database');
          }
        });



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
