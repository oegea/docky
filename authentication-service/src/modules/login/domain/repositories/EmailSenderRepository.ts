interface EmailSenderRepository {
  send: (
    to: string,
    subject: string,
    text: string
  ) => Promise<boolean>
}
export { EmailSenderRepository }
