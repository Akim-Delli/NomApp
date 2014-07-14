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

    var findLatest = function (callback) {
        Location.findOne({}, {}, { sort: { 'timestamp' : -1 } }, function(err, location) {
            callback(err, location);
        });
    };

    var record = function (deviceId, longitude, latitude, callback) {
        console.log('Saving Location for DeviceId: ' + deviceId);
        var LocationToSave = new Location ({
            deviceId: deviceId,
            lon: longitude,
            lat: latitude,
            timestamp: new Date().getTime()
        });

        LocationToSave.save(callback);
        // callback();
    };

    return {
        findLatest: findLatest,
        record:     record,
        Location: Location
    };

};
