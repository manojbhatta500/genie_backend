const archiveModel = require('../models/archive_model');


async function saveArchive(req,res){
    console.log(`save archive test result:  ${req.userid}`);
  const {title,content,type} = req.body;
  if(!title || !content || !type){
    res.status(400).json({
      msg:"title and content and type is required"
    });
  }
  try{
  const saveContent = new archiveModel({
      user:req.userid,
      types: type,
      content: content});
    const result = await saveContent.save();
    res.status(200).json({
      msg: "successfully saved",
      data: result
    });
  }catch(e){
    res.status(400).json({
      msg: "internal server error"
    });
  }
}


async function fetchArchive(req,res){
    console.log('this is fetch  archive test ');
    try{
    const savedArchiveList = await archiveModel.find({user: req.userid});
    res.status(200).json({
      data: savedArchiveList 
    });
  }catch(e){
  
    res.status(400).json({
      msg: "internal server error"
    });
  }

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
