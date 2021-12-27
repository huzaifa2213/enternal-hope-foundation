const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Activity = require('../../model/Activity');
const ActivityImage = require('../../model/ActivityImage');

router.get("/",(req,res,next)=>{

    try {

        Activity.aggregate([
            {
                $lookup:{
                    from: "activityimages",
                    localField: "_id",
                    foreignField: "activityId",
                    as: "activityImageDetails",
                }
            }
        ]).exec((err,result)=>{
            if (err) {
                return res.status(500).json({
                  success: false,
                  data: err,
                  message: "Something Went wrong",
                });
              } else {
                return res.status(200).json({
                  success: true,
                  data: result,
                  message: "Fetch Activity",
                });
              }
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
                message: "Something Went wrong!",
            });
      })

})

module.exports = router