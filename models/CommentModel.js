const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'user'
    },

    itineraryId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'itinerary'
    },

    date: {
        type: Date,
        default: Date.now
    },

    body: String,
});

module.exports = Comment = mongoose.model('comment', commentSchema)
