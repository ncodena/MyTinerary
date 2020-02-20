const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type:String,
        required:true,
    },
    userName: {
        type:String,
        required:true,
        unique: true
    },
    country:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itinerary'
    }],
});

module.exports = User = mongoose.model('user', userSchema)
