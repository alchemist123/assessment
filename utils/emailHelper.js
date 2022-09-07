const nodemailer = require('nodemailer')

module.exports={
    mailToClient:(to,sub,text)=>{
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtpout.secureserver.net',
        secureConnection: true,
        port: 465,
            auth: {
              user: 'newdestiny2022high@gmail.com',
              pass: process.env.PASS
            },
            tls: { rejectUnauthorized: false }
          });
         const mailOptions = {
            from: 'notifications@stemclass.online',
            to: to,
            subject: sub,
            html: text  
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: '+ to + info.response);
            }
          }); 

    }
}
