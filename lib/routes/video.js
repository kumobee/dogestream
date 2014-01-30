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

exports.getTitle = function(req, res) {
    Video.getTitle(req.params.title, function(err, videos) {
        if(err) {
            return res.json(500, 'Internal Server Error');
        }

        if(videos === null) {
            videos = {};
        }

        return res.json(200, videos);
    });
};

exports.putTitle = function(req, res) {
    console.log(req.body);

    Video.putTitle(req.body, function(err, videos){
        if(err) {
            return res.json(500, 'Internal Server Error');
        }

        return res.json(201, videos);
    });
};