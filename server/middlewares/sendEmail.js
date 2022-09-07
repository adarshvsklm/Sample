const dotenv = require('dotenv');
dotenv.config();

const sendMail=(req,res)=>{

     let subject=req.body.subject
     let text=req.body.text
     console.log(subject,text);
     try{
         
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
  
      var mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: subject,
        text: `${text}`,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
   
      res.status(200).json({message:"Email send"})
    }catch(e){
        res.status(500).json({message:"Error"})
    }
}

module.exports = sendMail