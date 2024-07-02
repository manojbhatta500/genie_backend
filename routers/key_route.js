const express = require('express');
const router = express.Router();
const {getGeminiKey} = require('../controllers/key_controller');




router.get('/key',getGeminiKey);



module.exports = router;