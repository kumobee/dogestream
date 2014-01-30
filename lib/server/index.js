var express = require('express')
  , http = require('http')
  , models = require('../models')
  , db = require('../db')
  , app = express()
  , video = require('../routes/video');

app.configure(function() {
    app.set('port', process.env.PORT || 1337);
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
});

app.get('/video', video.all);
app.get('/video/category/:category', video.category);
app.get('/video/title/:title', video.title);

// Serve the index by default.
app.get('/', function(req, res){
    res.sendfile('index.html');
});

// Serve the rest of the files that index requests.
app.get(/^(.+)$/, function(req, res) { res.sendfile(req.params[0].substr(1)); });

http.createServer(app).listen(app.get('port'), function() {
    console.log('Server is listening on port ' + app.get('port'));
});

module.exports = app;