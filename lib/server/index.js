/**
 * @module server
 */

/**
 * @property express
 * @type {Object}
 */
var express = require('express')
/**
 * @property http
 * @type {Object}
 */
  , http = require('http')
/**
 * @property models
 * @type {Object}
 */
  , models = require('../models')
/**
 * @property db
 * @type {Object}
 */
  , db = require('../db')
/**
 * @property app
 * @type {Object}
 */
  , app = express()
/**
 * @property video
 * @type {routes}
 */
  , video = require('../routes/video');

app.configure(function() {
    app.set('port', process.env.PORT || 1337);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

app.get('/api/video',                       video.all);
app.get('/api/video/category',              video.allCategories);
app.get('/api/video/category/:category',    video.category);
app.get('/api/video/title/:title',          video.getTitle);
app.get('/api/play/title/:title',           video.getTitle);
app.put('/api/video/title/:title',          video.putTitle);
app.patch('/api/video/title/:title',        video.patchTitle);

app.get('/video/:title', function(req,res){
    res.redirect('/');
});

// Serve the index by default.
app.get('/', function(req, res){
    res.sendfile('index.html');
});

// Serve the rest of the files that `index` requests.
app.get(/^(.+)$/, function(req, res) { res.sendfile(req.params[0].substr(1)); });

http.createServer(app).listen(app.get('port'), function() {
    console.log('Server is listening on port ' + app.get('port'));
});

module.exports = app;