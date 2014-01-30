var mongoose = require('mongoose')
  , VideoModel = mongoose.model('Video')
  , Util = require('../util');

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
 * @method category
 * @param {String} cat The category to filter results from.
 * @param callback
 */
Video.prototype.category = function(cat, callback) {
    // Camel Case a string!
    var lowerCat = Util.toCamelCase(cat);

    VideoModel.find({category: lowerCat}, function(err, videos) {
        if(err) {
            return(err,null);
        }

        return callback(null, videos);
    });
};

/**
 * Returns a single video object that matches the given title.
 *
 * @param {string} title The title to search for.
 * @param callback
 */
Video.prototype.getTitle = function(title, callback) {

    VideoModel.find({title: title}, function(err, videos) {
        if(err) {
            return(err,null);
        }

        return callback(null, videos);
    });
};

/**
 * Attempts to save a video to the database.
 *
 * @param {Object} videoObj
 * @param callback
 */
Video.prototype.putTitle = function(videoObj, callback) {
    console.log(videoObj);


    videoObj.category = Util.toCamelCase(videoObj.category);

    VideoModel.save(videoObj, function(err, video) {
        if(err) {
            return(err,null);
        }
            return callback(null, video);
    });
};

module.exports = Video;