const mongoose = require('mongoose');
const validator = require('validator');


const causeImage = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   
    causeId:[{type:mongoose.Types.ObjectId,ref:'Cause',required:true}],
    image:{
        type:String,
        required:true,

    },
  


},{timestamps:true})

module.exports = mongoose.model('CauseImage',causeImage);