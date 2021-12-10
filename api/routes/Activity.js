const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Activity = require('../model/Activity');
const ActivityImage = require('../model/ActivityImage');
const multer = require('multer');
const path = require('path');
var fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/activity/');
    },
  
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });




router.post('/add',(req,res,next)=>{
    try{

        const {activityName,venue,date} = req.body;
        if(!activityName || !venue ||  !date)
        {
                return res.status(422).json({
                    success: false,
                    data: "{}",
                    message: "Please Insert All Required Fields",
                });
        }

        const activity = new Activity({
            _id:new mongoose.Types.ObjectId,
            activityName:activityName,
            venue:venue,
            date:date

        })
        activity.save().then(result=>{
            return res.status(200).json({
                success:true,
                data:result,
                message:"Activity Added"
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
        Activity.find().then(result=>{
            if(result)
            {
                return res.status(200).json({
                    success: true,
                    data: result,
                    message: "Fetch Activity",
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

      Activity.findById(req.params.id).then(result=>{
          if(result)
          {
            return res.status(200).json({
                success: true,
                data: result,
                message: "Fetch Banner",
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
    const {activityName,venue,date} = req.body;
        if(!activityName || !venue ||  !date)
        {
                return res.status(422).json({
                    success: false,
                    data: "{}",
                    message: "Please Insert All Required Fields",
                });
        }

        Activity.updateOne({_id:req.params.id},{
            $set:{

                activityName:activityName,
                venue:venue,
                date:date
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

        Activity.deleteOne({ _id: req.params.id })
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


    }catch{
        console.log();
    }
   
  });



  /// activity images upload code

  router.post('/addImage',upload.array('image'),(req,res,next)=>{
    try{

     

        const {activityId} = req.body;
       
        

        const files = req.files;

        files.forEach(e =>{

           
            const activityimage = new ActivityImage({
                _id:new mongoose.Types.ObjectId,
                activityId:activityId,
                image:e.filename,
               
    
            })

            activityimage.save().then(result=>{
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

        ActivityImage.findById(req.params.id).then(result=>{

            var imagePath = `uploads/activity/${result.image}`;
            if (fs.existsSync(imagePath)) {
                //file exists
                fs.unlinkSync(imagePath);
              }

            
            ActivityImage.deleteOne({ _id: req.params.id })
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
