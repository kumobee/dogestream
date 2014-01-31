/**
 * @property mongoose
 * @type {Object}
 */
var mongoose = require('mongoose')
/**
 * @property config
 * @type {Config}
 */
  , config = require('../config')
/**
 * @property connectionString
 * @type {String}
 */
  , connectionString = config.get('mongo:url')
/**
 * @property options
 * @type {Options}
 */
  , options = {};

// Options to pass into mongo
options = {
    server: {
        auto_reconnect: true,
        poolSize: 10
    }
};

mongoose.connect(connectionString, options, function(err, res) {
    if(err) {
        console.log('Error connection to: ' + connectionString + '. ' + err);
    } else {
        console.log('Successfully connected to: ' + connectionString + '.');
    }
});