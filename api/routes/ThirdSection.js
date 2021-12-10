const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var fs = require('fs');



const ThirdSection = require('../model/ThirdSection');


var dir = './uploads/thirdsection';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/thirdsection");
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





router.post("/add",upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),(req,res,next)=>{

    try {
             const { icon1,heading1,text1,icon2,heading2,text2,icon3,heading3,text3,icon4,heading4,text4} = req.body;

         
            
            // if (!aboutText) {
            //     return res.status(422).json({
            //         success: false,
            //         data: "{}",
            //         message: "Please Insert All Required Fields",
            //     });
            // }

            
            const image1 = req.files.image1[0];
            const image2 = req.files.image2[0];
            const image3 = req.files.image3[0];
            const image4 = req.files.image4[0];

        //    console.log(image1);
        //    return false;
            const thirdSection = new ThirdSection({
                _id:new mongoose.Types.ObjectId(),
               
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
                image1:image1.filename,
                image2:image2.filename,
                image3:image3.filename,
                image4:image4.filename
               

            });

          
            thirdSection.save().then(result=>{
                return res.status(200).json({
                    success:true,
                    data:"{}",
                    message:"Third Section Saved"
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


router.get("/get-third-section",(req,res,next)=>{

    try {
      ThirdSection.find().then(result=>{
            if(result)
            {
              
                let finalResult = [];
                result.forEach((e,i)=>{

                   var obj =  {
                        _id: e._id,
                       
                        icon1: e.icon1,
                        heading1: e.heading1,
                        text1: e.text1,
                        image1: "uploads/thirdsection/"+e.image1,
                        icon2: e.icon2,
                        heading2: e.heading2,
                        text2: e.text2,
                        image2: "uploads/thirdsection/"+e.image2,
                        icon3: e.icon3,
                        heading3: e.heading3,
                        text3: e.text3,
                        image3: "uploads/thirdsection/"+e.image3,
                        icon4: e.icon4,
                        heading4: e.heading4,
                        text4: e.text4,
                        image4: "uploads/" +e.image4
                       
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

router.put("/update-third-section/:id",upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),(req, res, next) => {

    try{

      const { icon1,heading1,text1,icon2,heading2,text2,icon3,heading3,text3,icon4,heading4,text4} = req.body;

         
            
   
      
      const image1 = req.files.image1[0];
      const image2 = req.files.image2[0];
      const image3 = req.files.image3[0];
      const image4 = req.files.image4[0];
         

                ThirdSection.findOneAndUpdate({_id:req.params.id},
                {
                    $set:{

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
                      image1:image1.filename,
                      image2:image2.filename,
                      image3:image3.filename,
                      image4:image4.filename

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
  
  router.delete("/delete-third-section/:id", (req, res, next) => {

    try{

      
      ThirdSection.deleteOne({ _id: req.params.id })
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