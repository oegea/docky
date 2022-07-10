const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.PASS_AUTH_SMTP_HOST,
    port: process.env.PASS_AUTH_SMTP_PORT,
    auth: {
      user: process.env.PASS_AUTH_SMTP_USER,
      pass: process.env.PASS_AUTH_SMTP_PASSWORD
    }
});

const sender = process.env.PASS_AUTH_SMTP_SENDER;

const sendEmail = ({to, subject, text}) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: sender, // Sender address
            to, // List of recipients
            subject, // Subject line
            text, // Plain text body
        };
       
        transport.sendMail(mailOptions, function(err, info) {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
}

module.exports = sendEmail;
 