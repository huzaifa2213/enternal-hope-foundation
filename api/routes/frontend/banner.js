const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Banner = require('../../model/Banner');

router.get("/",(req,res,next)=>{

    try {
        Banner.find().then(result=>{
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
                message: "Something Went Wrong!",
            });
        })

    } catch(e) {
        console.log();
        // [Error: Uh oh!]
    }
})

router.get("/:id",(req,res,next)=>{

    if (!req.params.id) {
        return res.status(404).json({
          success:false,
          data: "{}",
          message: "Did Not Get Id",
        });
      }

      Banner.findById(req.params.id).then(result=>{
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

module.exports = router;