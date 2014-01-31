var request = require('supertest')
    , mongoose = require('mongoose')
    , app = require('./app');

var beiberFever = {
    title: 'Beiber-Fever',
    description: 'Beiber gets TOLD on stage for REASONS. YEAH.',
    path: 'content/television/beiber_fever.m4v',
    duration: '00:02:22',
    type: 'video/x-m4v',
    category: 'television'

};

var bioShock = {
    title: 'Bioshock-Infinite-Trailer',
    description: 'Trailer for the hit blockbuster of some time in the past!',
    path: 'content/videoGameTrailers/bioshock.m4v',
    duration: '00:01:38',
    type: 'video/x-m4v',
    category: 'videoGameTrailers'
};

var att4chan = {
    title: 'ATT-Blocks-4chan',
    description: 'AT&T blocks access to 4chan because H4X0RZ.',
    path: 'content/cnetNews/4chan_attack.m4v',
    duration: '00:03:24',
    type: 'video/x-m4v',
    category: 'cnetNews'
};

var watchdogs = {
    title: 'Watchdogs-Trailer',
    description: 'Trailer for some 1337 h4x0r game L0L.',
    path: 'content/videoGameTrailers/watchdogs.m4v',
    duration: '00:01:27',
    type: 'video/x-m4v',
    category: 'videoGameTrailers'
};

var firstLook = {
    title: 'First-Look-Router',
    description: 'A review of some router that looks like cool!',
    path: 'content/cnetReview/firstLookRouter.m4v',
    duration: '00:03:39',
    type: 'video/x-m4v',
    category: 'cnetReview'
};

var dogeVideos = [beiberFever, bioShock, att4chan, watchdogs, firstLook];

mongoose.connection.collections['videos'].drop(function(err, docs) {
    mongoose.connection.collections['videos'].insert(dogeVideos, function(err, docs) {});
});