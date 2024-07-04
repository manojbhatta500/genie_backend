const express = require('express');
const {deleteArchive,fetchArchive,saveArchive} = require('../controllers/archive_controller');

const router = express.Router();



router.get('/archives',fetchArchive);
router.post('/archives',saveArchive);
router.delete('/archives/:id',deleteArchive);



module.exports = router;
