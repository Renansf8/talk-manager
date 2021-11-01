const express = require('express');
const authPassword = require('../middleware/authPassword');
const authEmail = require('../middleware/authEmail');

const router = express.Router();

router.post('/', 
  authEmail, 
  authPassword, 
  (_req, res, _next) => res.status(200).json({ token: '7mqaVRXJSp886CGr' }));

module.exports = router;