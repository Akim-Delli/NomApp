define(["leaflet", "jquery"],function ( L, $) {

	var initialize = function () {


	var map = L.map('map').setView([41.892206, -80.814211], 14);

	L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
		maxZoom: 17,
		attribution: 'nomApp &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ',
		id: 'examples.map-i86knfo3'
	}).addTo(map);

	L.marker([41.892206, -80.814211]).addTo(map)
		.bindPopup("<b>Christian Home</b><br />my Home").openPopup();

	L.circle([41.892206, -80.814211], 500, {
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

	$.get( "/location/1/latest", function( data ) {
		alert( data.timestamp );
	});

	};

	return {
		initialize: initialize
	};

});
