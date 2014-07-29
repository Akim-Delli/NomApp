var mongoose = require('mongoose');

// We need a database connection
mongoose.connect('mongodb://localhost/test');

var location = require('../../models/location')(mongoose);

describe('location', function() {
	it ('should save a location (DeviceId, Longitude and Latitude)', function(){

		var status;
		location.record( 1, 40.00000,-80.00000, test);
		function test () {
			status = "save";
		};

		// wait for async call to be finished
	    waitsFor(function() {
	        return status !== undefined;
	    }, 'should return a status that is not undefined', 1000);

	    // run the assertion after status has been set
	    runs(function() {
	        expect(status).toEqual("saved");
	    });
	});

	it ('should retrieve the latest location save', function(){
		var latestLocation,
			status;
		latestLocation = location.findLatest(test);
		function test () {
			status = 'retrieved';
		};

		// wait for async call to be finished
	    waitsFor(function() {
	        return status !== undefined;
	    }, 'should return a status that is not undefined', 1000);

	    // run the assertion after response has been set
	    runs(function() {
	        expect(status).toEqual("retrieved");
	    });
	} );
});
