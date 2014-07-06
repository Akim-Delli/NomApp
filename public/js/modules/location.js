define(['jquery', 'modules/map'], function ($, map) {
	"use strict";
	var fetch = function () {
		$.get( "/location/1/latest", function( data ) {
			console.log( data );
			map.initialize( data);
		});
	};
	return {
		fetch : fetch
	};
});