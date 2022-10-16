// Domain
import { EmailSenderRepository } from '../../domain/repositories/EmailSenderRepository'
// Infrastructure
import nodemailer from 'nodemailer'

class NodeMailerEmailSenderRepository implements EmailSenderRepository {
  send (to: string, subject: string, text: string): Promise<boolean> {

    const transport = nodemailer.createTransport({
        host: process.env.PASS_AUTH_SMTP_HOST,
        port: process.env.PASS_AUTH_SMTP_PORT,
        auth: {
          user: process.env.PASS_AUTH_SMTP_USER,
          pass: process.env.PASS_AUTH_SMTP_PASSWORD
        }
    })
    const sender = process.env.PASS_AUTH_SMTP_SENDER

    return new Promise((resolve/*, reject*/) => {
      const mailOptions = {
          from: sender,
          to,
          subject,
          text,
      };
     
      transport.sendMail(mailOptions, function(err/*, info*/) {
          if (err) {
              resolve(false)
          } else {
              resolve(true)
          }
      });
  });
  }
}

export { NodeMailerEmailSenderRepository }
