var request = require('supertest')
  , assert = require('chai').assert
  , mongoose = require('mongoose')
  , app = require('../app');

describe('GET /video', function() {
    var id, video, notDogeVideo, dogeVideos;

    video = {
        title: 'Teach Me How To Doge',
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
        category: 'NotDoge'
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
                .get('/video/doge')
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
});