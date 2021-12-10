const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const AdminUser = require("../model/AdminUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const helper = require("../helper/helper");

router.post("/signup", (req, res, next) => {
  const { username, email, phone, password } = req.body;
  if (!username || !email || !phone || !password) {
    return res.status(422).json({
      success: false,
      data: "{}",
      message: "Please Insert All Required Fields",
    });
  }


  const checkEmail = helper.validateEmail(req.body.email);

  if (!checkEmail) {
    return res.status(200).json({
      success: false,
      data: "{}",
      message: "Please Insert Valid Email Id",
    });
  }



 
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        success: false,
        data: "{}",
        message: "internal Server error!",
      });
    } else {
      // check phone exist or not
      AdminUser.findOne({
        $or: [{ email: req.body.email }, { phone: req.body.phone }],
      }).then((adminuser) => {
        if (adminuser) {
          return res.status(422).json({
            success: false,
            data: "{}",
            message: "Email Or Phone Number Already Exist",
          });
        } else {
          const adminUser = new AdminUser({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
            role: "admin",
            status: "1",
          });

          adminUser
            .save()
            .then((result) => {
              res.status(200).json({
                success: true,
                data: result,
                message: "Register Successfully",
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        }
      });
    }
  });
});

router.post("/login", async (req, res) => {
  // Get user input
  const { email, password } = req.body;
  // Validate if user exist in our database
  const user = await AdminUser.findOne({ email });
  

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) {
        return res.status(401).json({
          success: false,
          data: "{}",
          message: "Password Does Not Match!",
        });
      }

      const data = {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        token: token,
      };

      return res.status(200).json({
        success: true,
        data: data,
        message: "Login  Successfully",
      });

      // user
      // res.status(200).json(user);
    });
  } else {
    return res.status(401).json({
      success: false,
      data: "{}",
      message: "Invalid Credintials",
    });
  }
});

// forgot password

router.post("/forgot-password", (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(200).json({
      success: false,
      data: "{}",
      message: "Please Insert All Required Fields",
    });
  }

  const checkEmail = helper.validateEmail(email);

  if (!checkEmail) {
    return res.status(200).json({
      success: false,
      data: "{}",
      message: "Please Insert Valid Email Id",
    });
  }

  AdminUser.findOne({ email: email }).then((result) => {
    if (result) {
      const otp = helper.createOtp(5);
      AdminUser.findOneAndUpdate(
        { email: email },
        {
          $set: {
            otp: otp,
          },
        }
      )
        .then((result) => {
          // for send email
          const transporter = nodemailer.createTransport({
            host: "raxeon.co",
            port: 465,
            auth: {
              user: "infoschool@raxeon.co",
              pass: "Raxeon.22@",
            },
          });

          const mailOptions = {
            from: "infoschool@raxeon.co",
            to: email,
            subject: "OTP",
            text: otp,
            // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

          return res.status(200).json({
            success: true,
            data: otp,
            message: "Otp sent to your email id",
          });
        })
        .catch((err) => {
          return res.status(200).json({
            success: false,
            data: err,
            message: "Something Went Wrong",
          });
        });
    }
  });
});

router.post("/otp-match", (req, res, next) => {
  const { otp, email } = req.body;
  if (!otp || !email) {
    return res.status(200).json({
      success: false,
      data: "{}",
      message: "Please Insert All Required Fields",
    });
  }

  const checkEmail = helper.validateEmail(email);

  if (!checkEmail) {
    return res.status(200).json({
      success: false,
      data: "{}",
      message: "Please Insert Valid Email Id",
    });
  }

  AdminUser.findOne({ email: email }).then((result) => {
    if (result) {
      if (otp == result.otp) {
        return res.status(200).json({
          success: true,
          data: "{}",
          message: "Otp Match Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          data: "{}",
          message: "Otp Does Not Match",
        });
      }
    }
  });
});

router.post("/change-password", (req, res, next) => {
  const { email, password, cpassword } = req.body;
  if (!password || !email || !cpassword) {
    return res.status(401).json({
      success: false,
      data: "{}",
      message: "Please Insert All Required Fields",
    });
  }

  const checkEmail = validateEmail(email);

  if (!checkEmail) {
    return res.status(401).json({
      success: false,
      data: "{}",
      message: "Please Insert Valid Email Id",
    });
  }

  AdminUser.findOne({ email: email }).then((result) => {
    if (result) {
      if (password == cpassword) {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(401).json({
              success: false,
              data: err,
              message: "Something went wrong",
            });
          } else {
            AdminUser.findOneAndUpdate(
              { email: email },
              {
                $set: {
                  password: hash,
                },
              }
            )
              .then((result) => {
                return res.status(200).json({
                  success: true,
                  data: "{}",
                  message: "Passwod Has been changed",
                });
              })
              .catch((err) => {
                return res.status(500).json({
                  success: false,
                  data: err,
                  message: "Something Went Wrong",
                });
              });
          }
        });
      } else {
        return res.status(402).json({
          success: false,
          data: "{}",
          message: "Password and confirm password Does not match",
        });
      }
    }
  });
});

module.exports = router;
