var express = require('express');
var router = express.Router();
const error = require('../domain/responses/error.js');
const success = require('../domain/responses/success.js');
const generateAccessToken = require('../domain/token/generateAccessToken.js');
const validateEmail = require('../domain/email/validateEmail.js');
const sendEmail = require('../domain/email/sendEmail.js');

/* GET users listing. */
router.get('/', async function(req, res, next) {

  const {body} = req;

  if (!body || !body.email) {
    return error({
      res, 
      message: 'Email is required',
      httpCode: 400
    });
  }

  const validateResult = await validateEmail(body.email);

  if (!validateResult) {
    return error({
      res, 
      message: 'Email is invalid',
      httpCode: 400
    });
  }

  try {
    await sendEmail({
      to: body.email,
      subject: 'Pass Auth - Reset Password',
      text: `
        Hola,
        Tu código para identificarte en Passager es 871209
      `
    })
  
    success({
      res,
      message: 'Token generated successfully, please check your email',
    });
  } catch(e) {
    console.error(e);
    error({
      res,
      message: 'Error sending email',
    });
  }

});

module.exports = router;
