const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const About = require('../model/About');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/about/");
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




router.post("/add-about",upload.single("image"),(req,res,next)=>{

    try {
             const { aboutText,number1,number2} = req.body;
              

            

             var sliderimage = "";
             if (req.file.filename != '') {

               
                sliderimage = req.file.filename;
             }

            //  console.log(sliderimage);

            const about = new About({
                _id:new mongoose.Types.ObjectId(),
                aboutText:aboutText,
                number1:number1,
                number2:number2,
                image:sliderimage,
                });
                
             about.save().then(result=>{
                console.log(result);
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

        const { aboutText,number1,number2} = req.body;

          
         
        var sliderImage = "";
        if (req.file != undefined) {
            sliderImage = req.file.filename;
        }

            About.findOneAndUpdate({_id:req.params.id},
                {
                    $set:{

                        aboutText:aboutText,
                        number1:number1,
                        number2:number2,
                        image:sliderImage,

                    }
                }
                ).then((result) => {
                    return res.status(200).json({
                      success:true,
                      data: result,
                      message: "About Updated Successfully",
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