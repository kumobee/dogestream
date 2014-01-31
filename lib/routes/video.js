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

exports.allCategories = function(req, res) {
    Video.allCategories(function(err, videos) {
        if(err) {
            return res.json(500, 'Internal Server Error');
        }

        if(videos === null) {
            videos = {};
        }

        var categories = [];

        videos.forEach(function(val) {
            return categories.push(val.category);
        });

        return res.json(200, categories);
    });
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
    Video.putTitle(req.body, function(err, raw){
        if(err) {
            return res.json(500, 'Internal Server Error');
        }

        return res.json(201, raw);
    });
};

exports.patchTitle = function(req, res) {
    Video.patchTitle(req.files.file, function(err, raw) {
        if(err) {
            return res.json(500, 'Internal Server Error');
        }

        return res.json(201, raw);
    });
};

exports.postTitle = function(req, res) {
    Video.getTitle(req.params.title, function(err, video) {
        if(err) {
            return res.json(500, 'Internal Server Error');
        }

        var videoPath = video.path;
        var readStream = fs.createReadStream(videoPath);

        readStream.on('data', function(data) {
            var flushed = res.write(data);

            console.log('STREAMING DOGE DOWN THE CAT TUBES', videoPath);
            if(!flushed) {
                readStream.pause();
            }
        });

        res.on('drain', function() {
            readStream.resume();
        });

        readStream.on('end', function() {
            res.end();
        });

        readStream.on('error', function(err) {
            console.error('FUCKING CATS, WHY THEY GOTTA FUCK SHIBA SHIT', err, 'while streaming', videoPath);
            res.end();
        });


        return res.json(200, {'Content-Type': video.type});
    });
};