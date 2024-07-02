require('dotenv').config();


const key = process.env.Key;

function getGeminiKey(req,res){

    console.log(`gemini key is ${key}`)
    res.status(200).json({
        'key':key
    });
}


module.exports = {
    getGeminiKey
}