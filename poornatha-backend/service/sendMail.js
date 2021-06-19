const transporter=require('./emailTransporter');

const SendMail=(mailOptions)=>{
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log("Error occurs", err);
        }
        console.log("Email sent!!!");
      });
}


module.exports={
    SendMail
}