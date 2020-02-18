const mongoose = require('mongoose')
const itinerarySchema = new mongoose.Schema({
    cityId:{
        type: String,
        required: true
    },
    references:{
        type:String,
        required:true,
    },
    title:{
        type: String,
        required:true,
    },
    img:{
        type: String,
        required:true,
    },
    rating:{
        type: Number,
        required: true
    },
    duration:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    activities:{
        type: Array,
        required:true
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'comment',
    }],
});


module.exports = Itinerary = mongoose.model('itinerary', itinerarySchema)