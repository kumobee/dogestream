/**
 * Routing actions for this application.
 *
 * @module routes
 * @class Router
 */

/**
 * @property VideoService The model that provides database access to video information.
 * @type {Video}
 */
var VideoService = require('../video')
/**
 * @property Video An actual instance of the model.
 * @type {Video}
 */
  , Video = new VideoService();

/**
 * Retrieves an array of all video content meta-data.
 *
 * @method all
 * @param req The request.
 * @param res The response.
 * @return {Object} 500 if there was an error, 200 otherwise.
 */
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

/**
 * Retrieves a list of all current categories.
 *
 * @method allCategories
 * @param req The request.
 * @param res The response.
 * @return {Object} 500 if there was an error, 200 otherwise.
 */
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

/**
 * Retrieves all video content that satisifes `content`.
 *
 * @method category
 * @param req The request.
 * @param res The response.
 * @return {Object} 500 if there was an error, 200 otherwise.
 */
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

/**
 * GET Request to retrieve a single video's meta information.
 *
 * @method getTitle
 * @param req The request.
 * @param res The response.
 * @return {Object} 500 if there was an error, 200 otherwise.
 */
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

/**
 * PUT Request to create a single video's meta-data.
 *
 * @method putTitle
 * @param req The request.
 * @param res The response.
 * @return {Object} 500 if there was an error, 200 otherwise.
 */
exports.putTitle = function(req, res) {
    Video.putTitle(req.body, function(err, raw){
        if(err) {
            return res.json(500, 'Internal Server Error');
        }

        return res.json(201, raw);
    });
};

/**
 * PATCH Request to upload a single video's binary content.
 *
 * @method patchTitle
 * @param req The request.
 * @param res The response.
 * @return {Object} 500 if there was an error, 200 otherwise.
 */
exports.patchTitle = function(req, res) {
    Video.patchTitle(req.files.file, function(err, raw) {
        if(err) {
            return res.json(500, 'Internal Server Error');
        }

        return res.json(201, raw);
    });
};

/**
 * POST Request to stream binary video content to the client.
 *
 * @method postTitle
 * @param req The request.
 * @param res The response.
 * @return 200 on successful stream of all content, 500 otherwise.
 */
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