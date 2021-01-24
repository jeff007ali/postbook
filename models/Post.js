const mongoose = require('mongoose');

// Setup schema
var postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    no_of_comment: {
        type: Number,
        default: 0
    },
    creation_date: {
        type: Date,
        default: Date.now
    }
});

// Export Post model
module.exports = mongoose.model('post', postSchema);