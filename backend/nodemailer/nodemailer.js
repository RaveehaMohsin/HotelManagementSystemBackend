const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port : 587,
    secure: false,
    auth:{
        user:"mohsinraveeha@gmail.com",
        pass:"kazn ssyq vdmf yxhx",
    }
})

module.exports = {transporter}