require.config({
    paths: {
    jquery: '/js/libs/jquery',
    Underscore: '/js/libs/underscore',
    leaflet: '/js/libs/leaflet'
    }
});

require(["modules/map", "modules/location"], function(map, location) {
    //This function is called when modules/map.js is loaded.
    //If modules/map.js calls define(), then this function is not fired until
    //map's dependencies have loaded, and the map argument will hold
    //the module value for "modules/map".
    //map.initialize();
    location.fetch();

});
