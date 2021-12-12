const mongoose = require('mongoose');
const validator = require('validator');

const NewsSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true,

    },
    image:{
        type:String,
        
    },
    author:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    }



},{timestamps:true})

module.exports = mongoose.model('News',NewsSchema);