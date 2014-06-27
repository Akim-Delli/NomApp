define(["leaflet"],function ( L) {

	var initialize = function ( geo) {

		var map = L.map('map').setView([geo.lon, geo.lat], 14);

		L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 17,
			attribution: 'nomApp &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ',
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

		// $.get( "/location/1/latest", function( data ) {
		// 	console.log( data );
		// });

	};

	return {
		initialize: initialize
	};

});
