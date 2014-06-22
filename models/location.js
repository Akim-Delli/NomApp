module.exports = function (mongoose) {
    'use strict';
    var LocationSchema = new mongoose.Schema({
        deviceId: { type: Number},
        lon: { type: Number},
        lat: { type: Number},
        timestamp: { type: Number}
    }),
        Location = mongoose.model('Location', LocationSchema),

        findById = function (locationId, callback) {
            Location.findOne({_id:locationId}, function(err,doc) {
                callback(doc);
            });
        };

};
