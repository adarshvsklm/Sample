const { response } = require('express');
var nodemailer = require('nodemailer');
const sendMail = require('./sendEmail');
const dotenv = require('dotenv');
dotenv.config();

let otp;

module.exports = {
  signup: async (req, res) => {
    try {
      const check = await User.findOne({ email: req.body.email });
    //   if (check) {
    //     res.status(404).json({ message: 'Email Already Registered' });
    //   }
      console.log(req.body);
      const newpassword = await bcrypt.hash(req.body.password, 10);
      await User.create({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        dob: req.body.dob,
        password: newpassword,
      });
      res.json({ status: 200 });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
  otp: async (req, res) => {
    try {
      otp = generateOTP(4);

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      var mailOptions = {
        from:  process.env.EMAIL,
        to: req.body.email,
        subject: 'OTP for Verification',
        text: `OTP : ${otp}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      function generateOTP(limit) {
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < limit; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      }
      req.body.subject = 'Sample';
      req.body.text = 'sample text';
      sendMail();
      res.status(200).json({ message: 'Otp send' });
    } catch (e) {
      res.status(500).json({ message: 'Error' });
    }
  },
  verifyOtp: (req, res) => {
    console.log(req.body.otp);
    if (req.body.otp == otp) {
      res.status(200).json({ message: 'verified' });
    } else {
      res.status(400).json({ message: 'validation failed' });
    }
  },
};
