/*
 * nomapp.js
 * Main Entry Point
 * Congigure RequireJS
 */

require.config({
    shim: {
        'socketio': {
          exports: 'io'
        }
    },
    paths: {
        jquery: "libs/jquery",
        Underscore: "libs/underscore",
        leaflet: "libs/leaflet",
        jqueryUriAnchor : "libs/jquery.jqueryuriAnchor",
        socketio : "../socket.io/socket.io"
    }
});

require(["nomapp.shell", "modules/location", "modules/sockettest","jquery"], function (nomapp, location, sockettest, $ ) {
    // Initialise the application once the DOM Is ready
    nomapp.initModule($("#nomappid"));
    location.fetch();
    sockettest.initModule();
});
