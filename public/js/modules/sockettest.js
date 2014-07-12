define(['socketio', 'jquery', 'modules/map'], function (io,$, map) {
	"use strict";
	var initModule = function () {
		var socket = io.connect('http://localhost:3000');
		socket.emit('client message', 'message from the client');
		socket.on('server message', function(data){ console.log(data); });
	};
	return {
		initModule : initModule
	};
});
