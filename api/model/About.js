const mongoose = require('mongoose');
const validator = require("validator");

const aboutSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    
    aboutText:String,
    number1:String,
    number2:String,
    image:String

    
},{timestamps:true});


module.exports = mongoose.model('About',aboutSchema);