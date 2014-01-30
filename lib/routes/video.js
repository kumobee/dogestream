var VideoService = require('../video')
  , Video = new VideoService();

exports.all = function(req, res) {
    Video.all(function(err, videos) {
        if(err) {
            return res.json(500, 'Internal Server Error');
        }

        if(videos === null) {
            videos = {};
        }

        return res.json(200, videos);
    })
};

exports.category = function(req, res) {
    Video.category(req.params.category, function(err, videos) {
        if(err) {
            return res.json(500, 'Internal Server Error');
        }

        if(videos === null) {
            videos = {};
        }

        return res.json(200, videos);
    });
};