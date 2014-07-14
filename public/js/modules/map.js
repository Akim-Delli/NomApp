
define(["leaflet"],function ( L) {
	'use strict';
	var map;

	var icon_target_svg = '<svg xmlns="http://www.w3.org/2000/svg" overflow="visible" >'+
				    		'<circle cx="5" cy="5" fill="none" stroke="blue" stroke-width="3" >'+
				        		'<animate attributeName="r"'+
				                          'from="0" to="30"'+
				                          'begin="0s" dur="1s"'+
				                          'repeatCount="indefinite"'+
				                '/>'+
				        		'<animate attributeName="opacity"'+
				               			  'from="1" to="0"'+
				                          'dur="1s"'+
				                          'begin="0s" dur="1s"'+
				                          'repeatCount="indefinite"'+
				           		'/>'+
				    		'</circle>'+
						'</svg>';
	var marker;

	var initialize = function ( geo) {


		var targetIcon = L.divIcon({
		    className: 'svg-marker',
		    html: icon_target_svg,
		    iconSize: null,
		    iconAnchor: null
		});

		map = L.map('nomapp-shell-main-content-map').setView([geo.lon, geo.lat], 14);

		map.attributionControl.setPrefix('');

		L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 17,
			attribution: '',
			attributionControl: false,
			id: 'examples.map-i86knfo3'
		}).addTo(map);

		marker = L.marker([geo.lon, geo.lat], {icon: targetIcon}).addTo(map);
		//	.bindPopup("<b>Christian Home</b><br />my Home").openPopup();

		// L.circle([geo.lon, geo.lat], 500, {
		// 	color: 'red',
		// 	fillColor: '#f03',
		// 	fillOpacity: 0.5
		// }).addTo(map)
		//   .bindPopup("<b>Zone around the House</b>.<br><br><i>Notify me if leave the zone</i>");

		var popup = L.popup();

		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent("You clicked the map at " + e.latlng.toString())
				.openOn(map);
		}

		map.on('click', onMapClick);

	};
	 var update = function (geo) {

	 	map.setView([geo.lon, geo.lat], 14, {pan: 'animate'});

	 	marker.setLatLng([geo.lon, geo.lat]);
	 	//map.addLayer(marker);
			//.bindPopup(geo.lon + '<br />' + geo.lat).openPopup();
	 };

	return {
		initialize: initialize,
		update: update,
	};

});


