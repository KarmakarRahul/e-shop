const express = require('express');
const router = express.Router();
const authController =  require('./controllers/authController.js');
router.post('/sign-up', authController.signUp);
module.exports = router;

