var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , VideoSchema;

VideoSchema = mongoose.Schema({
    // The video title
    title: {
        type: String,
        required: true
    },
    // A brief description of the video
    description: {
        type: String,
        required: true
    },
    // The file path to this video
    path: {
        type: String,
        required: true
    },
    // The length of this video
    duration: {
        type: String,
        required: true
    },
    // The category best suited for this video
    category: {
        type: String,
        required: true
    },
    // Optional path to thumbnail for this video
    thumbnail: {
        type: String
    },

    // Optional tags to associate with this video
    tags: {
        type: String
    }
});

mongoose.model('Video', VideoSchema);
module.exports = mongoose;