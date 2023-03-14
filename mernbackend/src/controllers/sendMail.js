const nodemailer = require("nodemailer");

const sendMail=async (req,res) => {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'kariane.jakubowski77@ethereal.email',
            pass: 'KGEtDfrG22VW7BkmHq'
        },
      });

    let info = await transporter.sendMail({
        from: '"Gaurav Deshmukh 👻" <gaurav@gmail.com>', // sender address
        to: "india17032001@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
      
    console.log("Message sent: %s", info.messageId); 
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); 

    res.json(info);
}

module.exports=sendMail;