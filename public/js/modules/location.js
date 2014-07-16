define(['socketio', 'jquery', 'modules/map'], function (io, $, map) {
	"use strict";
	var fetch = function () {
		$.get( "/location/1/latest", function( data ) {

			map.initialize( data);
		});
	},
		listen = function() {
			var socket = io.connect('http://localhost:3000');
			socket.on('server message', function(location){
				console.log(location);
				map.update( location);
			 });
		};

	return {
		fetch : fetch,
		listen: listen
	};
});
