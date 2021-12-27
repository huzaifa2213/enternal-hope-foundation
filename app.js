const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
const mongoose = require('mongoose');
require('dotenv').config();

var url = process.env.MONGO_URL;

const auth = require("./api/middleware/Auth");

app.use(express.json()); // set headers


app.use('/uploads', express.static('uploads'));

// app.use(expressValidator());

// database connerct

mongoose.connect(url,{ useUnifiedTopology:true,useNewUrlParser:true},(err,result)=>{

    if(err)
    {
        throw err
    }else{
        console.log('database connected')
    }
})

const adminUser = require('./api/routes/AdminUser');
const banner = require('./api/routes/Banner');
const About = require('./api/routes/About');
const SecondSection = require('./api/routes/SecondSection');
const ThirdSection = require('./api/routes/ThirdSection');
const FourthSection = require('./api/routes/FourthSection');
const Activity = require('./api/routes/Activity');
const Cause = require('./api/routes/Cause');
const News = require('./api/routes/News');

// frontend

const FrontCause = require('./api/routes/frontend/cause');
const FrontActivity = require('./api/routes/frontend/activity');
const FrontNews = require('./api/routes/frontend/news');
const FrontAbout = require('./api/routes/frontend/about');
const FrontThirdSection = require('./api/routes/frontend/thirdSection');
const FrontBanner = require('./api/routes/frontend/banner');

app.use('/adminuser',adminUser);
app.use('/banner',auth,banner);
app.use('/secondsection',auth,SecondSection);
app.use('/thirdsection',auth,ThirdSection);
app.use('/fourthSection',auth,FourthSection);
app.use('/activity',auth,Activity);
app.use('/cause',auth,Cause);
app.use('/news',auth,News);
app.use('/about',auth,About);
// front url

app.use('/frontend/cause',FrontCause);
app.use('/frontend/activity',FrontActivity);
app.use('/frontend/news',FrontNews);
app.use('/frontend/about',FrontAbout);
app.use('/frontend/thirdsection',FrontThirdSection);
app.use('/frontend/banner',FrontBanner);



app.use((req, res, next) => {
    res.status(400).json({
      error: "bad request",
    });
  });
  
  module.exports = app;
  