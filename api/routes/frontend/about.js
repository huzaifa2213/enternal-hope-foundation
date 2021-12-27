const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const About = require('../../model/About');

router.get("/",(req,res,next)=>{

    try {
        About.findOne().then(result=>{
            if(result)
            {
                return res.status(200).json({
                    success: true,
                    data: result,
                    message: "Fetch About",
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
router.get("/get/:id",(req,res,next)=>{


    if (!req.params.id) {
        return res.status(404).json({
          success:false,
          data: "{}",
          message: "Did Not Get Id",
        });
      }

      About.findById(req.params.id).then(result=>{
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