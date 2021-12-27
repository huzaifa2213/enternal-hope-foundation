const mongoose = require('mongoose');
const validator = require("validator");

const thirdSectionSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,   
    
    heading1:String,
    text1:String,
    image1:String,
    heading2:String,
    text2:String,
    image2:String,
    heading3:String,
    text3:String,
    image3:String,
    heading4:String,
    text4:String,
    image4:String

    
},{timestamps:true});


module.exports = mongoose.model('ThirdSection',thirdSectionSchema);