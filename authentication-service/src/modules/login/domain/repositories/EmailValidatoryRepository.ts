type EmailValidatorRepository = {
    hasValidFormat(string): Promise<boolean>; 
};
export {EmailValidatorRepository}