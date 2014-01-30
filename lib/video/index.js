var mongoose = require('mongoose')
  , VideoModel = mongoose.model('Video');

var Video = function() {};

Video.prototype.all = function(callback) {
    VideoModel.find({}, function(err, videos) {
        if(err) {
            return(err, null);
        }

        return callback(null, videos);
    });
};

module.exports = Video;