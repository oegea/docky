var express = require('express');
var router = express.Router();

const connectToMongoDb = require('../domain/database/connectToMongoDb.js');
const handleEmailVerificationRequest = require('../domain/email/handleEmailVerificationRequest.js');
const handleTokenGenerationRequest = require('../domain/email/handleTokenGenerationRequest.js');

/* GET users listing. */
router.get('/validate-email/:email', async function(req, res) {
  const callback = handleEmailVerificationRequest.bind(this, req, res);
  connectToMongoDb(callback);
});

router.get('/:email/:code', async function(req, res) {
  const callback = handleTokenGenerationRequest.bind(this, req, res);
  connectToMongoDb(callback);
});

module.exports = router;
