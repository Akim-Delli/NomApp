
define(["leaflet"],function ( L) {
	'use strict';
	var map;
	var initialize = function ( geo) {


		map = L.map('nomapp-shell-main-content-map').setView([geo.lon, geo.lat], 14);

		map.attributionControl.setPrefix('');

		L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 17,
			attribution: '',
			attributionControl: false,
			id: 'examples.map-i86knfo3'
		}).addTo(map);

		L.marker([geo.lon, geo.lat]).addTo(map)
			.bindPopup("<b>Christian Home</b><br />my Home").openPopup();

		L.circle([geo.lon, geo.lat], 500, {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5
		}).addTo(map)
		  .bindPopup("<b>Zone around the House</b>.<br><br><i>Notify me if leave the zone</i>");

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

	 	map.setView([geo.lon, geo.lat], 14);

	 	L.marker([geo.lon, geo.lat]).addTo(map)
			.bindPopup("<b>Christian Home</b><br />my Home").openPopup();
	 };

	return {
		initialize: initialize,
		update: update,
	};

});


