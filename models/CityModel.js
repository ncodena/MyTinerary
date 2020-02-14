const mongoose = require('mongoose')
const citySchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique: true
    },
    country:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
})
module.exports = City = mongoose.model('city', citySchema);