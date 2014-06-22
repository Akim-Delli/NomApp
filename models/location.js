module.exports = function (mongoose) {
    'use strict';
    var LocationSchema = new mongoose.Schema({
        deviceId: { type: Number},
        lon: { type: Number},
        lat: { type: Number},
        timestamp: { type: Number}
    });
    var Location = mongoose.model('Location', LocationSchema);

    var registerCallback = function(err) {
        if (err) {
            return console.log(err);
        }
        return console.log('Location was saved');
    };

    var findById = function (locationId, callback) {
        Location.findOne({_id:locationId}, function(err,doc) {
            callback(doc);
        });
    };

    var record = function (deviceId, longitude, latitude, timestamp) {
        console.log('Saving ' + deviceId);
        var LocationToSave = new Location ({
            deviceId: deviceId,
            lon: longitude,
            lat: latitude,
            timestamp: timestamp
        });

        LocationToSave.save(registerCallback);
    };

    return {
        findById: findById,
        record:     record,
        Location: Location
    };

};
