const archiveModel = require('../models/archive_model');


async function saveArchive(req,res){
    console.log(`actual id that i got from from ${req.userid}`);
    console.log('this is save archive ');
    res.json({status: req.userid});
}


async function fetchArchive(req,res){
    console.log('this is fetch  archive ');
    res.json({status: req.userid});

    // res.json({status: "fetch archive is working"});
}


async function deleteArchive(req,res){
    console.log('this is delete  archive ');
    res.json({status: "death archive is working"});
}



module.exports = {
    saveArchive,
    fetchArchive,
    deleteArchive
}