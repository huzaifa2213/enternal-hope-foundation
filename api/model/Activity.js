const mongoose = require('mongoose');
const validator = require('validator');

const activitySchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    activityName:{
        type:String,
        required:true,

    },
    venue:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }


})

module.exports = mongoose.model('Activity',activitySchema);