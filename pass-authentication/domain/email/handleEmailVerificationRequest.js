const error = require('../responses/error.js');
const success = require('../responses/success.js');
const validateEmail = require('../email/validateEmail.js');
const sendEmail = require('../email/sendEmail.js');
const generateValidationNumber = require('../number/generateValidationNumber.js');

const handleEmailVerificationRequest = async (req, res, mongoDbClient) => {
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
        const number = generateValidationNumber();
        // select database 
        const database = mongoDbClient.db('pass-authentication');

        const createdAt = new Date(Date.now());
        const collection = database.collection('emailVerification');

        try{
            await collection.deleteMany({
                email: body.email
            });
    
            const result = await collection.insertOne({
                email: body.email,
                number,
                createdAt
            });
        }catch(e) {
            return error({
                res,
                message: 'Failed to insert email verification request',
                httpCode: 500
            });
        }


        await sendEmail({
            to: body.email,
            subject: 'Pass Auth - Reset Password',
            text: `
                Hello,

                Your code to identify on Passager is ${number}.

                Thank you for using Passager.

                This e-mail has been sent by ${process.env.COMMON_ORGANIZATION_NAME}. Passager is an open source password manager. Passager developers might not have any kind of relation with ${process.env.COMMON_ORGANIZATION_NAME}.

                --

                Hola,

                Tu código para identificarte en Passager es ${number}.

                Gracias por usar Passager.

                Este correo electrónico ha sido enviado por ${process.env.COMMON_ORGANIZATION_NAME}. Passager es una aplicación de gestión de contraseñas de código abierto. Los desarrolladores de Passager pueden no estar relacionados con ${process.env.COMMON_ORGANIZATION_NAME}.
            `
        })

        success({
            res,
            message: 'Validation e-mail sent',
        });
    } catch(e) {
        console.error(e);
        error({
            res,
            message: 'Error sending email',
        });
    }
  }
module.exports = handleEmailVerificationRequest;