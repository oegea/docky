const generateAccessToken = require('../token/generateAccessToken.js');
const error = require('../responses/error.js');
const success = require('../responses/success.js');

const handleTokenGenerationRequest = async (req, res, mongoDbClient) => {
    const {params} = req;
  
    if (!params || !params.email || !params.code) {
      return error({
        res, 
        message: 'Email and code is required',
        httpCode: 400
      });
    }

    const {email, code} = params;

    // Convert code to int and check if it is a number
    const number = parseInt(code);
    if (isNaN(number)) {
        return error({
            res,
            message: 'Code is invalid',
            httpCode: 400
        });
    }

    // Check in mongo if the email and code are valid
    const database = mongoDbClient.db('pass-authentication');
    const collection = database.collection('emailVerification');
    const result = await collection.findOne({
        email,
        number
    });

    if (!result) {
        return error({
            res,
            message: 'Email and code are invalid',
            httpCode: 400
        });
    }

    // Delete the email verification request
    await collection.deleteMany({
        email: params.email
    });

    // Generate a token
    const data = generateAccessToken(params.email)

    // Return the token
    success({
        data,
        res,
        message: 'Token generated successfully',
    });
}

module.exports = handleTokenGenerationRequest