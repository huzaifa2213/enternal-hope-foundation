const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const SecondSection = require('../model/SecondSection');


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        new Date().getDate() + new Date().getSeconds() + file.originalname
      );
    },
  });
  
  const upload = multer({
    storage: storage,
    // limits: {
    //   fileSize: 1024 * 1024 * 5
    // },
    // fileFilter: fileFilter
  });





router.post("/add-second-section",(req,res,next)=>{

    try {
             const { mainHeading,icon1,heading1,text1,icon2,heading2,text2,icon3,heading3,text3,icon4,heading4,text4,image} = req.body;

         
            
            // if (!aboutText) {
            //     return res.status(422).json({
            //         success: false,
            //         data: "{}",
            //         message: "Please Insert All Required Fields",
            //     });
            // }

            const secondSection = new SecondSection({
                _id:new mongoose.Types.ObjectId(),
                mainHeading:mainHeading,
                icon1:icon1,
                heading1:heading1,
                text1:text1,
                icon2:icon2,
                heading2:heading2,
                text2:text2,
                icon3:icon3,
                heading3:heading3,
                text3:text3,
                icon4:icon4,
                heading4:heading4,
                text4:text4,
                image:image
               

            });

          
            secondSection.save().then(result=>{
                return res.status(200).json({
                    success:true,
                    data:"{}",
                    message:"Second Section Saved"
                })
            }).catch(err=>{
                return res.status(500).json({
                    success:false,
                    data:err,
                    message:"Something Went Wrong"
                })
            })

    } catch(e) {
      res.status(500).json({ message: err.message, success: false });
    }


    




})


router.get("/get-second-section",(req,res,next)=>{

    try {
        SecondSection.find().then(result=>{
            if(result)
            {
                let finalResult = [];
                result.forEach((e,i)=>{

                   var obj =  {
                        _id: e._id,
                        mainHeading: e.mainHeading,
                        icon1: e.icon1,
                        heading1: e.heading1,
                        text1: e.text1,
                        icon2: e.icon2,
                        heading2: e.heading2,
                        text2: e.text2,
                        icon3: e.icon3,
                        heading3: e.heading3,
                        text3: e.text3,
                        icon4: e.icon4,
                        heading4: e.heading4,
                        text4: e.text4,
                        image: "uploads/" +e.mainHeading
                       
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

    } catch(e) {
      res.status(500).json({ message: err.message, success: false });
    }


    




})

router.get("/get-second-section-by-id/:id",(req,res,next)=>{

    if (!req.params.id) {
        return res.status(404).json({
          success:false,
          data: "{}",
          message: "Did Not Get Id",
        });
      }

      SecondSection.findById(req.params.id).then(result=>{
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

router.put("/update-second-section/:id",upload.single("image"),(req, res, next) => {

    try{

        const { mainHeading,icon1,heading1,text1,icon2,heading2,text2,icon3,heading3,text3,icon4,heading4,text4} = req.body;

        const image = "";
        if (req.file != undefined) {
            image = req.file.filename;
        }

         

        SecondSection.findOneAndUpdate({_id:req.params.id},
                {
                    $set:{

                        mainHeading:mainHeading,
                        icon1:icon1,
                        heading1:heading1,
                        text1:text1,
                        icon2:icon2,
                        heading2:heading2,
                        text2:text2,
                        icon3:icon3,
                        heading3:heading3,
                        text3:text3,
                        icon4:icon4,
                        heading4:heading4,
                        text4:text4,
                        image:image

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
  
  router.delete("/delete-second-section/:id", (req, res, next) => {

    try{

        SecondSection.deleteOne({ _id: req.params.id })
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


    }catch(err){
      res.status(500).json({ message: err.message, success: false });
    }
   
  });
















module.exports = router