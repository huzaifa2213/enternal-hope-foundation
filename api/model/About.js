const mongoose = require('mongoose');
const validator = require("validator");

const aboutSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    
    aboutText:String,
    icon1:String,
    number1:String,
    text1:String,
    icon2:String,
    number2:String,
    text2:String,
    videoUrl:String

    
},{timestamps:true});


module.exports = mongoose.model('About',aboutSchema);