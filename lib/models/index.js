var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , VideoSchema;

VideoScheme = mongoose.Schema({
    title: {
        type: String,
        required true
    },

    description: {
        type: String,
        required: true
    },

    path: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },

    category: [{
        type: String,
        required: true
    }],

    thumbnail: {
        type: String
    }


});