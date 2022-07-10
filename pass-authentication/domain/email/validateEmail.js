const emailValidator = require('deep-email-validator');

module.exports = async (email) => {
    try{
        const validateResult = await emailValidator.validate({
            email,
            validateTypo: false,
            validateSMTP: false
        });
        if (!validateResult)
            return false;
    
        return validateResult.valid;
    } catch (e) {
        console.error(e);
        return false;
    }

}