module.exports = ({res, data = null, message = ''}) => {
    res.send({
        success: true,
        data,
        message
    })
}