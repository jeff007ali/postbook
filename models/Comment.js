const mongoose = require('mongoose');

// Setup schema
var commentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    parent_id: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now
    }
});

// Export Comment model
module.exports = mongoose.model('comment', commentSchema);