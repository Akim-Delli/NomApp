/*jslint node: true */
"use strict";

require.config({
    paths: {
        jquery: "/js/libs/jquery",
        Underscore: "/js/libs/underscore",
        leaflet: "/js/libs/leaflet",
        jqueryUriAnchor : "/js/libs/jquery.jqueryuriAnchor.js"
    }
});

require(["nomapp", "jquery"], function (nomapp, $) {
    // Initialise the application once the DOM Is ready
    nomapp.initModule($('#spa'));
});

