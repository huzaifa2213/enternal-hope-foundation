const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var fs = require('fs');



const FourthSection = require('../model/FourthSection');



router.post("/add",(req,res,next)=>{

    try {
             const { text} = req.body;

         
            
            if (!text) {
                return res.status(422).json({
                    success: false,
                    data: "{}",
                    message: "Please Insert All Required Fields",
                });
            }

            
            const fourthSection = new FourthSection({
                _id:new mongoose.Types.ObjectId(),
               
                text:text,
               
               

            });

          
            fourthSection.save().then(result=>{
                return res.status(200).json({
                    success:true,
                    data:"{}",
                    message:"Fourth Section Saved"
                })
            }).catch(err=>{
                return res.status(500).json({
                    success:false,
                    data:err,
                    message:"Something Went Wrong"
                })
            })

    } catch(err) {
        res.status(500).json({ message: err.message, success: false });
    }


    




})


router.get("/get-fourth-section",(req,res,next)=>{

    try {
        FourthSection.find().then(result=>{
            if(result)
            {
              
                
                return res.status(200).json({
                    success: true,
                    data: result,
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

router.get("/get-fourth-section-by-id/:id",(req,res,next)=>{

    if (!req.params.id) {
        return res.status(404).json({
          success:false,
          data: "{}",
          message: "Did Not Get Id",
        });
      }

      FourthSection.findById(req.params.id).then(result=>{
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

router.put("/update-fourth-section/:id",(req, res, next) => {

    try{

      const { text} = req.body;

      

      FourthSection.findOneAndUpdate({_id:req.params.id},
                {
                    $set:{

                      text:text,
                    

                    }
                }
                ).then((result) => {
                    return res.status(200).json({
                      success:true,
                      data: result,
                      message: "Second Section Updated Successfully",
                    });
                  })
                  .catch((err) => {
                    return res.status(200).json({
                      success:false,
                      data: err,
                      message: "Something Went Wrong",
                    });
                  });



    }catch(err){
      res.status(500).json({ message: err.message, success: false });
    }
         
 });
  
  // delete
  
  router.delete("/delete-fourth-section/:id", (req, res, next) => {

    try{

      
        FourthSection.deleteOne({ _id: req.params.id })
        .then((result) => {

          res.status(200).json({
            success:true,
            data: result,
            message: "Section Delete Duccessfully",
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
















module.exports = router