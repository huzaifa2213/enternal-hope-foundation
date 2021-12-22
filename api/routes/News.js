const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const News = require('../model/News');
// const CauseImage = require('../model/CauseImage');
const multer = require('multer');
const path = require('path');
var fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/news/');
    },
  
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });




router.post('/add',(req,res,next)=>{
    try{

        const {name,author,date,description,videoUrl} = req.body;
        if(!name || !author ||  !date || !description || !videoUrl)
        {
                return res.status(422).json({
                    success: false,
                    data: "{}",
                    message: "Please Insert All Required Fields",
                });
        }

        const news = new News({
            _id:new mongoose.Types.ObjectId,
            name:name,
            author:author,
            date:author,        

            description:description,
            image:description,
            videoUrl:videoUrl

        })
        news.save().then(result=>{
            return res.status(200).json({
                success:true,
                data:result,
                message:"News Added"
            })
        }).catch((err)=>{
            return res.status(500).json({
                success:false,
                data:err,
                message:"something Went Wrong"
            })
        })


    }catch(err){
        res.status(500).json({ message: err.message, success: false });
    }
})

router.get("/get",(req,res,next)=>{

    try {
        News.find().then(result=>{
            if(result)
            {
                return res.status(200).json({
                    success: true,
                    data: result,
                    message: "Fetch News",
                });
            }else{
                
                return res.status(404).json({
                    success: false,
                    data: '{}',
                    message: "Data Not Found!",
                });

            }
        }).catch(err=>{
            return res.status(500).json({
                success: false,
                data: '{}',
                message: "Something Went Wrong!",
            });
        })

    } catch(err) {
        res.status(500).json({ message: err.message, success: false });
    }

   
})


router.get("/get/:id",(req,res,next)=>{


    if (!req.params.id) {
        return res.status(404).json({
          success:false,
          data: "{}",
          message: "Did Not Get Id",
        });
      }

      News.findById(req.params.id).then(result=>{
          if(result)
          {
            return res.status(200).json({
                success: true,
                data: result,
                message: "Fetch Cause",
            });
          }else{
            return res.status(404).json({
                success: false,
                data: '{}',
                message: "Data Not Found!",
            });
          }
      }).catch(err=>{
          return res.status(500).json({
                success: false,
                data: '{}',
                message: "Something Went wrong!",
            });
      })

})

router.put('/update/:id',(req,res,next)=>{
    const {name,author,date,description} = req.body;
    if(!name || !author ||  !date || !description)
    {
            return res.status(422).json({
                success: false,
                data: "{}",
                message: "Please Insert All Required Fields",
            });
    }

    News.updateOne({_id:req.params.id},{
            $set:{

                name:name,
                author:author,
                date:author,        
    
                description:description,
                image:description
            }
        }).then(result=>{
            return res.status(200).json({
                success:true,
                data: result,
                message: "Activity Updated Successfully",
            })
        }) .catch((err) => {
            return res.status(200).json({
              success:false,
              data: err,
              message: "Something Went Wrong",
            });
          });


})

router.delete("/delete/:id", (req, res, next) => {

    try{

        News.deleteOne({ _id: req.params.id })
        .then((result) => {
          res.status(200).json({
            success:true,
            data: result,
            message: "Cause Delete Duccessfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            success:false,
            data: err,
            message: "something went wrong",
          });
        });


    }catch{
        console.log();
    }
   
  });



  /// cause images upload code

  router.post('/addImage',upload.array('image'),(req,res,next)=>{
    try{

     

        const {causeId} = req.body;
       
        

        const files = req.files;

        files.forEach(e =>{

           
            const causeImage = new CauseImage({
                _id:new mongoose.Types.ObjectId,
                causeId:causeId,
                image:e.filename,
               
    
            })

            causeImage.save().then(result=>{
                return res.status(200).json({
                    success:true,
                    data:result,
                    message:"Activity Image Added"
                })
            }).catch((err)=>{
                return res.status(500).json({
                    success:false,
                    data:err,
                    message:"something Went Wrong"
                })
            })


        })

   


    }catch(err){
        res.status(500).json({ message: err.message, success: false });
    }
})


router.delete("/imagedelete/:id", (req, res, next) => {

    try{

        CauseImage.findById(req.params.id).then(result=>{

            var imagePath = `uploads/cause/${result.image}`;
            if (fs.existsSync(imagePath)) {
                //file exists
                fs.unlinkSync(imagePath);
              }

            
              CauseImage.deleteOne({ _id: req.params.id })
            .then((result) => {

             

            res.status(200).json({
                success:true,
                data: result,
                message: "Activity Delete Duccessfully",
            });
            })
            .catch((err) => {
            res.status(500).json({
                success:false,
                data: err,
                message: "something went wrong",
            });
            });
            

        })

    

    }catch(e){
        console.log(e);
    }
   
  });

  












module.exports = router;
