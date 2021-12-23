const mongoose = require('mongoose');
const validator = require('validator');


const newsImage = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   
    newsId:[{type:mongoose.Types.ObjectId,ref:'News',required:true}],
    image:{
        type:String,
        required:true,

    },
  


},{timestamps:true})

module.exports = mongoose.model('NewsImage',newsImage);