/*
 * nomapp.js
 * Main Entry Point
 * Congigure RequireJS
 */
"use strict";

require.config({
    paths: {
        jquery: "libs/jquery",
        Underscore: "libs/underscore",
        leaflet: "libs/leaflet",
        jqueryUriAnchor : "/js/libs/jquery.jqueryuriAnchor.js"
    }
});

require(["nomapp.shell", "modules/location", "jquery"], function (nomapp, location, $ ) {
    // Initialise the application once the DOM Is ready
    nomapp.initModule($('#nomappid'));
    location.fetch();
});
