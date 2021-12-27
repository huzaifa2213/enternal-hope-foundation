const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ThirdSection = require('../../model/ThirdSection');

router.get("/",(req,res,next)=>{

    try {
      ThirdSection.find().then(result=>{
            if(result)
            {
              
                let finalResult = [];
                result.forEach((e,i)=>{

                   var obj =  {
                        _id: e._id,
                       
                        heading1: e.heading1,
                        text1: e.text1,
                        image1: "uploads/thirdsection/"+e.image1,
                        heading2: e.heading2,
                        text2: e.text2,
                        image2: "uploads/thirdsection/"+e.image2,
                        heading3: e.heading3,
                        text3: e.text3,
                        image3: "uploads/thirdsection/"+e.image3,
                        heading4: e.heading4,
                        text4: e.text4,
                        image4: "uploads/thirdsection/" +e.image4
                       
                      }



                     
                    finalResult.push(obj);
                    
                })
                
                return res.status(200).json({
                    success: true,
                    data: finalResult,
                    message: "Fetch Second Section",
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

router.get("/get-third-section-by-id/:id",(req,res,next)=>{

    if (!req.params.id) {
        return res.status(404).json({
          success:false,
          data: "{}",
          message: "Did Not Get Id",
        });
      }

      ThirdSection.findById(req.params.id).then(result=>{
          if(result)
          {
              
            return res.status(200).json({
                success: true,
                data: result,
                message: "Fetch Section",
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