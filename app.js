/**
 * web server entry point.
 */
/*jslint node: true */
'use strict';

var express = require('express');
var http = require('http');
var app = express();
var io = require('socket.io');
var dbPath = 'mongodb://localhost/nomapp';
var port;

// Import the data layer
var mongoose = require('mongoose');

// Import the Station models
var models = {
    Location : require('./models/location')(mongoose)
};
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',console.log.bind(console, 'DB Connection established.'));
// Setting up the debug flag:
mongoose.set('debug, true');

// Create an http server
app.server = http.createServer(app);


//Websocket
var socket = io.listen(app.server);


// server configuration
app.configure(function () {
    app.use(express.urlencoded());
    app.use( express.methodOverride() );
    app.use( express.static( __dirname + '/public' ) );
    app.use( app.router );
    mongoose.connect(dbPath, function onMongooseError(err){
        if (err) { throw err; }
    });
});
app.configure('development', function () {
	app.use( express.logger() );
	app.use( express.errorHandler({
		dumpExceptions : true,
		showStack      : true
	}) );
});
app.configure( 'production', function () {
	app.use( express.errorHandler() );
});

// home route
app.get('/', function (request, response) {
	response.redirect( '/nomApp.html');
});

// redirect to home
app.get('/nomapp', function (request, response) {
	response.redirect( '/nomApp.html');
});

app.post('/collect', function(req, res) {
    var deviceId = req.param('deviceId', '');
    var longitude = req.param('longitude', '');
    var latitude = req.param('latitude', '');

    if ( null === deviceId || deviceId.length < 1) {
      console.log('Post request received with No data');
      res.send(400);
      return;
    }

    models.Location.record(deviceId, longitude, latitude, function(){
        models.Location.findLatest( function onSearchDone(err, location) {
            if(err || location.length === 0) {
                console.error('couldn\'t find the latest location');
            } else {
                socket.emit('server message', location);
            }
        });
    });

    res.send(200);
    return;
  });

app.get('/location/:deviceId/latest', function(req, res) {

	models.Location.findLatest( function onSearchDone(err, location) {
		if(err || location.length === 0) {
			res.send(404);
		} else {
			res.send(location);
		}
	});
});

socket.on('connection', function(client) {
    client.on('client message', function(msg){
        console.log('Client connected:' + msg);
    });
    // client.emit('server message', 'message from the server');
});

// start server
port = process.env.PORT || 3000;
app.server.listen(port);
console.log('Listening on port ' + port + ' in dev mode');
