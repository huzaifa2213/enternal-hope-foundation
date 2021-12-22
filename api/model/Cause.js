const mongoose = require('mongoose');
const validator = require('validator');

const causeSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    causeName:{
        type:String,
        required:true,

    },
    fundRaise:{
        type:String,
        required:true
    },
    requiredFund:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    videoUrl:{
        type:String,
        required:true
    }



},{timestamps:true})

module.exports = mongoose.model('Cause',causeSchema);