export const loadConfig = (parameters: {
    commonAppName: string,
    commonOrganizationName: string,
    commonMongoDbConnectionString: string,
    commonTokenSecret: string,
    commonMongoDbDatabase: string,
    commonDisableCors: boolean,
    authCollection: string,
    authPort: number,
    authSmtpHost: string,
    authSmtpPort: number,
    authSmtpUser: string,
    authSmtpPassword: string,
    authSmtpSender: string,
    authLimitAccessByEmail: boolean,
    authAllowedDomains: string,
    authAllowedEmails: string,
    docsPort: number,
    authLimitAttemptsPerIp: number,
    authLimitAttemptsWaitTime: number,
    htmlEmailTemplate: string | undefined
}): void => {
    process.env.COMMON_APP_NAME = parameters.commonAppName
    process.env.COMMON_DISABLE_CORS = parameters.commonDisableCors ? 'true' : 'false'
    process.env.COMMON_ORGANIZATION_NAME = parameters.commonOrganizationName
    process.env.COMMON_MONGODB_CONNECTION_STRING = parameters.commonMongoDbConnectionString
    process.env.COMMON_TOKEN_SECRET = parameters.commonTokenSecret
    process.env.COMMON_MONGODB_DATABASE = parameters.commonMongoDbDatabase
    process.env.AUTH_COLLECTION = parameters.authCollection
    process.env.AUTH_PORT = parameters.authPort?.toString()
    process.env.AUTH_SMTP_HOST = parameters.authSmtpHost
    process.env.AUTH_SMTP_PORT = parameters.authSmtpPort?.toString()
    process.env.AUTH_SMTP_USER = parameters.authSmtpUser
    process.env.AUTH_SMTP_PASSWORD = parameters.authSmtpPassword
    process.env.AUTH_SMTP_SENDER = parameters.authSmtpSender
    process.env.AUTH_LIMIT_ACCESS_BY_EMAIL = parameters.authLimitAccessByEmail?.toString()
    process.env.AUTH_ALLOWED_DOMAINS = parameters.authAllowedDomains
    process.env.AUTH_ALLOWED_EMAILS = parameters.authAllowedEmails
    process.env.DOCS_PORT = parameters.docsPort?.toString()
    process.env.AUTH_LIMIT_ATTEMPTS_PER_IP = parameters.authLimitAttemptsPerIp?.toString()
    process.env.AUTH_LIMIT_ATTEMPTS_PER_IP_WAIT_TIME = parameters.authLimitAttemptsWaitTime?.toString()
    parameters.htmlEmailTemplate !== undefined && (process.env.HTML_EMAIL_TEMPLATE = parameters.htmlEmailTemplate)
}