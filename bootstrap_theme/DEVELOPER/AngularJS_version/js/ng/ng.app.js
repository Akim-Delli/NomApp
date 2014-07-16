var smartApp = angular.module('smartApp', [
  	'ngRoute',
  	//'ngAnimate', // this is buggy, jarviswidget will not work with ngAnimate :(
  	'ui.bootstrap',
  	'plunker',
  	'app.controllers',
  	'app.demoControllers',
  	'app.main',
  	'app.navigation',
  	'app.localize',
  	'app.activity',
  	'app.smartui'
]);

smartApp.config(['$routeProvider', '$provide', function($routeProvider, $provide) {
	$routeProvider
		.when('/', {
			redirectTo: '/dashboard'
		})

		/* For DEMO purposes, we are loading our views dynamically by passing arguments to the location url */

		// A bug in smartwidget with angular (routes not reloading). 
		// We need to reload these pages everytime so widget would work
		// The trick is to add "/" at the end of the view.
		// http://stackoverflow.com/a/17588833
		.when('/:page', { // we can enable ngAnimate and implement the fix here, but it's a bit laggy
			templateUrl: function($routeParams) {
				return 'views/'+ $routeParams.page +'.html';
			},
			controller: 'PageViewController'
		})
		.when('/:page/:child*', {
			templateUrl: function($routeParams) {
				return 'views/'+ $routeParams.page + '/' + $routeParams.child + '.html';
			},
			controller: 'PageViewController'
		})
		.otherwise({
			redirectTo: '/dashboard'
		})
	;

	// with this, you can use $log('Message') same as $log.info('Message');
	$provide.decorator('$log', function($delegate) {
        // create a new function to be returned below as the $log service (instead of the $delegate)
        function logger() {
            // if $log fn is called directly, default to "info" message
            logger.info.apply(logger, arguments);
        }
        // add all the $log props into our new logger fn
        angular.extend(logger, $delegate);
        return logger;
    });

}]);

smartApp.run(['$rootScope', 'settings', function($rootScope, settings) {
	settings.currentLang = settings.languages[0]; // en
}])