var request = require('supertest')
  , assert = require('chai').assert
  , mongoose = require('mongoose')
  , app = require('../app');

describe('GET /video', function() {
    var id, video;

    video = {
        title: 'Teach Me How To Doge',
        description: 'Teach me how to doge, teach me teach me how to doge...',
        path: 'some/path/to/file',
        duration: '00:03:01',
        category: 'doge'

    }

    beforeEach(function(done) {
        mongoose.connection.collections['videos'].drop(function(err, docs) {
            mongoose.connection.collections['videos'].insert(video, function(err, docs) {
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

                    assert.equal(result._id, id)
                    for(var key in video) {
                        if(video.hasOwnProperty(key)) {
                            assert.equal(result[key], video[key]);
                        }
                    }
                });

            done();
        });
    });
});