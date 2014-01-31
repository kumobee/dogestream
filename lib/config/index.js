/**
 * @property nconf
 * @type {Object}
 */
var nconf = require('nconf');

/**
 * @class Config
 * @constructor
 */
var Config = function() {
    var environment;

    nconf.argv().env('_');
    environment = nconf.get('NODE:ENV') || 'development';
    nconf.file(environment, 'config/' + environment + '.json');
    nconf.file('default', 'config/default.json');
};

/**
 * Retrieve the requests `key` from the configuration file.
 *
 * @method get
 * @param key
 * @returns {String|Object|null}
 */
Config.prototype.get = function(key) {
    return nconf.get(key);
};

module.exports = new Config();