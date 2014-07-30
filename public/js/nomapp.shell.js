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

                '<div class="nomapp-shell-main-content">' +
                	'<div id="nomapp-shell-main-content-map" class="nomapp-shell-main-content-map"></div>' +
                '</div>' +
                '<div class="nomapp-shell-chat"></div>' +
            '</div>' +
            	'<div class="nomapp-shell-foot"></div>',


        chat_extend_time	: 1000,
        chat_retract_time	: 300,
        chat_extend_width	: 300,
        chat_retract_width	: 15,
        chat_extended_title: 'Click to retract',
        chat_retracted_title: 'Click to extend'
 	},
 		stateMap = {
 			$container : null,
 			is_chat_retracted : true
 		},
 		jqueryMap = {},

 		setJqueryMap,
 		toggleChat,
 		onclickChat,
 		initModule;
 	//------------------ END MODULE SCOPE VARIABLE ---------------------------//

 	//------------------ BEGIN UTILITY METHODS -------------------------------//
 	//------------------ END UTILITY METHODS ---------------------------------//

 	//------------------ BEGIN DOM METHODS -----------------------------------//
 	// Begin DOM method /setJqueryMap
 	setJqueryMap = function () {
 		var $container = stateMap.$container;
 		jqueryMap = {
 			$container : $container,
 			$chat: $container.find( '.nomapp-shell-chat')
 		};
 	};
 	//End DOM method /setJqueryMap

 	// Begin DOM method /toggleChat/
 	// Purpose : Extends or retracts chat slider
 	// Arguments :
 	//   * do_extend - if true, extends slider; if false retracts
 	//   * callback - optional function to execute at end of animation
 	// Settings :
 	//	 * chat_extend_time, chat_retract_time
 	//   * chat_extend_width, chat_retract_width
 	// Returns : boolean
 	//	 * true  - slider animation activated
 	//   * false - slider animation not activated
 	// State : sets stateMap.is_chat_retracted
 	//   * true - slider is retracted
 	//   * false - slider is extended
 	toggleChat = function ( do_extend, callback ) {
 		var
 			px_chat_ht = jqueryMap.$chat.width(),
 			is_open    = px_chat_ht === configMap.chat_extend_width,
 			is_closed  = px_chat_ht === configMap.chat_retract_width,
 			is_sliding = ! is_open && !is_closed;

 		// avoid race condition
 		if ( is_sliding ){ return false; }

 		// Begin extend chat slider
 		if ( do_extend ) {
 			jqueryMap.$chat.animate(
 				{ width : configMap.chat_extend_width },
 				configMap.chat_extend_time,
 				function () {
 					jqueryMap.$chat.attr(
 						'title', configMap.chat_extended_title
 					);
 					stateMap.is_chat_retracted = false;
 					if ( callback ) { callback ( jqueryMap.$chat ); }
 				}
 			);
 			return true;
 		}
 		// End extend chat slider

 		// Begin retract chat slider
 		jqueryMap.$chat.animate(
 			{ width : configMap.chat_retract_width },
 				configMap.chat_retract_time,
 				function () {
 					jqueryMap.$chat.attr(
 						'title', configMap.chat_retracted_title
 					);
 					stateMap.is_chat_retracted = true;
 					if ( callback ) { callback ( jqueryMap.$chat ); }
 				}
 			);
 		return true;
 		// End retract chat slider
 	};
 	//End DOM method /toggleChat/
 	//------------------ END DOM METHODS -------------------------------------//

	//------------------ BEGIN EVENT HANDLERS --------------------------------//
 	onclickChat = function () {
 		toggleChat( stateMap.is_chat_retracted );
 		return false;
 	};
 	//------------------ END EVENT HANDLERS ----------------------------------//

 	//------------------ BEGIN PUBLIC METHODS --------------------------------//
 	// Begin Public method /initModule/
 	initModule = function ( $container) {
 		// load HTML and map JQuery collections
 		stateMap.$container = $container;
 		$container.html( configMap.main_html );
 		setJqueryMap();

 		stateMap.is_chat_retracted = false;
 		jqueryMap.$chat
 			.attr( 'title', configMap.chat_retracted_title)
 			.click( onclickChat);

 		// test toggle
 		//setTimeout( function () { toggleChat( true); }, 3000);
 		//setTimeout( function () { toggleChat( false); }, 8000);
 	};
 	// End Public method /initModule/

 	return { initModule : initModule };
 	//------------------ END PUBLIC METHODS ----------------------------------//
});
