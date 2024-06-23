const userModel = require('../models/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


const secretKey = process.env.SECRETKEY;




async function signUp (req,res){
    const {username,userMail,userPassword} = req.body;
    console.log('signup is running');
    try{
        console.log('one step');
        // test case passed
        if(!username || !userMail || !userPassword){
            return res.status(400).json({
                message: "all feild are required"
            });
        }
        const existingUser = await userModel.findOne({email:userMail});

        // test case passed this working
        console.log('2 step');

        if(existingUser){
            return res.status(400).json({
                message:"user already exists"
            });
        }
        console.log('2.1 step');

        const hashedPassword = await  bcrypt.hash(userPassword,10);
        console.log('2.2step');

        console.log('two step');

        // test case passed user is created 
        const result = await userModel.create({
            username: username,
            email:userMail,
            password:hashedPassword
        });

        console.log('3 step');

        const token = jwt.sign({
            email: result.username,
            id: result._id
        },secretKey);
        console.log('four step');

        return res.status(200).json({
            message:"successfully created account",
            token : token
        });
    }catch(e){
        return res.status(500).json({
            message:"internal server error",    
        });
    }
}


async function logIn(req,res){
    
    
    const {userMail,userPassword} = req.body;

    console.log('user mail ',userMail);
    console.log('userpassword ',userPassword);


    if(!userMail || !userPassword){
        return res.status(400).json({
            message: "all feild are required"
        });
    }
    try{
        const existingUser = await userModel.findOne({email:userMail});
        if(!existingUser){
            return res.status(400).json({
                message:"user dosen't exists"
            });
        }
        const matchPassword = await bcrypt.compare(userPassword,existingUser.password);
        if(!matchPassword){
            return res.status(400).json({
                message:"password dosen't matched"
            });
        }
        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        },secretKey);
        return res.status(200).json({
            message:"successfully logged in ",
            email: existingUser.email,
            token: token
        });
    }catch(e){
        return res.status(400).json({
            message:"internal server error",
        });
    }
}

async function updateUser(req, res) {
    const updateData = req.body;

    if (!updateData) {
        return res.status(400).json({
            message: "Request body cannot be empty"
        });
    }

    if (!updateData.email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    try {
        const { email, ...updateFields } = updateData;

        const existingUser = await userModel.findOneAndUpdate(
            { email: email },
            { $set: updateFields },
            { new: true }
        );

        if (!existingUser) {
            return res.status(400).json({
                message: "User doesn't exist"
            });
        }

        return res.status(200).json({
            message: 'User updated successfully',
            user: existingUser
        });

    } catch (error) {
        console.error('Error in updateUser:', error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}


module.exports = {
    signUp,
    logIn,
    updateUser
}