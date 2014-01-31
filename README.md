![alt text](http://i.imgur.com/6AWcQQC.png "such venice doge") dogestream [![Build Status](https://travis-ci.org/WowSuchDogestream/dogestream.png?branch=master)](https://travis-ci.org/WowSuchDogestream/dogestream)
===========

That's no doge! [Actually yes it is!](http://en.wikipedia.org/wiki/Doge_of_Venice)

**dogestream is a hackday project at CBS Interactive that aims to be a streaming media center built entirely with web technologies.**

The primary goal of dogestream is to stream local video content to web browsers using NodeJS and HTML5 Video (look ma, no flash!).

Other goals, not necessarily for this hackday, include:
  - ~~Storing editable meta-data about video content~~ done!
  - Indexing local media for easy search
  - _Raptorizing all the things_
  - Playlists
  - Subtitle support

#### Technologies that will probably be used

##### NodeJS 0.10+
  - Express
  - nconf
  - Mocha
  - Chai
  - Mongoose
  - Nodemon
  - supertest
  - yuidocjs

##### Ruby 1.9.3+
  - Bourbon + Neat

##### Third Party
  - Travis-CI
  - MongoDB
  - `make`

##### Frontend
  - RequireJS
  - SammyJS
  - KnockoutJS
  - VideoJS
  - VexJS
  - _Raptorize_


## Environment
You do this:

```
make install
```

Then you either need to add video files yourself or upload them via the API.

In the simplest case, copy files into ./content/{category}/{title}.m4v, then
add an appropriate entry in MongoDB for the video file.

## Tests

You do this:

```
make tests
```

If it breaks, then please don't commit. Because, well, you make Travis feel bad.

## License
Check the license file in the root of the project.
