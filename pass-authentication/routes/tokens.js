var express = require('express');
var router = express.Router();


const connectToMongoDb = require('../domain/database/connectToMongoDb.js');
const handleEmailVerificationRequest = require('../domain/email/handleEmailVerificationRequest.js');



/* GET users listing. */
router.get('/', async function(req, res, next) {

  const callback = handleEmailVerificationRequest.bind(this, req, res);
  connectToMongoDb(callback);

});

module.exports = router;
