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
    console.log('checker 1');
  const saveContent = new archiveModel({
      user:req.userid,
      types: type,
      title: title,
      content: content});
      console.log('checker 2');

    const result = await saveContent.save();
    console.log('checker 3');

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


async function deleteArchive(req, res) {
  console.log(`delete archive test result: ${req.userid}`);
  const id = req.params.id;
  console.log('delete function hitted');  

  try {
    console.log('step 1');  

    // Log the id to ensure it's in the correct format
    console.log(`Deleting archive with id: ${id}`);

    // Validate the id format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('Invalid id format');
      return res.status(400).json({
        msg: "Invalid id format"
      });
    }

    const result = await archiveModel.findByIdAndDelete(id);

    if (result) {
      console.log('step 2');  
      res.status(200).json({
        msg: "Successfully deleted",
        data: result
      });
    } else {
      console.log('step 3');  
      res.status(404).json({
        msg: "Archive not found"
      });
    }
  } catch (e) {
    console.log('step 4');  
    console.error(e); // Log the actual error for debugging
    res.status(500).json({
      msg: "Internal server error"
    });
  }
}

module.exports = {
    saveArchive,
    fetchArchive,
    deleteArchive
}
