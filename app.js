/**
 * web server entry point.
 */
'use strict';

var express = require('express');
var http = require('http');
var app = express();
var httpClient = require('request');
var fs = require('fs');
var port;

// Import the Station models
// var models = {
//     Station : require('./models/station')(httpClient, fs)
// };

// Create an http server
app.server = http.createServer(app);

// server configuration
app.configure(function () {
    app.use(express.urlencoded());
    app.use( express.methodOverride() );
    app.use( express.static( __dirname + '/public' ) );
    app.use( app.router );
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
	response.redirect( './nomApp.html');
});

// redirect to home
app.get('/nomapp', function (request, response) {
	response.redirect( './nomApp.html');
});

// start server
port = process.env.PORT || 3000;
app.server.listen(port);
console.log('Listening on port ' + port + ' in dev mode');
