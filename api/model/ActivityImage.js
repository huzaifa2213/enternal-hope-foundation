const mongoose = require('mongoose');
const validator = require('validator');


const activityImage = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   
    activityId:[{type:mongoose.Types.ObjectId,ref:'Activity',required:true}],
    image:{
        type:String,
        required:true,

    },
  


},{timestamps:true})

module.exports = mongoose.model('activityImage',activityImage);