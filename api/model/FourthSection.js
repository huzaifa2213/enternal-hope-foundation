const mongoose = require('mongoose');
const validator = require("validator");

const fourthSectionSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,   
    
    text:{type:String,required:true}

    
},{timestamps:true});


module.exports = mongoose.model('FourthSection',fourthSectionSchema);