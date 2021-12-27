const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Banner = require('../model/Banner');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/banner/");
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


router.post("/add-banner",upload.single("sliderImage"),(req,res,next)=>{

    try {
             const { pageType,sliderText,buttonText,buttonLink} = req.body;

             var sliderImage = "";
                if (req.file != undefined) {
                    sliderImage = req.file.filename;
                }


            
            if (!pageType) {
                return res.status(422).json({
                    success: false,
                    data: "{}",
                    message: "Please Insert All Required Fields",
                });
            }

            const banner = new Banner({
                _id:new mongoose.Types.ObjectId(),
                pageType:pageType,
                sliderImage:sliderImage,
                sliderText:sliderText,
                buttonText:buttonText,
                buttonLink:buttonLink,
               

            });

          
            banner.save().then(result=>{
                return res.status(200).json({
                    success:true,
                    data:"{}",
                    message:"Banner Saved"
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


router.get("/get-banner",(req,res,next)=>{

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

router.get("/get-banner-by-id/:id",(req,res,next)=>{

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

router.put("/update-banner/:id",upload.single("sliderImage"),(req, res, next) => {

    try{

        const { pageType,sliderText,buttonText,buttonLink} = req.body;

             const sliderImage = "";
                if (req.file != undefined) {
                    sliderImage = req.file.filename;
                }


            
            if (!pageType) {
                return res.status(422).json({
                    success: false,
                    data: "{}",
                    message: "Please Insert All Required Fields",
                });
            }

            Banner.findOneAndUpdate({_id:req.params.id},
                {
                    $set:{

                        pageType:pageType,
                        sliderImage:sliderImage,
                        sliderText:sliderText,
                        buttonText:buttonText,
                        buttonLink:buttonLink,

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
  
  router.delete("/delete-banner/:id", (req, res, next) => {

    try{

        Banner.deleteOne({ _id: req.params.id })
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