var mongoose = require('mongoose')
  , VideoModel = mongoose.model('Video');

var Video = function() {};

/**
 * Returns all video objects from Mongo.
 *
 * @method all
 * @param callback
 */
Video.prototype.all = function(callback) {
    VideoModel.find({}, function(err, videos) {
        if(err) {
            return(err, null);
        }

        return callback(null, videos);
    });
};

/**
 * Returns all video objects matching category from Mongo.
 *
 * @param cat The category to filter results from.
 * @param callback
 */
Video.prototype.category = function(cat, callback) {
    VideoModel.find({category: cat}, function(err, videos) {
        if(err) {
            return(err,null);
        }

        return callback(null, videos);
    });
};

module.exports = Video;