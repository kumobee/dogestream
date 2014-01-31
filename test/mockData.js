var request = require('supertest')
  , mongoose = require('mongoose')
  , app = require('../app');

var id;

var video = {
    title: 'Teach-Me-How-To-Doge',
    description: 'Teach me how to doge, teach me teach me how to doge...',
    path: 'some/path/to/file',
    duration: '00:03:01',
    category: 'doge'

};

var notDogeVideo = {
    title: 'Something-That-Isnt-Doge-Therefore-Less-Important',
    description: 'You won\'t learn how to doge here...',
    path: 'some/stupid/path',
    duration: '00:00:00',
    category: 'notDoge'
};

var prancingShiba = {
    title: 'At-The-Sign-Of-The-Prancing-Shiba',
    description: 'Such spoof of many beers and good friends (minus wizard doge).',
    path: 'path/to/prancing/shiba',
    duration: '99:99:99',
    category: 'movieSpoof'
};

var poopingShiba = {
    title: 'Two-Shiba-One-Cup',
    description: 'You don\'t want to know.',
    path: 'pls/that/does/not/go/there',
    duration: '00:00:07',
    category: 'shock'
};

var fuckThisShiba = {
    title: 'Fuck-This-Shiba',
    description: 'Yes, this particular Shiba, and this particular Shiba only.',
    path: 'what/is/this/i/dont/even',
    duration: '999:00:00',
    category: 'fuckThis'
};

var dogeVideos = [video, notDogeVideo, prancingShiba, poopingShiba, fuckThisShiba];

mongoose.connection.collections['videos'].drop(function(err, docs) {
    mongoose.connection.collections['videos'].insert(dogeVideos, function(err, docs) {
        id = docs[0]._id;
    });
});