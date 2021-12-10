const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const About = require('../model/About');



router.post("/add-about",(req,res,next)=>{

    try {
             const { aboutText,icon1,number1,text1,icon2,number2,text2,videoUrl} = req.body;

         
            
            // if (!aboutText) {
            //     return res.status(422).json({
            //         success: false,
            //         data: "{}",
            //         message: "Please Insert All Required Fields",
            //     });
            // }

            const about = new About({
                _id:new mongoose.Types.ObjectId(),
                aboutText:aboutText,
                icon1:icon1,
                number1:number1,
                text1:text1,
                icon2:icon2,
                number2:number2,
                text2:text2,
                videoUrl:videoUrl,
               

            });

          
            about.save().then(result=>{
                return res.status(200).json({
                    success:true,
                    data:"{}",
                    message:"About Saved"
                })
            }).catch(err=>{
                return res.status(500).json({
                    success:false,
                    data:err,
                    message:"Something Went Wrong"
                })
            })

    } catch(e) {
        console.log();
        // [Error: Uh oh!]
    }


    




})


router.get("/get-about",(req,res,next)=>{

    try {
        About.find().then(result=>{
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

router.get("/get-about-by-id/:id",(req,res,next)=>{

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

router.put("/update-about/:id",(req, res, next) => {

    try{

        const { aboutText,icon1,number1,text1,icon2,number2,text2,videoUrl} = req.body;

          
         

            About.findOneAndUpdate({_id:req.params.id},
                {
                    $set:{

                        aboutText:aboutText,
                        icon1:icon1,
                        number1:number1,
                        text1:text1,
                        icon2:icon2,
                        number2:number2,
                        text2:text2,
                        videoUrl:videoUrl,

                    }
                }
                ).then((result) => {
                    return res.status(200).json({
                      success:true,
                      data: result,
                      message: "banner Updated Successfully",
                    });
                  })
                  .catch((err) => {
                    return res.status(200).json({
                      success:false,
                      data: err,
                      message: "Something Went Wrong",
                    });
                  });



    }catch{
        console.log();
    }
         
 });
  
  // delete
  
  router.delete("/delete-about/:id", (req, res, next) => {

    try{

        About.deleteOne({ _id: req.params.id })
        .then((result) => {
          res.status(200).json({
            success:true,
            data: result,
            message: "Banner Delete Duccessfully",
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