const mongoose = require('mongoose');
const validator = require("validator");

const bannerSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    pageType:{type:String,enum:['home', 'about','news','activity','contactus'],required:true},
    sliderImage:String,
    sliderText:String,
    buttonText:String,
    buttonLink:String,
    
},{timestamps:true});


module.exports = mongoose.model('Banner',bannerSchema);