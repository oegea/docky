// Domain
import { EmailSenderRepository } from '../../domain/repositories/EmailSenderRepository'
// Infrastructure
import nodemailer from 'nodemailer'

class NodeMailerEmailSenderRepository implements EmailSenderRepository {
  async send (to: string, subject: string, text: string): Promise<boolean> {
    const transport = nodemailer.createTransport({
      host: process.env.AUTH_SMTP_HOST,
      port: process.env.AUTH_SMTP_PORT,
      auth: {
        user: process.env.AUTH_SMTP_USER,
        pass: process.env.AUTH_SMTP_PASSWORD
      }
    })
    const sender = process.env.AUTH_SMTP_SENDER

    return await new Promise((resolve/*, reject */) => {
      const mailOptions = {
        from: sender,
        to,
        subject,
        text
      }

      transport.sendMail(mailOptions, function (err/*, info */) {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  async sendHtml (to: string, subject: string, html: string): Promise<boolean> {
    const transport = nodemailer.createTransport({
      host: process.env.AUTH_SMTP_HOST,
      port: process.env.AUTH_SMTP_PORT,
      auth: {
        user: process.env.AUTH_SMTP_USER,
        pass: process.env.AUTH_SMTP_PASSWORD
      }
    })
    const sender = process.env.AUTH_SMTP_SENDER

    return await new Promise((resolve/*, reject */) => {
      const mailOptions = {
        from: sender,
        to,
        subject,
        html
      }

      transport.sendMail(mailOptions, function (err/*, info */) {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }
}

export { NodeMailerEmailSenderRepository }
