let express = require('express')
let router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../model');
const authentication = require('../middlewares/Authentication');
const sendMail = require('../middlewares/sendEmail');
 


router.post('/signup',authentication.signup )
router.post('/otp',authentication.otp)
router.post('/verifyOtp',authentication.verifyOtp)
router.post('/sendMail',sendMail)

module.exports=router