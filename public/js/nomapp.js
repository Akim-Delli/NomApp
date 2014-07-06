"use strict";

require.config({
    paths: {
        jquery: "libs/jquery",
        Underscore: "libs/underscore",
        leaflet: "libs/leaflet",
        jqueryUriAnchor : "/js/libs/jquery.jqueryuriAnchor.js"
    }
});

require(["nomapp.shell", "jquery"], function (nomapp, $ ) {
    // Initialise the application once the DOM Is ready
    nomapp.initModule($('#nomappid'));
});
