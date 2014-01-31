var request = require('supertest')
  , assert = require('chai').assert
  , mongoose = require('mongoose')
  , app = require('../app');

describe('GET /video and friends ::  ', function() {
    var id, video, notDogeVideo, dogeVideos;

    video = {
        title: 'Teach-Me-How-To-Doge',
        description: 'Teach me how to doge, teach me teach me how to doge...',
        path: 'some/path/to/file',
        duration: '00:03:01',
        category: 'doge'

    };

    notDogeVideo = {
        title: 'Something That Isn\'t Doge Therefore Less Important',
        description: 'You won\'t learn how to doge here...',
        path: 'some/stupid/path',
        duration: '00:00:00',
        category: 'notDoge'
    };

    dogeVideos = [video, notDogeVideo];

    beforeEach(function(done) {
        mongoose.connection.collections['videos'].drop(function(err, docs) {
            mongoose.connection.collections['videos'].insert(dogeVideos, function(err, docs) {
                id = docs[0]._id;
                done();
            });
        })
    });

    describe('when requesting resource /video', function() {
        it('should return an array of videos', function(done) {
            request(app)
                .get('/video')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    var result = JSON.parse(res.text)[0];
                    assert.equal(result._id, id);
                    for(var key in video) {
                        if(video.hasOwnProperty(key)) {
                            assert.equal(result[key], video[key]);
                        }
                    }

                    done();
                });


        });
    });

    describe('when requesting resource /video/category', function() {
        it('should return an array of videos that match category', function(done) {
            request(app)
                .get('/video/category/doge')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    var result = JSON.parse(res.text)[0];

                    assert.equal(result._id, id);
                    assert.equal(result.category, video.category);

                    done();
                });
        });
    });

    describe('when requesting resource /video/title', function() {
        it('should return a single video that matches title', function(done) {
            request(app)
                .get('/video/title/Teach-Me-How-To-Doge')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    var result = JSON.parse(res.text);

                    assert.ok(result);
                    assert.equal(result.title, video.title);

                    done();
                });
        });
    });
});

describe('PUT /video :: ', function() {
    var putVideo;

    putVideo = {
        title: 'New-Doge-Hotness',
        description: 'All about dat doge!',
        duration: '00:01:00',
        category: 'dansudansudansu'
    };

    describe('when putting a new resource /video/title/:title', function() {
        it('should insert the the video meta-data into the database and copy the video to the filesystem', function(done) {

            request(app)
                .get('/video/title/New-Doge-Hotness')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    var result = JSON.parse(res.text);

                    assert.equal(JSON.stringify(result), '{}');
                });

            request(app)
                .put('/video/title/New-Doge-Hotness')
                .send(putVideo)
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function(err, res){
                    assert.equal(err, null);
                });

            request(app)
                .get('/video/title/New-Doge-Hotness')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    var result = JSON.parse(res.text);

                    assert.ok(result);
                    assert.equal(result.title, putVideo.title);

                    done();
                });
        });
    });
});