const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cause = require('../../model/Cause');
const CauseImage = require('../../model/CauseImage');

router.get("/",(req,res,next)=>{

    try {

        Cause.aggregate([
            {
                $lookup:{
                    from: "causeimages",
                    localField: "_id",
                    foreignField: "causeId",
                    as: "causeImageDetails",
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
                  message: "Fetch Cause",
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

      Cause.findById(req.params.id).then(result=>{
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

module.exports = router