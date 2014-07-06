/*
 * NomApp.shell.js
 * shell module for NomApp
 */
define(['jquery'], function($){
 	"use strict";
 	//------------------ BEGIN MODULE SCOPE VARIABLE -------------------------//
 	var configMap = {
 		main_html : String() +
 			'<div class="nomapp-shell-head">'+
            	'<div class="nomapp-shell-head-logo"></div>' +
                '<div class="nomapp-shell-head-acct"></div>' +
                '<div class="nomapp-shell-head-search"></div>' +
            '</div>' +
            '<div class="nomapp-shell-main">' +
                '<div class="nomapp-shell-main-nav"></div>' +
                '<div class="nomapp-shell-main-content"></div>' +
            '</div>' +
            	'<div class="nomapp-shell-foot"></div>' +
            	'<div class="nomapp-shell-chat"></div>' +
            '<div class="nomapp-shell-modal"></div>'
 	},
 		stateMap = { $container : null},
 		jqueryMap = {},

 		setJqueryMap,
 		initModule;
 	//------------------ END MODULE SCOPE VARIABLE ---------------------------//

 	//------------------ BEGIN UTILITY METHODS -------------------------------//
 	//------------------ END UTILITY METHODS ---------------------------------//

 	//------------------ BEGIN DOM METHODS -----------------------------------//
 	// Begin DOM method /setJqueryMap
 	setJqueryMap = function () {
 		var $container = stateMap.$container;
 		jqueryMap = { $container : $container };
 	};
 	//End DOM method /setJqueryMap
 	//------------------ END DOM METHODS -------------------------------------//

	//------------------ BEGIN EVENT HANDLERS --------------------------------//
 	//------------------ END EVENT HANDLERS ----------------------------------//

 	//------------------ BEGIN PUBLIC METHODS --------------------------------//
 	// Begin Public method /initModule/
 	initModule = function ( $container) {
 		stateMap.$container = $container;
 		$container.html( configMap.main_html );
 		setJqueryMap();
 	};
 	// End Public method /initModule/

 	return { initModule : initModule };
 	//------------------ END PUBLIC METHODS ----------------------------------//
});
