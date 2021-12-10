const mongoose = require('mongoose');
const validator = require("validator");

const secondSectionSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    
    mainHeading:String,
    icon1:String,
    heading1:String,
    text1:String,
    icon2:String,
    heading2:String,
    text2:String,
    icon3:String,
    heading3:String,
    text3:String,
    icon4:String,
    heading4:String,
    text4:String,
    image:String

    
},{timestamps:true});


module.exports = mongoose.model('SecondSection',secondSectionSchema);