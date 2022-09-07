const nodemailer = require('nodemailer')

module.exports={
    mailToClient:(to,sub,text)=>{
        console.log("hey")
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtpout.secureserver.net',
        secureConnection: true,
        port: 465,
            auth: {
              user: 'notifications@stemclass.online',
              pass: 'StemClassNotificationMail@2021'
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