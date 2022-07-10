module.exports = ({res, data = null, message = '', httpCode = 500}) => {
    res.status(httpCode).json({
        success: false,
        data,
        message
    })
}