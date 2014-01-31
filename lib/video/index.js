var mongoose = require('mongoose')
  , VideoModel = mongoose.model('Video')
  , Util = require('../util')
  , fs = require('fs');

/**
 * Responsible for querying the VideoModel for information.
 *
 * @class Video
 * @constructor
 */
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

Video.prototype.allCategories = function(callback) {
    VideoModel.find({category: { $exists: true }}, function(err, videos) {
        if(err) {
            return (err,null);
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

    VideoModel.findOne({title: title}, function(err, video) {
        if(err) {
            return(err,null);
        }

        return callback(null, video);
    });
};

/**
 * Attempts to save a video to the database.
 *
 * @param {Object} videoObj
 * @param callback
 */
Video.prototype.putTitle = function(videoObj, callback) {

    videoObj.category = Util.toCamelCase(videoObj.category);
    videoObj.type = 'video/x-m4v';

    VideoModel.update(videoObj, function(err, numberAffected, raw) {
        if(err) {
            return(err,null);
        }

        return callback(null, raw);
    });
};

/**
 * Retrieves the file blob from the client and stores it in the content directory.
 *
 * @param {Object} file The uploaded file.
 * @param callback
 */
Video.prototype.patchTitle = function(file, callback) {

    var fileName = file.originalFilename.replace(/\.[^/.]+$/, "");
    VideoModel.findOne({title: fileName}, function(err, video) {
        var category = video.category;

        var basePath = 'content/' + category;
        var fullPathName = basePath + '/' + fileName + '.m4v';

        if (!fs.existsSync(basePath)) {
            fs.mkdir(basePath);
        }

        fs.rename(file.path, fullPathName, callback);
    });
};

Video.prototype.postTitle = function(callback) {

};

module.exports = Video;