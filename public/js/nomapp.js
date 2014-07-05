define([], function() {
	"use strict";
	var initModule = function( $container) {
		$container.html(
			'<h1 style:inline-block, margin:25px;">' +
			'hello world!' +
			'</h1>'
		);
	};

	return {
		initModule: initModule
	};
});
