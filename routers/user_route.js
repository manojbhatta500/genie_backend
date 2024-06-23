const express = require('express');
const {logIn,signUp,updateUser} = require('../controllers/user_controller');


const router = express.Router();



router.post('/login',logIn);

router.post('/signup',signUp);

router.put('/update',updateUser);






module.exports = router;