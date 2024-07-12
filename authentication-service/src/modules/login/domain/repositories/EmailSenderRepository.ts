interface EmailSenderRepository {
  send: (
    to: string,
    subject: string,
    text: string
  ) => Promise<boolean>

  sendHtml: (
    to: string,
    subject: string,
    html: string
  ) => Promise<boolean>
}
export { EmailSenderRepository }
